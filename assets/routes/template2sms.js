var template_regex = /{{\s*[\w\.]+\s*}}/ig;
var word_regex     = /[\w\.]+/ig;

var template_to_sms = function ( template ,data )
{

    return new Promise( (resolve,reject) => 
    {

        let t_vars  = template.match(template_regex);
        
        if( t_vars )
        {

            let t_val   = t_vars.map( v => v.match(word_regex)[0] );

            let msgs    = [];

            data.forEach(function(val,pos) 
            {
                
            
                let t = clone(template);
                
                let msg = t_vars.map( (e,p ) => 
                {
                    t = t.replace( e, val[t_val[p]] );
                    return t;
                });
        
                msg = msg[msg.length-1];

                msgs.push( 
                    {
                        to : val["mem_phone"]
                        ,text: msg
                    }
                );

            });

            resolve(msgs);

        }
        else
        {

            reject( make_response(417,`<b style="color:red;">Oops!</b><br><i style="color:orange;">Your template has nothing to convert.</i><br>Please define at least one template literal in the form <b><i>{{mem_***}}</i></b> to continue`) );

        }

    });

};

module.exports = template_to_sms;