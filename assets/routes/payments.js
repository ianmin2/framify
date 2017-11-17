let router = express.Router();

router.route("/")
.all((req,res) => 
{

    // c_log(`Attempting a payment`.yell)
    let token = req.headers.authorization;

    //@ IF A USER IS LOGED IN
    if( token )
    {   

        // c_log(`Authenticated the user token`.yell);
        //@ CAPTURE AND FORMAT THE USER AUTHENTICATION DATA
        token = token.toString().replace( /JWT /ig, '').replace(/\s/ig, '');
        let curr_user   = json( crypt.base64_decode( token.replace(/JWT /ig, '').split(".")[1] ) );
        //@ EXTRACT THE USER'S ORGANIZATION
        // let org         = curr_user.organization;

        //@ CAPTURE THE PASSED PARAMETERS
        let params = getParams(req);

        //@ ENSURE THAT THE PAY TOKEN PARAMETER IS DEFINED
        if(isDefined(params,["pay_code"]))
        {

            //@ CAPTURE THE VALUE OF THE TOKEN
            decrypt(params.pay_code)
            .then( pay_amount => 
            { 

                pay_amount = parseInt( pay_amount );

                //@ ENSURE THAT THE TOKEN VALUE IS AUTHENTIC
                if( isNaN(pay_amount) || pay_amount == 0 )
                {

                    res.send( make_response( 401, 'Please enter a valid topup token') )

                }
                else
                {

                    //@ RECORD THE PAYMENT INTO THE DATABASE
                    $connection.query(`INSERT INTO payments (pay_org,pay_amount,pay_method,pay_services,pay_message,pay_token) VALUES ($1,$2,1,$3,$4,$5)`,
                    [
                        curr_user.organization,
                        pay_amount
                        ,{payments: [{services:[1]}] }
                        ,`Loaded by ${curr_user.member_id} ${curr_user.email}.`
                        ,params.pay_code
                    ])
                    .then(a=>
                    {
                        res.send( make_response( 200, `Successfully loaded ${pay_amount} SMS credits for the organization` ) );
                    })
                    .catch(e=>
                    {
                        res.send( make_response(500, `Failed to understand that token, please try again.`) );
                    })

                }

            })
            .catch(e=>
            {
                res.send( make_response(400, "The token that you entered is invalid.") )
            });

        }
        else
        {

            // c_log(`User token authentication failed`.yell);
            res.send( make_response(417, `Please provide a payment token so as to continue`) )

        }

    }

});

router.route("/encrypt")
.put((req,res)=>
{

    let params = get_params(req);
    if(!isDefined(params,["value"]))
    {
        res.send( make_response(417, 'A string or buffer is required for encryption') );
    }
    else
    {
        res.send( make_response(200, encrypt(params.value)) );
    }

});

let flag_invalid_payments = ( pay_anomalies ) => 
{

    return new Promise( (resolve,reject) => 
    {

        if( pay_anomalies[0] )
        {

            //@ REVERSE THE TRANSACTION
            pay_anomalies.forEach( (pay_data,pos) => 
            {

                //@ DELETE THE TOPUP RECORD
                $connection.query(`DELETE FROM payments WHERE pay_id=$1`,[pay_data.pay_id])
                .then(a => 
                {

                    //@ UPDATE THE STANDING BALANCE
                    $connection.query(`INSERT INTO payments (
                        pay_org,pay_amount,pay_method,pay_services,pay_message,pay_token)
                        VALUES
                        ($1,$2,$3,$4,$5,$6)`
                        ,[
                            pay_data.pay_org
                            , ( -1 * pay_data.pay_amount )//( ( pay_data.pay_amount > 0) ? ( -1 * pay_data.pay_amount ) : 0 )
                            ,1
                            ,pay_data.pay_services
                            ,`System Invalidation of fraudulent topup tokens (${pay_data.pay_message}) `
                            , encrypt( ( -1 * pay_data.pay_amount ).toString() )
                        ]
                    )
                    .then(b=>
                    {
                        resolve();
                    })
                    .catch(e=>
                    {
                        c_log(`${e.message||str(e)}`.err);
                        reject(e.message||e);
                    });

                })
                .catch(e=>
                {
                    c_log(`${e.message||str(e)}`.err);
                    reject(e.message||e);
                })

            });

        }else{
            resolve();
        }

    });

};

let validate_payment_codes = () => 
{

    return new Promise( (resolve,reject) => 
    {

        let pay_anomalies = [];

        $connection.query(`SELECT * FROM payments WHERE pay_id > 1`)
        .then( pay_data => 
        {

            //@ Loop through each payment
            pay_data.forEach(( transaction ) => 
            {
                
                //@ Chack if the payment made is valid
                decrypt(transaction.pay_token)
                .catch( e => 
                {

                     pay_anomalies.push( transaction );
                     log(pay_anomalies);

                });

            }, this);

            resolve(pay_anomalies);

        })
        .catch( err => 
        {
            reject( (err.message||err) );
        });

    });

};

validate_payment_codes()
.then(d=>
{

    flag_invalid_payments(d)
    .then(c=>
    {
        c_log(`\nSanity Check complete!\n\n`.succ);
    })
    .catch(b=>
    {
        c_log(`A 2nd degree sanity check error occured: `.err);
        c_log(b.message||b);
    });

})
.catch(e=>
{
    c_log(`A 1st degree sanity check error occured: `.err);
    j_log(e.message||e);
});

setInterval( () => {

    validate_payment_codes()
    .then(d=>
    {
        flag_invalid_payments(d)
        .then(c=>
        {
            c_log(`\nSanity Check complete!\n\n`.succ);
        })
        .catch(b=>
        {
            c_log(`A 2nd degree sanity check error occured: `.err);
            c_log(b.message||b);
        })
    })
    .catch(e=>
    {
        c_log(`A 1st degree sanity check error occured: `.err);
        j_log(e.message||e);
    });

},3600000)

module.exports = router;