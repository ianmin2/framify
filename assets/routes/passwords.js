let router          = new express.Router();

//@ THE MAIN ROUTE
router.route("/")
.get((req,res)=>{

    res.sendFile(`${__dirname}/templates/password/main.html`)

})

//@ FORGOT PASSWORD HANDLER
router.route("/forgot")
.all((req,res) => {

    let params = getParams( req );

    if( params.email ){

        $connection.query( "SELECT * from members WHERE email=$1 LIMIT 1" ,[ params.email ] )
        .then( userData => {

            if(  userData[0] ){

                //@ GENERATE A RECOVERY KEY
                let reckKey = crypto.randomBytes(parseInt(45)).toString('hex');

                //@ Save the recovery key in the password recovery table
                $connection.query( "INSERT INTO password_recovery (member,recovery_key) VALUES ($1,$2) RETURNING password_recovery_id AS recovery_id", [userData[0].member_id, reckKey] )
                .then( recovery =>{

                    if( recovery[0] ){

                        let recovery_id = recovery[0].recovery_id;

                        //@ Fetch the password recovery html template 
                        let template = fs.readFileSync(`${__dirname}/templates/password/forgot.html`,'utf8');
                        
                        //@ Replace the template strings with the proper fetched data
                        template = template.replace(/{{user}}/ig, `${userData[0]["name.first"]} ${userData[0]["name.last"]}`)
                                            .replace(/{{user_account}}/ig, `${userData[0].username}`)
                                            .replace(/{{user_recovery_link}}/ig, `http://${myAddr}:${app.port}/passwords/recover/${recovery_id}/${userData[0].email}/${userData[0].reckKey}}`)

                        //@ Format the mail object for sending
                        let mailObj = {
                            from:           'passwords@bixbyte.io'
                            ,to:            userData[0].email
                            ,subject:       'Framify Password recovery quest'
                            ,html:          template                    
                        }

                        //@ Send the user a recovery email
                        if( sendMail ){

                            sendMail( mailObj )
                            .then( msg => {
                                res.send(  make_response(200, `A password recovery email is on its way to ${params.email}.<br><br>Please check your <b>Junk</b> or <b>spam</b> before trying again.`,msg) )
                            })
                            .catch( err => {
                                res.send( make_response( 500, `An error occured when trying to send your email.<br>Please try again.<br><br>Error: ${err.message}` ) );
                            })

                        }else{

                            res.send( make_response( 500, 'The email sending server has not been defined for this application.<br> Please consult your administrator for assistance') )

                        }

                    }else{

                        res.send( make_response(500, "Failed to recover your password due to password recovery technicalities.<br>Please try again.", recovery) )

                    }

                    

                })
                .catch(err => {
                    res.send( make_response(500, "Failed to generate a recovery token.<br>Please try again",err.message) )
                })                

            }else{ 
                res.send( make_response( 500, "Sorry, we could not find an account with that email address.", userData ) )
            }

        })
        .catch(err => {
            res.send(  make_response(500, err.message) );
        })

    }else{

        res.send( make_response(  500, 'Please provide your email address for password recovery' ) );

    }

})

module.exports = router;