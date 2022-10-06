// this is for after coding

const http = require("http");
const fs = require("fs");
const nodemailer = require("nodemailer");
const server = http.createServer((request, response)=>{
require("dotenv").config;

    
    const email = nodemailer.createTransport({
        host : 'smtp.gmail.com',
        auth : {
            user : 'dewangandipendradewangan@gmail.com',
            pass : 'nekfhbzioqiqaodm'
        },
        port : 587,
        secure : false
    })

    const msg = {
        from : 'dewangandipendradewangan@gmail.com',
        to : 'paymentwap@gmail.com',
        subject : '29nt adse fees',
        html : '<p>Dear Sir</p><br><pre>    please find the attachement</pre>',
        attachments : [
            {
                filename : "29nth_payment_slip.jpg",
                content : fs.createReadStream("assats/payment_slip.jpeg")
            }
        ]
    }
    email.sendMail(msg , (error, sendRes)=>{
        if(error){
            throw error;
        }
        else{
            console.log("success");
            response.end();
        }
    })

});

server.listen(200);