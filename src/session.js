const enc = require('./enc');
let session = {};

session.setSalt = (salt)=>{
    localStorage.setItem("pw_salt",enc.encrypt(salt,"drjwhawosuesxnsbdydnxw"));
    return true;
}

session.getSalt = ()=>{
    if(localStorage.getItem("pw_salt")){
        return (enc.decrypt(localStorage.getItem("pw_salt"),"drjwhawosuesxnsbdydnxw"));
    }
    return false;
}

session.saltExists = ()=>{
    if(localStorage.getItem("pw_salt")){
        return true;
    }
    return false;
}

session.set = (key,value)=>{
    key  = "pw_"+key;
    if(!localStorage.getItem(key)){
        localStorage.setItem(key,enc.encrypt("[]",session.getSalt()));
    }
    localStorage.setItem(key,enc.encrypt(value,session.getSalt()));
    return true;
}

session.get = (key)=>{
    key  = "pw_"+key;
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