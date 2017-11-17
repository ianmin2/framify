//@ THE EMAIL SENDING SERVICE LOADER MEHOD 
var mail = () => {};

if (fs.existsSync(path.join( __dirname,'../config/email.conf')) ) 
{

    const email     = require("nodemailer");

    const mailer    = email.createTransport(config.email);

    global.sendMail = (sendData) => {
        
        return new Promise((resolve, reject) => {

            mailer.sendMail(sendData, function(error, info){
            if (error) {
                console.log(error);
                reject(error);
            } else {
                j_log(info);
                resolve(info.response);
            }
            }); 


        });

    };


}
else 
{

    c_log(`\n✘ `.err + ` Failed to initialize the email service.\n`.err +
        `\n   Please define an `.info +
        `email.conf`.yell +
        ` file in the `.info +
        `config`.yell +
        ` folder of your application with content in the following format.`.info);

    c_log(`
    module.exports = 
    {
      connection : 
      {
        service: 'gmail',
        auth: 
        {
          user: 'passwordreset@example.com',
          pass: 'YOUR_EMAIL_PASSWORD'
        }
      }
      ,accounts : 
      {
        passwords:        "Password Recovery <passwordreset@example.com>",
        welcome:          "User Accounts <accounts@example.com>",
        errors:           "Framify Errors <errors@example.com>",
        notifications:    "Framify Newsletter <noreply@example.com>",
        support:          "Framify Support <support@example.com>"
      }
      
    };
    `);

    c_log(` \n\nSo as to enable email sending functionality.\n`.info);

};