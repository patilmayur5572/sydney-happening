var express = require('express');
var router = express.Router();
const sendEmailAccess = require('../DaoLayer/emailDao');

// Service for sending email to admins and confirmation email to user. 
router.post('/sendEmail', function(req, res, next) {

    var useremail = req.body.email;
    var username = req.body.name;
    var phone = req.body.phone;
    var message = req.body.message;
    
    //set parameters to forward the message to admin emails.
    var messageBody = "Hi, User: "+username+", phone: "+phone+ " email: "+useremail+", sent message:"+message;
    var emailFrom = '"Sydney Happening" <sunit@sydneyhappening.com>';
    var emailTo = 'sunitsingh2291@gmail.com, patilmayur5572@gmail.com';
    var emailSubject = "New user message from Sydney Happening";
    sendEmailAccess.sendEmail(emailFrom, emailTo, emailSubject, messageBody, function(err, message) {
        if(err) {
            console.log(err) //log the error in sending email.
            return res.status(500).json({error: "Error in sending message to admins"});
        }
    });

    //set parameters to send confirmation email to user.
    messageBody = "Hello, we have recieved your message, we would get back to you soon.";
    emailFrom = '"Sydney Happening" <sunit@sydneyhappening.com>';
    emailTo = useremail;
    emailSubject = "Auto generated email";
    sendEmailAccess.sendEmail(emailFrom, emailTo, emailSubject, messageBody, function(err, message) {
        if(err) {
            //send correct code and message as email to admins has been successful.
            return res.status(200).json({message: "Email sent to admins"}); 
        }
    });
    //if no error send this message informating user their message is sent.
    return res.status(200).json({message: "Email sent to admins, they would get back to you."});
});

module.exports = router;