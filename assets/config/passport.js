var jwtStrategy     = passport_jwt.Strategy
var extractJwt      = passport_jwt.ExtractJwt


if( global.authMeth == "mongo" ){

    module.exports = ( passport ) => {

        var opts    = {};
        opts.jwtFromRequest     = extractJwt.fromAuthHeader();
        opts.secretOrKey        = config.secret;

        passport.use( new jwtStrategy( opts, (jwt_payload,done) => {

            member.findOne( { id: jwt_payload.id }, ( err, user ) => { 
                
                if(err){
                    return done(err, false);
                }

                // console.dir( user )

                if(user){
                    done( null, user );
                } else {
                    done( null, false );
                }

            });

        }));

    };

    c_log(`\n✔`.succ +` Loaded member authentication via mongodb.\n`.info);

//@ The postgres fallback method
}else{ 


    module.exports 	= ( passport ) => {

        var opts		= {};
        opts.jwtFromRequest	= extractJwt.fromAuthHeader();
        opts.secretOrKey 	= config.secret;

        passport.use( new jwtStrategy( opts, ( jwt_payload,done ) => {	

            // console.log("Using postgres ".succ)

            // c_log( jwt_payload );
            
            pgdb.any('SELECT * FROM members WHERE member_id=$1 AND email=$2 AND role=$3 AND telephone=$4',
            [jwt_payload.member_id,
            jwt_payload.email,
            jwt_payload.role,
            jwt_payload.telephone])
            .then(function(user) {
                                   
                if(user){
                    done( null, user[0] );
                } else {
                    done( null, false );
                }

            })
            .catch(function(err){
                return done(err, false);
            })
            
            

        })) ;
        

    };
 
    c_log(`\n✔`.succ +` Loaded member authentication via postgresql.\n`.info);


};
