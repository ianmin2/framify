var jwtStrategy     = passport_jwt.Strategy
var extractJwt      = passport_jwt.ExtractJwt

module.exports = ( passport ) => {

    var opts    = {};
    opts.jwtFromRequest     = extractJwt.fromAuthHeader();
    opts.secretOrKey        = config.secret;

    passport.use( new jwtStrategy( opts, (jwt_payload,done) => {

        member.findOne( { id: jwt_payload.id }, ( err, user ) => { 
            
            if(err){
                return done(err, false);
            }

            if(user){
                done( null, user );
            } else {
                done( null, false );
            }

        });

    }));

};