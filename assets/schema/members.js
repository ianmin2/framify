memberSchema      = new mongoose.Schema({

    name        : {
        type            : String
    }
    ,email       : {
        type            : String
        ,lowercase      : true
        ,unique         : true
        ,required       : true
    }
    ,password   : {
        type            : String
        ,required       : true
    }
    ,role       : {
        type            : String
        ,enum           : ["client","manager","admin","audit"]
        ,default        : "audit"
    }
    ,telephone  : { type: String }
    ,joined     : { type: Date,   default: Date.now }
    ,active     : { type: Boolean, default: true }

});

memberSchema.path('password').required(true, 'Please provide a password.');
memberSchema.path('email').required(true, 'Please provide an email address.');

memberSchema.path("email").unique(true, "That email address is already taken.");

memberSchema.index({email: 1}, { unique: true });

memberSchema.index({name: 1},{unique: false});

memberSchema.index({telephone: 1},{unique: false});

// memberSchema.index({ "api.key" : 1 }, { unique: true });

//** Ensure that the username is in the proper format
memberSchema.path("password").validate( (v) => {

    return isPassword(v);
    
}, makeResponse( 500, "Please select a stronger password." ) );

//** Ensure that the email is in the proper format
memberSchema.path("email").validate( (v) => {

    return isEmail(v);

}, makeResponse( 500, "Please specify a valid email." ) );

//** Ensure that the telephone number is in the proper format
memberSchema.path("telephone").validate( (v) => {

    if(v){
        return isTelephone(v);
    }else{
        return true;
    }    

}, makeResponse( 500, "Please provide a valid telephone number" ) );


//@ Save the member's hashed password
memberSchema.pre("save", function (next){

    var member = this;

    if( this.isModified("password" || this.isNew) ){
        member.password = crypt.md5( member.password );
        next();
    }else{
        return next();
    }

});

//@ Compare password method
memberSchema.methods.comparePassword = function (pw,cb){
   let isMatch = ( crypt.md5(pw) === this.password )
   cb(null,isMatch);
};

module.exports  = mongoose.model("Member", memberSchema );