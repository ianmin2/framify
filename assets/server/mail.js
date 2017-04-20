//@ THE EMAIL SENDING SERVICE LOADER MEHOD 
var mail = () => {};

if (fs.existsSync(`${__dirname}/../config/mailgun.conf`)) {

    var apiKey = require(`${__dirname}/../config/mailgun.conf`);
    email = mailgun(apiKey);

    /**
     * sendData should be in the format: 
     * 
     * var attch = new mailgun.Attachment({data: filepath, filename: filename});
     * {
            from: 'Excited User <me@samples.mailgun.org>',
            to: 'serobnic@mail.ru',
            subject: 'Hello',
            text: 'Testing some Mailgun awesomness!',
            attachment: attch
        };

        for more, visit https://www.npmjs.com/package/mailgun-js
    */
    //@ THE MAIN EMAIL SENDING FUNCTION
    global.sendMail = (sendData) => {

        return new Promise((resolve, reject) => {

            email.messages().send(sendData, function(error, body) {
                if (error) {
                    reject(error);
                } else {
                    resolve(body);
                }
            });

        });

    };


} else {

    c_log(`\n✘ `.err + ` Failed to initialize the email service.\n`.err +
        `\n   Please define a `.info +
        `mailgun.conf`.yell +
        ` file in the `.info +
        `config`.yell +
        ` folder of your application with the content:`.info);

    c_log(`
        module.exports = {
            apiKey: "YOUR_MAILGUN_SPECIAL_KEY_GOES_HERE",
            domain: "mg.YOUR_DOMAIN.TLD"
        };
    `);

    c_log(`   to enable email sending functionality.\n`.info);

};
