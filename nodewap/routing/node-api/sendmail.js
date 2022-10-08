require("dotenv").config();
const fs = require("fs");
const mail = require("nodemailer");
exports.result = (request, response)=>{
    let formdata = "";
    request.on("data", (chunks)=>{
        formdata += chunks.toString();
    });

    request.on("end", ()=>{
        // console.log(process.env.ADMIN_EMAIL_USERNAME);
        const reciept = JSON.parse(formdata);
        const auth = mail.createTransport({
            host : 'smtp.gmail.com',
            auth : {
                user : process.env.ADMIN_EMAIL_USERNAME,
                pass : process.env.ADMIN_EMAIL_PASSWORD
            },
            port : 587,
            sequre : false
        })

        const mailDetails = {
            form : process.env.ADMIN_EMAIL_USERNAME,
            to : reciept.email,
            subject : "Verification link",
            html : fs.readFileSync("html/email-template.html")
        }

        auth.sendMail(mailDetails, (error, successRes)=>{
            if(error)
                throw error;
            console.log(successRes);
        });
    })
    response.write("success");
    response.end();
}