class SMS {

    constructor( authorization, senderID, prefix="+254" ){

        if( !authorization ){
            throw new Error("The SMS method requires an authorization string");
        }

        if( !senderID ){
            throw new Error("A sender ID is required so as to instanciate the SMS functionality");
        }

        this.senderID = senderID ;

        this.prefix   = prefix;

        this.options = {
            method:     'POST'
            ,headers: 
                        { 
                            authorization: `Basic ${crypt.base64_encode( authorization )}`
                            ,'content-type': 'application/json'
                            ,'accept': 'application/json'
                        }
            ,json:      true
        }

    }

    formatTelephone ( telephoneArray ){

        telephoneArray = ( Array.isArray(telephoneArray) ) ? telephoneArray : telephoneArray.split(",");

        let ftel = this;

        return telephoneArray
        .map(function(val,pos) {

            if (!val.toString().match(telRegex)){
                    telephoneArray.splice(pos, 1);
                    return null;
            }else{
                    if( val.length <= 10 || (!val.toString().includes('+') && val.length <= 10 ) ){
                        
                        if( val.startsWith(0)){
                            return `${ftel.prefix}${val.replace(/^0/i,'')}`;
                        }else{
                            return `${ftel.prefix}${val}`;
                        }
                        
                    }else{
                        return val;
                    }
            }

        }, this)
        .filter(e=>e)
        
    }

    //@ {to,text}
    one( msg ,whoami ){

        let singl = this;

        return new Promise((resolve,reject) => {

            

            if( !isDefined(msg, ["to","text"]) ){
                reject( make_response(500 ,"At least an SMS message and a recipient number must be defined.") )
            }

            msg.to                      = singl.formatTelephone(msg.to);

            singl.options.body          = msg; //@ {from,to,text}
            singl.options.body.from     = singl.senderID;
            singl.options.url           = 'https://api.infobip.com/sms/1/text/single'

            if( singl.options.body.to[0]){

                const page_length =  Math.ceil(msg.text.length/160) || 1;

                let  summary = {
                                numbers     : msg.to.length
                                ,pages      : page_length
                                ,epitomal   : 1
                                ,cost       : ( Math.ceil(( msg.to.length/1) )*page_length )
                            };

                //@ CACULATE THE PROJECTED COST VERSUS THE AVAILABLE BALANCE
                sms_balance( whoami, summary )
                .then( go_ahead => {


                    //@ ENSURE THAT THERE IS AN INTERNET CONNECTION
                    is_online()
                    .then( connnected => {

                        // @ GO AHEAD AND SEND THE MESSAGES
                        request(singl.options, function (error, response, body) {

                            if (error){
                                 reject( make_response(500 ,error.message) );
                            }
                            else if( body.requestError ){

                                reject( make_response(400, JSON.stringify( body.requestError ) ) );

                            }else{

                                 update_balance( whoami , body ,summary )
                                .then( balance_stored => {

                                    //@ LET THE USER KNOW
                                        resolve( make_response(200 ,body) );

                                })
                                .catch( b_err => {
                                    // ipcSend({ txt : `<h1>An error occured!</h1><br><br><h2 style="color:red;text-align:center !important;">${(err.data)? err.data.message:err.message}</h2>` })
                                    reject( ( b_err.response )? b_err : make_response( 500, b_err.message||b_err ) );
                                })

                            }
                            
                        }); 

                    })
                    .catch( err => {
                        
                        reject( make_response(404, `<font class="uk-text-warning">Please connect to the internet so as to continue with message sending</font><br><br><code>${err.code}</code>`) )

                    })
 

                })
                .catch( err => {
                    
                    //@ INFORM THE USER OF THEIR MISFORTUNE
                    // ipcSend({ txt : `<h1>An error occured!</h1><br><br><h2 style="color:red;text-align:center !important;">${(err.data)? err.data.message:err.message}</h2>`})
                    reject( (err.response) ? err : make_response( 500, err.message || err ) )

                })  


            }else{
                // ipcSend({ txt : `<h2 style="color:crimson;">At least one SMS recipient is required</h2>`})
                reject( make_response(500,"At least one SMS recipient is required") )
            }

        })

    }

    //@ [{to,text},{to,text}]
    many( msgArr ,whoami ){

        var multi = this;

        return new Promise( (resolve,reject) => {

            let  summary = {
                                numbers : 0
                                ,pages  : 0
                            };

            if(  Array.isArray(msgArr) ){

                let ErrorArray = [];

                multi.options.body   = 
                { 
                    messages :  msgArr
                    //@Filter to ensure that the provided telephone number is in a valid format
                    .filter( msg =>{

                        //@ Handle the contact array            
                        msg.to = multi.formatTelephone( msg.to );
                    
                        //@ Allow the messages with properly formatted numbers
                        if( msg.to[0] && isDefined(msg, ["text"]) ){
                            summary.numbers += msg.to.length;
                            summary.pages += ( Math.ceil(msg.text.length/160)) || 1;
                            return true
                        }else{
                            ErrorArray.push(msg)
                            return false                        
                        } 

                    })
                    //@ Inject  the "from" parameter to every object
                    .map( msg => {

                        msg.from = multi.senderID;

                        return msg;

                    }) 
                }
                //@ [{to,from,text}]
                multi.options.url    = 'https://api.infobip.com/sms/1/text/multi';


                if( multi.options.body.messages[0] ){

                    //@ UPDATE THE COST SUMMARY OBJECT
                    summary.epitomal    = multi.options.body.messages.length;
                    summary.cost        = Math.ceil(( summary.numbers/summary.epitomal ))*summary.pages;

                    //@ CACULATE THE PROJECTED COST VERSUS THE AVAILABLE BALANCE
                    sms_balance( whoami, summary )
                    .then( go_ahead => {


                        //@ ENSURE THAT THERE IS AN INTERNET CONNECTION
                        is_online()
                        .then( connnected => {

                            //@ GO AHEAD AND SEND THE MESSAGES
                            request(multi.options, function (error, response, body) {
                                if (error) reject( make_response(500 ,error.message, ErrorArray) );
                           
                                update_balance( whoami ,body ,summary )
                                .then( balance_stored => {

                                    //@ LET THE USER KNOW
                                    resolve( make_response( 200 ,body, ErrorArray ) );

                                })
                                .catch( b_err => {
                                    // ipcSend({ txt : `<h1>An error occured!</h1><br><br><h2 style="color:red;text-align:center !important;">${(err.data)? err.data.message:err.message}</h2>`})
                                    reject( ( b_err.response )? b_err : make_response( 500, b_err.message||b_err ) );
                                })

                            });

                        })
                        .catch( err => {

                            // ipcSend({ txt : `<h1>An error occured!</h1><br><br><h2 style="color:red;text-align:center !important;">${(err.data)? err.data.message:err.message}</h2>`})
                            reject( make_response(404, `<font class="uk-text-warning">Please connect to the internet so as to continue with message sending</font><br><br><code>${err.code}</code>`) )

                        })

                    })
                    .catch( err => {
                        
                        //@ INFORM THE USER OF THEIR MISFORTUNE
                        // ipcSend({ txt : `<h1>An error occured!</h1><br><br><h2 style="color:red;text-align:center !important;">${(err.data)? err.data.message:err.message}</h2>`})
                        reject( (err.response) ? err : make_response( 500, err.message || err ) )

                    })  

                }else{

                    j_log(msgArr)
                    // ipcSend({ txt : `<h2 style="color:red;text-align:center !important;">Please provide the data in the required format.</h2>`})
                    reject( make_response(500,"Please provide the data in the required format") )
                }
                

            }else{
                // ipcSend({ txt : `<h2 style="color:red;text-align:center !important;">An array of messages is required  when using this mode!</h2>`})
                reject( make_response(500, "An array of messages is required when using this mode") );
            }


        })

    }

    //@ 
    track( msgArr ,whoami ){

       let trck = this;

        return new Promise( (resolve,reject) => {

            let  summary = {
                                numbers : 0
                                ,pages  : 0
                            };

            if(  Array.isArray(msgArr) ){

                let ErrorArray = [];

                trck.options.body   = 
                { 
                    messages :  msgArr
                    //@Filter to ensure that the provided telephone number is in a valid format
                    .filter( msg =>{

                        //@ Handle the contacts array            
                        msg.to = trck.formatTelephone( msg.to );

                    
                        //@ Allow the messages with properly formatted numbers
                        if( msg.to[0] && isDefined(msg, ["text"]) ){
                            summary.numbers += msg.to.length;
                            summary.pages += ( Math.ceil(msg.text.length/160) ) || 1;
                            return true
                        }else{
                            ErrorArray.push(msg)
                            return false                        
                        } 

                    })
                    //@ Inject  the "from" parameter to every object
                    .map( msg => {

                        msg.destinantions = msg.to
                                            .reduce( (a,b) =>  {
                                                return a.concat({ "to": b  })
                                            },[])

                        msg.from =trck.senderID;

                        delete msg.to;

                        return msg;

                    }) 
                    ,tracking  :  {
                                    "track":"URL"
                                    ,"type":"SOCIAL_INVITES"
                                }
                }

                
               //@ [{to,from,text}]
               trck.options.url    = 'https://api.infobip.com/sms/1/text/advanced';


                if(trck.options.body.messages[0] ){

                    // c_log(`\n\n\n===========================================\n`)
                    // j_log(trck.options)
                    // c_log(`\n===========================================\n\n\n`)                   
                    // resolve( make_response( 200 ,trck.options.body, ErrorArray ) );

                    //@ UPDATE THE COST SUMMARY OBJECT
                    summary.epitomal    = trck.options.body.messages.length;
                    summary.cost        = Math.ceil(( summary.numbers/summary.epitomal ))*summary.pages;

                    //@ CACULATE THE PROJECTED COST VERSUS THE AVAILABLE BALANCE
                    sms_balance( whoami, summary )
                    .then( go_ahead => {


                        //@ ENSURE THAT THERE IS AN INTERNET CONNECTION
                        is_online()
                        .then( connnected => {

                            //@ GO AHEAD AND SEND THE MESSAGES
                            request(trck.options, function (error, response, body) {

                                if (error) reject( make_response(500 ,error.message, ErrorArray) );
                                
                                update_balance( whoami ,body ,summary )
                                .then( balance_stored => {

                                    //@ LET THE USER KNOW
                                    resolve( make_response( 200 ,body, ErrorArray ) );

                                })
                                .catch( b_err => {
                                    // ipcSend({ txt : `<h1>An error occured!</h1><br><br><h2 style="color:red;text-align:center !important;">${(err.data)? err.data.message:err.message}</h2>`})
                                    reject( ( b_err.response )? b_err : make_response( 500, b_err.message||b_err ) );
                                })
                            });  

                        })
                        .catch( err => {

                            // ipcSend({ txt : `<h1>An error occured!</h1><br><br><h2 style="color:red;text-align:center !important;">Please connect to the internet so as to continue with message sending</h2>`})
                            reject( make_response(404, `<font class="uk-text-warning">Please connect to the internet so as to continue with message sending</font><br><br><code>${err.code}</code>`) )

                        })


                    })
                    .catch( err => {
                        
                        //@ INFORM THE USER OF THEIR MISFORTUNE
                        // ipcSend({ txt : `<h1>An error occured!</h1><br><br><h2 style="color:red;text-align:center !important;">${(err.data)? err.data.message:err.message}</h2>`})
                        reject( (err.response) ? err : make_response( 500, err.message || err ) )

                    })  

                    

                }else{
                    // ipcSend({ txt : `<h2 style="color:red;text-align:center !important;">At least a message is required.</h2>`})
                    reject( make_response(500,"At least an SMS message is required") )
                }
                

            }else{
                // ipcSend({ txt : `<h2 style="color:red;text-align:center !important;">An array of messages is required when using this mode</h2>`})
                reject( make_response(500, "An array of messages is required when using this mode") );
            }

        })


    }

    //@
    flash( msgArr ,whoami ){

    }



}

module.exports = SMS;