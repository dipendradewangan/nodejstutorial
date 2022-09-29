const bcrypt = require("bcrypt");
let password = "Dipendra";
console.log(password);
bcrypt.hash(password, 10).then((encryptedForm)=>{
    console.log(encryptedForm);
})