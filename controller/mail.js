const fs = require('fs')
const nodemailer = require('nodemailer');

let mailerConfig = {
    godaddy:{    
        host: "smtpout.secureserver.net",  
        secureConnection: true,
        port: 465,
        auth: {
            user: "info@thetidbit.in",
            pass: "thetidbitcompany2022"
        }
    },
    gmail:{
        service: 'gmail',
        auth: {
            user: 'info@thetidbit.in',
            pass: 'thetidbitcompany2022'
        }
    }
}

const callSendMail = (from, to, htmlContent)=>{
    let mailTransporter = nodemailer.createTransport(mailerConfig.godaddy);

    let mailDetails = {
        from: 'info@thetidbit.in',
        to: to,
        subject:"Introducing TheTidBit.in, Have you checked?",
        html: htmlContent
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log('Error Occurs', err);
        } else {
            console.log('Email sent successfully');
            return
        }
    });
}

const setupMail = (list, from, htmlContent) => {

    for (var x = 0, ln = list.length; x < ln; x++) {
        console.log("check x:",x)
        setTimeout(function (email) {
            callSendMail(from, email, htmlContent)
            console.log("**********", email);
        }, 1000*(x+1), list[x]); // we're passing x
    }

}


const  sentEmail = async (req, res) => {

    if(req.body.data && req.body.data.length){

         let htmlContent = fs.readFileSync(`./controller/html/index.html`, 'utf8')

        setupMail(req.body.data, 'info@thetidbit.in', htmlContent)
        return

    }

    return res.send({msg:"mail not found in data param"})
};


module.exports = { sentEmail }