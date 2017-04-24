memberSchema      = new mongoose.Schema({

    name        : {
        first           : { type: String }
        ,last           : { type: String }
    }
    ,email       : {
        type            : String
        ,lowercase      : true
    }
    ,password   : {
        type            : String
    }
    ,role       : {
        type            : String
        ,enum           : ["client","manager","admin","audit"]
        ,default        : "audit"
    }
    ,account        : {
        name     : { type: String }
        ,balance : { type: Currency, default: 0 }
    }
    ,transactions   : {
        type: Array
    }
    ,telephone  : { type: String }
    ,joined     : { type: Date,   default: Date.now }
    ,active     : { type: Boolean, default: true }

});

memberSchema.path('password').required(true, 'Please provide a password.');

memberSchema.path('email').required(true, 'Please provide an email address.');

memberSchema.path('account.name').required(true, 'Please provide an account name.')

memberSchema.path("email").unique(true, "That email address is already taken.");

memberSchema.path("telephone").unique(true,"That telephone number is already registered.")

memberSchema.index({email: 1});

memberSchema.index({"name.first": 1},{unique: false});
memberSchema.index({"name.last": 1},{unique: false});

memberSchema.index({telephone: 1});

memberSchema.index({"account.name": 1});

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

//@ Available Balance Checker
memberSchema.methods.enoughBalance = function(amount){
    
    return new Promise( (resolve,reject) => {

         let isBalance = ( amount <= this.account.balance )

         if( isBalance ){
             resolve(this.account.balance)
         }else{
             reject( make_response( 402, `You are only entitled to transact KES. ${this.account.balance}.<br>Please topup to continue.`) )
         }

    })
  
};

memberSchema.aggr = ( searchQuery ) => {

       return new Promise(resolve=>{
            memberSchema.aggregate(searchQuery)
            .then(d=>{
                let retObj = { total: 0 };
                d.forEach(a=>{
                    retObj[a["_id"]]      = a["total"];
                    retObj["total"]       += a["total"];
                })
                resolve(retObj);
            });  
       })  
   
       //@ SAMPLE USE
    //    usernameschema.records.aggr([
    //         { 
    //         $match : {time: { $gte: new Date(interval[1]),   $lt: new Date(interval[0]) }} 
    //         }
    //         ,{
    //         $group: {
    //             _id: "$event"
    //             ,total: { $sum: 1 }
    //         }
    //         }
    //     ])

};

module.exports  = mongoose.model("Member", memberSchema );
log("Loaded the bixbyte-equity - member database schema ".succ)