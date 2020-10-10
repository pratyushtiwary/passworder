import React from 'react';
import Input from '../Input';
import Textarea from '../Textarea';
const modal = require("../../modal");
const enc = require("../../enc");
const session = require("../../session");
const generatePass = require("./pass_generate");
const snackbar = require("../../snackbar");

function removeItem(arr,index){
    var a = [];
    index = parseInt(index);
    for(var i = 0;i<arr.length;i++){
            if(i!==index){
                a.push(arr[i]);
            }
    }
    return a;
}


function updateSM(setSM){
    let t = 0;

    function expand(e){
        e.persist();
        e.target.parentElement.querySelector(".h-menu").classList.add("show");
        t = 1;
    }

    function edit(e){
        e.persist();
        let name=e.currentTarget.parentElement.parentElement.parentElement.querySelector(".name").innerText,index = e.currentTarget.parentElement.parentElement.parentElement.getAttribute("id");
        let pwd = JSON.parse(session.get("pwds"))[index]; 
        pwd = enc.decrypt(pwd,session.getSalt());
        t = 1;
        e.currentTarget.parentElement.classList.remove("show");
        let note = JSON.parse(session.get("notes"))[index];
        note = enc.decrypt(note,session.getSalt());
        function click(e){
            e.persist();
            if(e.which===13){
                e.currentTarget.click();
            }
        }
        modal.open(`Edit ${name}`,(
            <>
                <div className="pass">
                    <Input type="text" float={true} value={pwd} id="pass" label="Password" required popover pContent="Update your password or click the shuffle button to generate new one!" width="100%" submit=".modal .options .s"/>
                    <span className="icon new" tabIndex={0} onKeyUp={click} title="Click to generate random passwords" onClick={generatePass}>shuffle</span>
                </div>
                <div className="note">
                    <Textarea id="note" float={true} label="Take Note" popover pContent="Edit note saved with password!">{note}</Textarea>
                </div>
            </>
        ),{
            "s": "Save"
        },true);
        modal.select(".options .s").onclick = ()=>{
            if(modal.verify("#pass")){
                let new_pass = modal.select(".cont #pass");
                let ps = JSON.parse(session.get("pwds"));
                let new_note = modal.select(".cont #note");
                let ns = JSON.parse(session.get("notes"));
                ps[index] = enc.encrypt(new_pass.value,session.getSalt());
                ns[index] = enc.encrypt(new_note.value,session.getSalt());
                new_pass.select();
                session.set("pwds",JSON.stringify(ps));
                session.set("notes",JSON.stringify(ns));
                document.execCommand("copy");
                modal.close();
                modal.select(".cont #pass").blur();
                snackbar.show(`${name} updated & Password is copied to your clipboard!`);
                updateSM(setSM);
            }
        }
    }

    function del(e){
        e.persist();
        t = 1;
        e.currentTarget.parentElement.classList.remove("show");
        let name=e.currentTarget.parentElement.parentElement.parentElement.querySelector(".name").innerText,index = e.currentTarget.parentElement.parentElement.parentElement.getAttribute("id");
        modal.open("Delete Password",(
            <div className="c-text">
                Are you sure you want to delete password for {name}?
            </div>
        ),{
            "d":"<font color='red'>Delete</font>",
            "dis": "Discard"
        });
        modal.select(".options .d").onclick = ()=>{
            let ps = JSON.parse(session.get("pwds")),
            ns=JSON.parse(session.get("names")),
            nt=JSON.parse(session.get("notes"));
            
            ns = removeItem(ns,index);
            ps = removeItem(ps,index);
            nt = removeItem(nt,index);
            ns = JSON.stringify(ns);
            ps = JSON.stringify(ps);
            nt = JSON.stringify(nt);
            session.set("names",ns);
            session.set("pwds",ps);
            session.set("notes",nt);
            updateSM(setSM);
            modal.close();
            snackbar.show(`Password for ${name} deleted successfully!`);
            return;
        }
        modal.select(".options .dis").onclick = ()=>{
            modal.close();
        }
    }
    function showNote(e){
        t = 1;
        e.persist();
        let name = e.currentTarget.parentElement.querySelector(".name").innerText;
        let note = e.currentTarget.querySelector(".content").innerText;
        modal.open(`Note for ${name}`,(
            <div className="note">
                {note}
            </div>
        ),{},true);
    }

    function copy(e){
        if(t===0){
            e.persist();
            let index = e.currentTarget.getAttribute("id");
            let name = e.currentTarget.querySelector(".name").innerText;
            let pwd = JSON.parse(session.get("pwds",session.getSalt()))[index];
            let input = document.createElement("input");
            input.type="text";
            input.classList.add("copy");
            input.value = enc.decrypt(pwd,session.getSalt());
            document.body.append(input);
            input.select();
            document.execCommand("copy");
            input.remove();
            snackbar.show(`Password for ${name} is copied to your clipboard`);
        }
        t = 0;
    }
    


    let km = 0;

    function showSnackforMenuItem1(e){
        km=1;
        e.persist();
        let name = e.currentTarget.parentElement.parentElement.parentElement.querySelector(".name").innerText;
        snackbar.show(`Click to edit ${name}`);
    }
    function showSnackforMenuItem2(e){
        km=1;
        e.persist();
        let name = e.currentTarget.parentElement.parentElement.parentElement.querySelector(".name").innerText;
        snackbar.show(`Click to delete ${name}`);
    }
    function showSnackforNote(e){
        e.persist();
        let name = e.currentTarget.parentElement.querySelector(".name").innerText;
        snackbar.show("Press enter to view note for "+name);
        km = 1;
    }
    function showSnackforMenu(e){
        e.persist();
        let name = e.currentTarget.parentElement.parentElement.querySelector(".name").innerText;
        snackbar.show("Press enter to view options for "+name);
        km = 1;
    }
    function showSnackforPassword(e){
        if(km===0){
            e.persist();
            let name = e.currentTarget.querySelector(".name").innerText;
            snackbar.show("Press enter to copy password for "+name);
        }
        km = 0;
    }


    function click1(e){
        e.persist();
        if(e.which===13){
            e.currentTarget.click();
        }
        km=1
    }

    function click2(e){
        e.persist();
        if(e.which===13){
            e.currentTarget.click();
            e.currentTarget.parentElement.querySelectorAll(".h-menu .item").forEach(ee=>{
                ee.setAttribute("tabindex",0);
            });
        }
        km = 1;
    }

    function click(e){
        e.persist();
        if(e.which===13&&km===0){
            e.currentTarget.click();
        }
        km=0;
    }

    setSM(()=>{
        let names = JSON.parse(session.get("names")), pwds = JSON.parse(session.get("pwds"));
        if(names.length>0&&pwds.length>0){
            return (
                <div className="passwords">
                  {names.map((name,index)=>{
                      return (
                          <div className="password" key={index} id={index}  tabIndex={0} title={"Click to copy password for "+enc.decrypt(name,session.getSalt())} onClick={copy} onFocus={showSnackforPassword} onKeyUp={click}>
                              <div className="main">
                                    <div className="name">{enc.decrypt(name,session.getSalt())}</div>
                                    {
                                        enc.decrypt(JSON.parse(session.get("notes"))[index],session.getSalt())!=="" &&
                                                <div className="note" tabIndex={0} onFocus={showSnackforNote} onKeyUp={click1} title="Click to view full note"  onClick={showNote}>
                                                    <span className="nm"><span className="icon">sticky_note_2</span>Your Note :-</span>
                                                    <div className="content">{enc.decrypt(JSON.parse(session.get("notes"))[index],session.getSalt())}</div>
                                                </div>
                                    }
                              </div>
                              <div className="menu">
                                <span className="icon more" tabIndex={0} onFocus={showSnackforMenu} onKeyUp={click2} title={"More Options for "+enc.decrypt(name,session.getSalt())} onClick={expand}>more_vert</span>
                                <div className="h-menu">
                                    <div className="item" tabIndex={-1} onKeyUp={click1} onFocus={showSnackforMenuItem1} title={"Edit password for "+enc.decrypt(name,session.getSalt())} onClick={edit}><span className="icon">edit</span><span>Edit</span></div>
                                    <div className="item" tabIndex={-1} onKeyUp={click1} onFocus={showSnackforMenuItem2} title={"Delete password for "+enc.decrypt(name,session.getSalt())} onClick={del}><span className="icon">delete</span><span>Delete</span></div>
                                </div>
                              </div>
                          </div>
                      )
                  })}
                </div>
            )
        }
        else{
            return (
                <div className="passwords">
                    <div className="empty">
                        <div className="empty-img"></div>
                        <span className="nothing">Nothing Found!</span>
                    </div>
                </div>
            )
        }
    });

}

export {
    updateSM
}