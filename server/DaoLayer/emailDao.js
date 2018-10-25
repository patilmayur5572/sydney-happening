const nodemailer = require('nodemailer');
var emailKeys = require('../config/emailKeys');

module.exports = {
    //Use this function to send emails. Callback to be used for passing back error.  
    sendEmail: function(emailFrom, emailTo, emailSubject, emailMessage, callback) {
        
        /*
        * using nodemailer for sending emails.
        * for using gmail, you need OAuth2 authentication.
        * generate client ID, client secret, refresh and access token with gmail to use.
        */  
        let transporter = nodemailer.createTransport({
            host: emailKeys.host,
            port: emailKeys.port,
            secure: emailKeys.secure, // true for 465, false for other ports
            auth: {        
                type: emailKeys.type,
                user: emailKeys.user,
                clientId: emailKeys.clientId,
                clientSecret: emailKeys.clientSecret,
                refreshToken: emailKeys.refreshToken,
                accessToken: emailKeys.accessToken,
                expires: emailKeys.expires  
            }
        });

        /* 
        * set the email options here.
        * @from: sender's email
        * @to: reciever's email(s)
        * @subject: subject of the email
        * @text: message body
        */
        let mailOptions = {
            from: emailFrom, 
            to: emailTo, 
            subject: emailSubject, 
            text:  emailMessage
        };

        //this sends the email
        transporter.sendMail(mailOptions, (error, info) => {
            callback(error, info);
        });
    }
}