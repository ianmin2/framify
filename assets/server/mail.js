//@ THE EMAIL SENDING SERVICE LOADER MEHOD 
var mail = () => {};

if (fs.existsSync(path.join( __dirname,'../config/email.conf')) ) 
{

    //@ The main mail sender object
    global.sendMail = (sendData) => 
    {
        
        return new Promise((resolve, reject) => 
        {

            mailer.sendMail(sendData, function(error, info)
            {
                if (error) 
                {
                    console.log(error);
                    reject(error);
                } 
                else 
                {
                    j_log(info);
                    resolve(info.response);
                }
            }); 


        });

    };

    //@ Error Email Template
    global.errorEmail = (params) => 
    {
        
        sendMail({
            from: config.email.accounts.errors,
            to: config.email.recipient,
            subject: `System error Experienced.`,
            text: ``,
            html: 
            `<font color="red"><u><h2>A system error occured at http://${myAddr}:${app.port}!</u></font></h2>
            <br>
            Wassup,
            <br>
            There seems to be trouble in paradise.
            <br><br>
            SUMMARY:<br>
            <font color="red">
            ${str(params)}
            </font>
            <br>
            <hr>
            <font color="gray">It's about time for a fix buddy!</font>
            <br><br><br>
            `
            })
        .then(d => 
        {
            log('Error notification email sent'.yell);
            // console.dir(d)
        })
        .catch(e => 
        {
            log(`Failed to send error notification mail!! Reason:`.err);
            log(`${str(e)}`.yell);
            console.dir(e);
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

    throw new Error("Please ensure that an email configuration object is defined in the config folder at the root of your project.");

}