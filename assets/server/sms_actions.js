const sms_balance = ( whoami, summary ) => {

    return new Promise( (resolve, reject) => {

        //@ Find the organization's current balance
        pgdb.any(`SELECT log_balance AS balance FROM logs WHERE log_organization=$1 ORDER BY log_id DESC LIMIT 1`,
        [
            whoami.organization
        ])
        .then(issu => {

            //@ CHECK IF THE CURRENT BALANCE IS SUFFICIENT TO COMPLETE THE GIVEN REQUEST
            if( issu[0].balance < summary.cost ){
                reject( make_response(417, `<font class="uk-text-warning">You do not have enough balance to perform this request.</font><br><br>You need at least <font class="uk-text-danger">Ksh ${summary.cost}</font><br><br>Your current balance is <font class="badge uk-text-bold" style="background-color:red;" size="8 px">Ksh ${issu[0].balance}/=</font> `) )
            }else{

                //@ GIVE A GO - AHEAD
                resolve( make_response(200, summary) )

            }

        })
        .catch(err=>{
            log(err.message);
            reject( make_response(500,`<font class="uk-text-warning">Something went wrong when trying to retrieve your organization's balance</font><br><code>${err.message}</code>`) )
        })

    })

};

const update_balance = ( whoami ,api_response ,summary ) => {
    
    return new Promise( (resolve,reject) => {

        //@ FIND THE PREVIOUS BALANCE
        pgdb.any(`SELECT log_balance AS balance FROM logs WHERE log_organization=$1 ORDER BY log_id DESC LIMIT 1`,
        [
            whoami.organization
        ])
        .then( last_record => {

            let new_balance = (last_record[0].balance - summary.cost);

            pgdb.any(`INSERT INTO logs (log_summary,log_organization,log_reference,log_balance) VALUES ($1,$2,$3,$4)`,
            [
                api_response
                ,whoami.organization
                ,0
                ,new_balance
            ])
            .then( balance_updated => {

                resolve();

            })
            .catch( b_err => {

                log(b_err.message||b_err)
                log(`<==========================`)
                log( api_response )
                log(`==========================>`)

                reject( make_response(500, b_err.message||b_err) )

            })

        })

    });

}

module.exports = {sms_balance,update_balance};