const crypto = require("crypto");

let y = ()=>Math.round(Math.random()*11);

// Code is copied from StackOverflow!
let replaceAt = (index,replacement,string)=>{
    return (string.substr(0,index)+replacement+string.substr(index+replacement.length));
}

let z = ()=>{
    let specialChars = ["@","#","!","&","*"];
    return (specialChars[Math.round(Math.random()*(specialChars.length-2))])
}

function generatePass(e=false){
    var new_pass = crypto.randomBytes(6).toString("hex");
    new_pass = replaceAt(y(),z(),new_pass);
    if(e){
        e.persist();
        e.currentTarget.parentElement.querySelector("#pass").value = new_pass;
        e.currentTarget.parentElement.querySelector("label").classList.add("float");
        return true;
    }
    return new_pass;
}

module.exports = generatePass;