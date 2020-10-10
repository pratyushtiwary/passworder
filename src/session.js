const enc = require('./enc');
let session = {};

session.setSalt = (salt)=>{
    localStorage.setItem("salt",enc.encrypt(salt,"drjwhawosuesxnsbdydnxw"));
    return true;
}

session.getSalt = ()=>{
    if(localStorage.getItem("salt")){
        return (enc.decrypt(localStorage.getItem("salt"),"drjwhawosuesxnsbdydnxw"));
    }
    return false;
}

session.saltExists = ()=>{
    if(localStorage.getItem("salt")){
        return true;
    }
    return false;
}

session.set = (key,value)=>{
    if(!localStorage.getItem(key)){
        localStorage.setItem(key,enc.encrypt("[]",session.getSalt()));
    }
    localStorage.setItem(key,enc.encrypt(value,session.getSalt()));
    return true;
}

session.get = (key)=>{
    let t = localStorage.getItem(key);
    if(t){
        return enc.decrypt(t,session.getSalt());
    }

    if(session.getSalt()){
        let def = enc.encrypt("[]",session.getSalt());
        localStorage.setItem(key,def);
        return "[]";
    }

    return 0;
}

module.exports = session;