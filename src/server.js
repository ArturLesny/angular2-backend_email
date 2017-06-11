'use strict';
const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/send-mail', function (req, res) {
    // PUT your send mail logic here, req.body should have your fsubmitted form's values
    sendMail(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.send('SEND MAIL');
});

app.listen(3000, function () {
    console.log('LISTENING on port 3000');
});

function sendMail(formData) {
// Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: '<login gmail>',
          pass: '<password gmail>'
        },
        debug: true // include SMTP traffic in the logs
      },
      {
        // default message fields
        // sender info
        from: 'Artur <toudik99@gmail.com>',
        headers: {
          'X-Laziness-level': 1000 // just an example header, no need to use this
        }
      });
    console.log('SMTP Configured');

    // Message object
    let message = {
        // Comma separated list of recipients
        to: 'Artur <commar@tlen.pl>',
        // Subject of the message
        subject: 'Wiadomość wysłana przez Nodemailer', //
        // plaintext body
        text:
        'Wiadomość wysłana przez : ' + formData.name + "\n" +
        'Adres kontaktowy e-mail : ' + formData.email + "\n" +
        'Wiadomość dotyczy       : ' + formData.message + "\n",
        // HTML body
        html:
        '<p>Wiadomość wysłana przez : '+formData.name+'</p>' +
        '<p>Adres kontaktowy e-mail : '+formData.email+'</p>' +
        '<p>Wiadomość dotyczy       : '+formData.message+'</p>',
    };

console.log('Sending Mail');
    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('Error occurred ', error.message);
            return;
        }
        console.log('Message sent successfully!');
        console.log('Server responded with "%s"', info.response);
        transporter.close();
    });
}
