require("dotenv").config();
// const fs = require("fs");
const mail = require("nodemailer");
const crypto = require("crypto");
const database = require("./db");
const jwt = require("jsonwebtoken");


exports.result = (request, response) => {
    let formdata = "";
    request.on("data", (chunks) => {
        formdata += chunks.toString();
    });

    request.on("end", () => {
        const reciept = JSON.parse(formdata);
        const secret = crypto.randomBytes(16).toString("hex");
        const insertRes = database.insertOne({
            secret: secret,
            created_at: new Date(),
            isVarified: false
        }, "jwt_secrets")
        insertRes.then((successRes) => {
            const secret_id = successRes.data.insertedId;
            const token = jwt.sign({
                iss: "http://localhost:8080/api/sendmail",
                data: {
                    email: reciept.email
                }
            }, secret, { expiresIn: 900 });

            const link = `http://localhost:8080/profile?token=${token}&secretId=${secret_id}&verify=${reciept.id}`;
            
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
                html : `<!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <meta http-equiv="X-UA-Compatible" content="ie=edge">
                  <title>Document</title>
                </head>
                <body style="
                    background:#f2f2f2;
                    padding:32px 0
                ">
                    <div style="
                      width: 580px;
                      padding: 32px;
                      background: white;
                      box-shadow: 0 0 10px #ddd;
                      margin: 32px auto
                    ">
                      <center>
                        <img src="https://www.searchpng.com/wp-content/uploads/2019/01/Myntra-logo-png-icon-715x715.png" width="100">
                        <h1 style="font-family: sans-serif">Verification Required !</h1>
                        <p style="
                          font-family: calibri;
                          font-size: 18px;
                          letter-spacing: 1px
                        ">
                          To complete your profile activation, we just need to verify your email address
                        </p>
                        <button style="
                          padding: 13px 20px;
                          border: none;
                          background: #bf00ff;
                          color: white;
                          border-radius: 4px;
                          margin-top: 16px;
                          box-shadow: 0 0 5px #ddd
                        "><a href="${link}" style="text-decoration : none; color: white">VERIFY NOW</a></button>
                      </center>
                
                    </div>
                </body>
                </html>
                `
            }
            
            auth.sendMail(mailDetails, (error, successRes)=>{
                if(error)
                    throw error;
                console.log(successRes);
            });
        }).catch((errorRes) => {
            console.log(errorRes);
        });
    })
    response.write("success");
    response.end();
}