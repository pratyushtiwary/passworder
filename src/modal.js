import React from 'react';
import ReactDOM from 'react-dom';
import RenderToHTML from './renderToHTML';


function close(){
    let m = document.body.querySelector(".modal");
    if(m){
        m.classList.remove("show");
        if(document.querySelector(".passwords .password")){
            document.querySelector(".passwords .password").focus();
        }
    }
}

const create = ()=>{

    let m = document.createElement("div");
    m.classList.add("modal");
    document.body.append(m);
    return m;

}

function shakeModal(){
    let m = document.body.querySelector(".modal .cont");
    m.style.transform = "translate(-47.5%,-50%) scale(1)";
    setTimeout(()=>{
        m.style.transform = "translate(-52.5%,-50%) scale(1)";
    },200);
    setTimeout(()=>{
        m.style.transform = "translate(-50%,-50%) scale(1)";
    },500);
}


function open(head,body,options,t=false,width="auto"){
    let m;
    if(!document.body.querySelector(".modal")){
        m = create();
    }
    else{
        m = document.body.querySelector(".modal");
    }
    close();
    m.innerHTML = "";

    let c = document.createElement("span");
    let opacity = document.createElement("div")
    ,cont = document.createElement("div")
    ,h = document.createElement("div")
    ,b = document.createElement("div")
    ,o = document.createElement("div")
    ,d = document.createElement("div");

    h.innerText = head;
    c.innerText = "close";

    c.classList.add("icon");
    c.classList.add("close");
    h.classList.add("head");
    o.classList.add("options");
    b.classList.add("body");
    cont.classList.add("cont");
    cont.setAttribute("tabindex",0);
    d.classList.add("c");

    c.setAttribute("tabindex",0);

    d.append(h,b,o);
    cont.append(d,c);
    for(var a in options){
        o.innerHTML += `
            <div class="option ${a}" tabindex="0">
                ${options[a]}
            </div>
        `;
    }
    opacity.classList.add("opacity");

    c.style.display = "none";


    if(t){
        c.style.display = "block";
        c.onclick = ()=>{
            close();
        }
        opacity.onclick = ()=>{
            close();
        }
    }
    else{
        opacity.onclick = ()=>{
            shakeModal();
        }
    }

    cont.style.width = width;
    m.append(cont);
    m.append(opacity);
    c.onkeyup = (e)=>{
        if(e.which===13){
            c.click();
        }
    }
    document.querySelectorAll(".modal .options .option").forEach(e=>{
        e.onkeyup = (ee)=>{
            if(ee.which===13){
                e.click();
            }
        }
    });
    cont.focus();
    ReactDOM.render(
        <React.StrictMode>
          <RenderToHTML>
              {body}
          </RenderToHTML>
        </React.StrictMode>,
        m.querySelector(".cont .body")
      );
    m.classList.add("show");
}

function select(selector){
    let m = document.querySelector(".modal");
    if(m){
        return m.querySelector(selector);
    }
    return false;
}

function verify(input){
    let i = document.querySelector(".modal .body "+input);
    if(i.value!==""){
        return true;
    }
    i.focus();
    shakeModal();
    return false;
}

window.onkeyup = (e)=>{
    if(e.which===27){
        close();
    }
}

export {
    open,
    close,
    select,
    verify
}