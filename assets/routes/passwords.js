let router = new express.Router();

//@ THE MAIN ROUTE
router.route("/")
    .get((req, res) => {

        res.sendFile(`${__dirname}/templates/password/main.html`);

    })

//@ FORGOT PASSWORD HANDLER
router.route("/forgot")
    .all((req, res) => {

        let params = get_params(req);

        if (params.email) {

            $connection.query("SELECT * from members WHERE email=$1 LIMIT 1", [params.email])
                .then(userData => {

                    if (userData[0]) {

                        //@ GENERATE A RECOVERY KEY
                        let reckKey = crypto.randomBytes(parseInt(45)).toString('hex');

                        //@ Save the recovery key in the password recovery table
                        $connection.query("INSERT INTO password_recovery (member,recovery_key) VALUES ($1,$2) RETURNING password_recovery_id AS recovery_id", [userData[0].member_id, reckKey])
                            .then(recovery => {

                                if (recovery[0]) {

                                    let recovery_id = recovery[0].recovery_id;

                                    //@ Fetch the password recovery html template 
                                    let template = fs.readFileSync(`${__dirname}/templates/password/forgot.html`, 'utf8');

                                    //@ Replace the template strings with the proper fetched data
                                    template = template.replace(/{{user}}/ig, `${userData[0]["name.first"]}`)
                                        .replace(/{{user_account}}/ig, `${userData[0]["account.name"]}`)
                                        .replace(/{{user_recovery_link}}/ig, `http://${myAddr}:${app.port}/passwords/recover/${recovery_id}/${userData[0].email}/${reckKey}`)

                                    //@ Format the mail object for sending
                                    let mailObj = {
                                        from: 'passwords@bixbyte.io',
                                        to: userData[0].email,
                                        subject: 'Framify Password recovery request',
                                        html: template
                                    }

                                    //@ Send the user a recovery email
                                    if (sendMail) {

                                        sendMail(mailObj)
                                            .then(msg => {
                                                res.send(make_response(200, `A password recovery email is on its way to ${params.email}.<br><br>Please check your <b style="color:orange !important;">Junk</b> or <b style="color:orange !important;">spam</b> folders before trying again.`, 'continue'))
                                            })
                                            .catch(err => {
                                                res.send(make_response(500, `An error occured when trying to send your email.<br>Please try again.<br><br>Error: ${err.message}`));
                                            })

                                    } else {

                                        res.send(make_response(500, 'The email sending server has not been defined for this application.<br> Please consult your administrator for assistance'))

                                    }

                                } else {

                                    res.send(make_response(500, "Failed to recover your password due to password recovery technicalities.<br>Please try again.", recovery))

                                }



                            })
                            .catch(err => {
                                res.send(make_response(500, "Failed to generate a recovery token.<br>Please try again", err.message))
                            })

                    } else {
                        res.send(make_response(500, "Sorry, we could not find an account with that email address.", userData))
                    }

                })
                .catch(err => {
                    res.send(make_response(500, err.message));
                })

        } else {

            res.send(make_response(500, 'Please provide your email address for password recovery'));

        }

    })

router.route("/recover/:id/:email/:token")
    // router.route("/recover")
    .all((req, res) => {

        if (isDefined(req.params, "id,email,token")) {

            let params = get_params(req);

            // console.log("Your parameters")
            // console.dir(params)

            //@ CHECK TO ENSURE THAT THE PROVIDED ROUTE PARAMETERS ARE VALID
            $connection.query("SELECT password_recovery_id FROM vw_password_recovery WHERE password_recovery_id=$1 AND member_email=$2 AND recovery_key=$3 ", [req.params.id, req.params.email, req.params.token])
                .then(userData => {

                    if (userData[0]) {

                        if (!params.password || !params.password2 || (params.password != params.password2)) {

                            res.sendFile(`${__dirname}/templates/password/new.html`)

                        } else {


                            //@ UPDATE THE USER PASSWORD
                            $connection.query("UPDATE members SET Password=$1 WHERE email=$2 RETURNING member_id", [crypt.md5(params.password), req.params.email])
                                .then(resp => {

                                    if (resp[0]) {

                                        //@ DISABLE ALL OF THE USER'S PASSWORD RESET TOKENS
                                        $connection.query("UPDATE password_recovery SET used=true WHERE member=$1 AND used=false", [resp[0].member_id])
                                            .then(updatedNull => {

                                                res.send(make_response(200, "Your password has successfully been updated.<br>Please login to continue."))

                                            })
                                            .catch(err => {
                                                res.send(make_response(500, err.message));
                                            })

                                    } else {

                                        //@ FAILED TO DISABLE THE RECOVERY TOKEN
                                        res.send(make_response(200, "Failed to disable the recovery key you just used"))

                                    }

                                })
                                .catch(err => {
                                    res.send(make_response(500, err.message))
                                })

                        }

                    } else {

                        res.sendFile(`${__dirname}/templates/password/invalid.html`);

                    }



                })

        } else {

            res.send(make_response(200, "Please ensure that all the parameters are defined."))

        }

    })

module.exports = router;