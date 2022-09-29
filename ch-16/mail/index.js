require("dotenv").config();
const http = require("http");
const nodemailer = require("nodemailer");
const fs = require("fs");

// console.log(process.env.EMAIL_ID);
// console.log(process.env.EMAIL_PWD);


const server = http.createServer((request, response) => {

    fs.readFile("template.html", (error, message) => {
        email(message, response)
    });
    const email = (message, response) => {

        const auth = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PWD
            },
            port: 587,
            sequre: false
        });


        const mes = {
            from: process.env.EMAIL_ID,
            to: 'dewangandipendradewangan@gmail.com',
            subject: 'verification email',
            text: "message",
            // attachments : [
            //     {
            //         filename : "notes.pdf",
            //         content : fs.createReadStream("files/file.pdf")
            //     },
            //     {
            //         filename : "demo.jpg",
            //         content : fs.createReadStream("files/images.jpeg")
            //     }
            // ]
        };

        auth.sendMail(mes, (error, sendRespose) => {
            if (error) {
                throw error;
            }

            console.log("success");
            response.end();
        });
    }
});


server.listen(8080);





// const http = require("http");
// const nodemailer = require('nodemailer');
// const server = http.createServer((request, response)=>{
//     const auth = nodemailer.createTransport({
//         host : 'smpt.gmail.com',
//         auth : {
//             user : 'dewangandipendradewangan@gmail.com',
//             pass : 'nekfhbzioqiqaodm'
//         },
//         port : 587,
//         secure : false
//     })

//     const reciept = {
//         from : 'dewangandipendradewangan@gmail.com',
//         to : 'dewangandipendradewangan@gmail.com',
//         subject : 'Varification mail',
//         text : 'your email varification code is : 1234'
//     }

//     auth.sendMail(reciept, (error, emailResponse)=>{
//         if(error)
//             throw error,

//         console.log("success");
//         response.end();
//     })

// });


// server.listen(8080);