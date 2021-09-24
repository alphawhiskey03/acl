const nodemailer=require("nodemailer");

var transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"s.vignesh0300@gmail.com",
        pass:"vigneshnew@2203"
    }
});

var mailOptions = {
    from: 's.vignesh0300@gmail.com',
    to: 'alphavignesh98@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };


transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
});