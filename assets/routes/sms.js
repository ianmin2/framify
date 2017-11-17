let router              =    express.Router();

const SMS               = require( path.join(__dirname,'../server/sms.js') );

global.mysms            = new SMS(`${config.sms.username}:${config.sms.password}`,config.sms.sender)

const template_to_sms   = require( path.join(__dirname, 'template2sms.js') );

// let msgArr = 
// {

// 	"body": 
// 	[
//     	{
// 	        "to": "+254723501339,+254733557199"
// 	        ,"text": "This is a message to test the implementation of the Bulk SMS module for Kiambaa dairy."
// 	    }
// 	    ,{
// 	        "to": [254725678447,"0721817139"]
// 	        ,"text": "This is a sample bulk SMS sent for the sake of bulk SMS testing."
// 	    }
	    
// 	    ,{
// 	        "to": [0725678447]
// 	        ,"text": "Saasa"
// 	    }
// 	    ,{
// 	        "to": ["0711808468","ianmin2","0711"]
// 	    }
// 	]	

// }


router.route("/")
.all((req,res) => 
{

    res.send( make_response(200,"The SMS service is setup on this server.") );

});

router.route("/echo")
.all((req,res)=>
{

    let pars = get_params(req);
    
    pars.body.to   = ( pars.body.to.charAt(0) == "[" ) ? json(pars.body.to) : pars.body.to;

    res.send( make_response(200,pars) );

});

router.route("/one")
.all((req,res)=>
{

    let params = get_params(req);

    if( isDefined(params,["body"]) )
    {

        mysms.one( params.body ,req.whoami )
        .then(a=>
        {
            j_log(a);
            res.send(a);
        })
        .catch(e=>
        {
            j_log(e);
            res.send(e);
        });

    }
    else
    {
        res.send( make_response(500,"Please define the structural body of the message that you would like to send.",params) );
    }
    

});

router.route("/many")
.all((req,res) => 
{

    let params = get_params(req);

    if(isDefined(params,["body"]))
    {

        params.body = ( Array.isArray(params.body) ) ? params.body : [params.body];

        if( (params.body[0].to.charAt(0) == "[") )
        {
           
            params.body[0].to = json(params.body[0].to);
            params.body[0].to = ( params.body[0].to.length == 2 && !telRegex.test( params.body[0].to[1] ) ) ? params.body[0].to[0] : params.body[0].to;
          
        }
        
        mysms.many( params.body ,req.whoami )
        .then(a=>
        {
            j_log(a);
            res.send(a);
        })
        .catch(e=>
        {
            j_log(e);
            res.send(e);
        });

    }
    else
    {
        res.send( make_response(500,"Please define the structural body of the message that you would like to send.",params) );
    }

});

router.route("/track")
.all((req,res) => 
{

    let params = get_params(req);

    if( isDefined(params,["body"]) )
    {

        mysms.track( params.body ,req.whoami)
        .then(a=>
        {
            j_log(a);
            res.send(a);
        })
        .catch(e=>
        {
            j_log(e);
            res.send(e);
        });

    }
    else
    {
        res.send( make_response(500,"Please define the structural body of the message that you would like to send.",params) );
    }

});


router.route("/template")
.all((req,res)=>
{

    let params = get_params(req);

    if(isDefined(params,["body"]))
    {

        let group_number;

        //@ Check if the to parameter is potentially an array
        params.body.to   = ( params.body.to.charAt(0) == "[" ) ? json(params.body.to) : params.body.to;

        if( Array.isArray(params.body.to) )
        {

            group_number    = clone(params.body.to)[1];
            params.body.to  = params.body.to[0];

            //@ PICK OUT THE DATA FOR THE GIVEN MEMBERS FROM THE DATABASE

            pgdb.query(`SELECT * FROM vw_group_members WHERE mem_group=$1 and mem_active=true`,[group_number])
            .then((member_data)=>
            {

                template_to_sms( params.body.text, member_data )
                .then(resp => 
                {
                 
                    //@Send the message
                    // res.send( make_response(200,resp) )
                    mysms.many( resp ,req.whoami)
                    .then(a=>
                    {
                        j_log(a);
                        res.send(a);
                    })
                    .catch(e=>
                    {
                        j_log(e);
                        res.send(e);
                    });

                })
                .catch(err=>
                {
                    j_log(err.message||err);
                    res.send( ( err.response )  ? err :  make_response(500,err.message||err) );
                });

            })
            .catch(err=>
            {
                j_log(err.message);
                res.send( make_response(500,err.message) );
            });

        };

    }
    else
    {
        res.send( make_response(500,"Please define the structural body of the message that you would like to send.",params) );
    }

});

module.exports  = router;