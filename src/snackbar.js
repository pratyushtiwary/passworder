import "./css/snackbar.css";

let show = (msg,timeout=5000)=>{
    let s = document.body.querySelector(".snackbar");

    if(!s){
        s = document.createElement("div");
        s.classList.add("snackbar");
        document.body.append(s);
    }

    s.innerText = msg;
    s.classList.add("show");
    
    setTimeout(()=>{
        s.classList.remove("show");
    },timeout);

}

let hide = ()=>{
    let s = document.body.querySelector(".snackbar");

    if(!s){
        s = document.createElement("div");
        s.classList.add("snackbar");
        document.body.append(s);
    }

    s.classList.remove("show");

}

export {
    show,
    hide
}