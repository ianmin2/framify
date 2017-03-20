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

//@ REGISTER NEW USERS
auth.route("/register")
.post( preventRegistrationSpoofing, (req,res) => {

    if(!req.body.password || !req.body.email){

        res.json( make_response(500, "Please provide both a registration email and password") );
        
    }else{
    
        var newUser = new user( req.body );
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

    member.findOne({
        email   : req.body.email
    },function(err,user){

        if(err) throw err;

        if(!user){
            res.send( make_response( 401, "No such user was found" ) );
        }else{

            //@ Check if the password matches
            user.comparePassword( req.body.password, function( err, isMatch ){

                if( isMatch && !err ){

                    user._doc.password  = undefined;
                    user._doc.__v       = undefined;

                    var token = jwt.sign( user._doc, config.secret, { expiresIn: 3600, issuer: myAddr } )

                    res.json( make_response( 200, { token: `JWT ${token}` }, { role: user._doc.role } ) )

                }else{
                    res.send( make_response( 401, "Password does not match." ) )
                }

            });

        }

    })

});

//@ SAMPLE PROTECTED ROUTE THAT RETURNS THE LOGED IN USER'S INFORMATION
auth.route('/me')
.all( passport.authenticate('jwt', { session: false }),  function(req,res){
    res.send( make_response(200, req.user ) )
});

module.exports =  auth;