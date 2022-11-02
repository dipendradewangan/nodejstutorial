const bcrypt = require("bcrypt");

const encrypt = async (data)=>{
    const encryptedData = await bcrypt.hash(data, 12);
    return encryptedData;
}

const decrypt = ()=>{

}

module.exports = {
    encrypt : encrypt,
    decrypt : decrypt
}