let auth       = express.Router();


//@ User PRE - REGISTRATION MIDDLEWARE
var preventRegistrationSpoofing = function(req,res,next){

    if( req.body.role === "admin"  ){
        
        let token = req.headers.authorization

        if( token ){               
            token = token.toString().replace( /JWT /ig, '').replace(/\s/ig, '')
        }

        //@ Ensure that the provided jwt is valid

        try{
            
            verifiedJwt = nJwt.verify(token,config.secret);

            //@ Ensure that the trying party is also an administrator
            if( json( crypt.base64_decode( token.replace(/JWT /ig, '').split(".")[1] ) ).role === "admin" ){
                next();
            }else{
                res.json( make_response(  500, "You do not meet the minimum requirements to create an administrative user." ) );
            }

        }catch(e){
            console.log(e);
            res.send( make_response( 500, "Please login to continue" ) )
        }

    }else{
        next();
    }

};

if(  authMeth =="mongo" ){

    //@ REGISTER NEW USERS
    auth.route("/register")
    .post( preventRegistrationSpoofing, (req,res) => {

        if(!req.body.password || !req.body.email){

            res.json( make_response(500, "Please provide both a registration email and password") );
            
        }else{
        
            var newUser = new member( req.body );
            // {
            //     email       : req.body.email
            //     ,password   : req.body.password
            //     ,role       : req.body.role
            // }

            newUser.save( err => {

                if(err){

                    return res.json( make_response(500, err.message ) )

                }

                res.json( make_response( 200, "Successfully registered a new user.") )

            });

                        
        }
                
    });

    //@ AUTHENTICATE THE USER AND ISSUE A jwt
    auth.route("/verify")
    .post( (req,res) => {

        if( !req.body.email || !req.body.password  ){
            res.send( make_response( 500, "Both the username and password are required." ) )
        }else{

            member.findOne({
                email   : req.body.email
                ,active : true
            },function(err,user){

                if(err) throw err;

                if(!user){
                    res.send( make_response( 401, "No such user was found" ) );
                }else{

                    //@ Check if the password matches
                    user.comparePassword( req.body.password, function( err, isMatch ){

                        if( isMatch && !err ){

                            user._doc.password      = undefined;
                            user._doc.transactions  = undefined;
                            user._doc.__v           = undefined;

                            var token = jwt.sign( user._doc, config.secret, { expiresIn: 3600, issuer: myAddr } )

                            res.json( make_response( 200, { token: `JWT ${token}` }, { role: user._doc.role } ) )
                        
                        }else{
                            res.send( make_response( 401, "Password does not match." ) )
                        }

                    });

                }

            })

        }

    

    });


    //@ SAMPLE PROTECTED ROUTE THAT RETURNS THE LOGED IN USER'S INFORMATION
    auth.route('/me')
    .all( passport.authenticate('jwt', { session: false }) ,function(req,res){
        
        member.findOne({email:req.whoami.email},function(err,memberRecord){

                let l = clone( memberRecord );
            
                l.password   = undefined;
                l._id        = undefined;
                l.__v        = undefined;           


                res.send( make_response(200, l ) );      

        })

    });

    
    module.exports =  auth;


}else{

    //@ REGISTER NEW USERS
    auth.route("/register")
    .post( preventRegistrationSpoofing, (req,res) => {

        console.log(`Attempting a registration`.info)

        var params = get_params(req);

        if( isDefined(params,"password,email,role,telephone,name.first,name.last,account.name") ){
            
            delete params.password2;
            params.password = crypt.md5(params.password);


            // pgdb.any(`INSERT INTO members ("name.first","name.last","account.name",email,password,role,telephone) VALUES ($1,$2,$3,$4,$5,$6,$7)`
            // ,[
            //     params["name.first"]
            //     ,params["name.last"]
            //     ,params["account.name"]
            //     ,params["email"]
            //     ,crypt.md5(params["password"])
            //     ,params["role"]
            //     ,params["telephone"]
            // ])

            $keys   = [];
            $values = [];

            for( $field_name in params ){
                $keys.push( $field_name );
                $values.push( params[$field_name] );
            }
            
            $field_names  = "";
            $field_params = []
            $field_values = "(";

            for( var i = 0; i < $keys.length; i++ ){
               $field_names  += $keys[i]+',';
            //    $field_names = ( $keys[i].indexOf('.' == -1) ) ? $keys[i] + ',' : `'${$keys[i]}'` + ','

                $field_params.push( ($values[i] || "")  )
                $field_values += "$"+(i+1)+",";
            }
            $field_values = $field_values.replace(/,$/, ')')


            $field_names     = $field_names
                               .split(",")
                               .reduce((init,val)=>{ 
                                   return init.concat( ( val.indexOf(".") === -1 ) ? val:(`"${val}"`) ); 
                                },[])
                                .join(",")
                                .replace(/,$/, ')')
                               
            $field_names =  `(${$field_names}`;
            

            $query = `INSERT INTO members ${$field_names} VALUES ${$field_values}`

            // c_log("\n\n")
            // console.log( $query )
            // c_log($field_params)
            // c_log("\n\n")
                
            pgdb.any($query,$field_params)
            .then(inserted =>{
                log(`${inserted}`.succ)
                log(`Registered the user ${params["email"]}`.succ)
                res.json( make_response( 200, "Successfully registered a new user.",params) )
            })
            .catch(error => {
                log(`Failed to register the user.\n\t\t\t\t${str(error.message)}`.err)
                console.dir(error.message)
                res.status(500).json( make_response( 500, `Failed to record the user. <br><br>Please try changing:<br>1. Email<br>2. Username<br>3. Telephone`, error.message) )
            })
            
        }else{  
            
            res.json( make_response(500, "Please provide both a registration email and password") );        
                        
        }
                
    });

    //@ AUTHENTICATE THE USER AND ISSUE A jwt
    auth.route("/verify")
    .all( (req,res) => {

        console.log(`Attempting a login`.info)

        req.body = get_params( req );

        if( isDefined(req.body, "email,password") ){

            pgdb.any(`SELECT * FROM vw_members WHERE email=$1`,[req.body.email])
            .then(user=>{

                if(!user[0]){
                    res.send( make_response( 401, "No such user was found",req.body ) );
                }else if( !user[0].active ){
                    res.send( make_response( 401, "Your account has been terminated.<br>Please consult an administrator for assistance.",req.body ) );
                }else{

                    var memba = user[0];

                    if(memba.password == crypt.md5(req.body.password)){

                        memba.password          = undefined;
                        memba.transactions      = undefined;

                        var token = jwt.sign( memba, config.secret, { expiresIn: 36000000000000, issuer: myAddr } )

                        res.json( make_response( 200, { token: `JWT ${token}` }, { 
                                                                                    role:           memba.role
                                                                                    ,member_id:     memba.member_id
                                                                                    ,member_name:   { first: memba["name.first"], last: memba["name.last"]  }
                                                                                } ) )


                    }else{

                        res.send( make_response( 401, "Password does not match." ) )

                    }

                }
            })


        }else{

            res.send( make_response( 500, "Both the email and password are required." ) )

        }

    

    });

    //@ SAMPLE PROTECTED ROUTE THAT RETURNS THE LOGED IN USER'S INFORMATION
    auth.route('/me')
    .all( passport.authenticate('jwt', { session: false }) ,function(req,res){

        console.log(`Attempting a profile data fetch`.info)
        
        pgdb.any(`SELECT * FROM vw_members WHERE email=$1 AND active=true`,[req.whoami.email])
        .then(memberRecord => {

            let l = clone( memberRecord[0] );
            l.password      = undefined;
            l._id           = undefined;
            l.__v           = undefined;

            res.send( make_response(200, l) )

        })
        .catch(e=>{
            res.send( make_response(500, e.message) )
        })


    });

    
    module.exports =  auth;

}