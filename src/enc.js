const CryptoJS = require('crypto-js');

let enc = {};

enc.encrypt = (message,salt)=>{
    return CryptoJS.AES.encrypt(message,salt).toString();
};

enc.decrypt = (encMessage,salt)=>{
    return (CryptoJS.AES.decrypt(encMessage,salt)).toString(CryptoJS.enc.Utf8);
}

exports.encrypt = enc.encrypt;
exports.decrypt = enc.decrypt;