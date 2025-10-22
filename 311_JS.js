const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

function send_reset_email(email, token) {
    // placeholder function for sending password reset email
    console.log(`Triggering a reset email for ${email} ${token}`)
}

function alter_the_pass(email, password) {
    // placeholder function for resetting password
    console.log(`Performing password reset for ${email} to ${password}`)
}

app.get('/alter_the_pass', async (req, res) => {
    token = req.query.token;
    if (token != null) {
   	 email = btoa(token);
   	 res.send(`<form method=POST>Email: <input name=email value=${email}><br>New password: <input name=new_password type=password><br>Confirm: <input name=new_password_confirm type=password><input type=submit value=Reset><input type=hidden name=token value=${token}></form>`)
    } else {
    	// password reset form
   	 res.send("<form method=POST>Email: <input name=email><input type=submit value=Reset></form>")
    }
});

app.post('/alter_the_pass', async (req, res) => {
    email = req.body.email;
    token = req.body.token;
    if (token == null) {
   	 // generate token
   	 token = btoa(email);
   	 send_reset_email(email, token);
   	 res.send(`Action Triggered - Password reset email sent to ${email}`)
    } else {
   	 // handle password reset
   	 if (req.body.new_password == req.body.new_password_confirm) {
   		 if (email == atob(token)) {
   			 alter_the_pass(email, req.body.new_password)
   			 res.send(`Action Triggered - Reset Success for ${email}`)
   		 }
   	 } else {
   		 res.send("The mentioned password do not match. Please try again")
   	 }
    }
});

app.listen(8080, "0.0.0.0", () => {
    console.log(`Server running on port 8080`);
});
