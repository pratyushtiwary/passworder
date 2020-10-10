import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Fab from './Fab';
import Input from './Input';
import Textarea from './Textarea';
import "../css/home.css";
const session = require("../session");
const modal = require("../modal");
const enc = require("../enc");
const snackbar = require("../snackbar");
const generatePass = require("./home_comps/pass_generate");
const updater = require("./home_comps/update_SM");


function Home(props){

    const [main,setMain] = useState("");
    const [sm,setSM] = useState("");

    document.body.onkeyup = (ee)=>{
        if(ee.which===27){
            document.querySelectorAll(".passwords .password .menu").forEach(e=>{
                e.querySelector(".h-menu").classList.remove("show");
                e.querySelectorAll(".h-menu .item").forEach(ee=>{
                    ee.setAttribute("tabindex",-1);
                })
            });
    }
    }

    window.onclick = (elem)=>{
        document.querySelectorAll(".passwords .password .menu").forEach(e=>{
            if(!e.contains(elem.target)){
                e.querySelector(".h-menu").classList.remove("show");
                e.querySelectorAll(".h-menu .item").forEach(ee=>{
                    ee.setAttribute("tabindex",-1);
                })
            }
        });
            
    }

    useEffect(()=>{
        updater.updateSM(setSM);
    },[]);

    useEffect(()=>{
        
        if(session.saltExists()){
            function fabOpen(e){

                function click(e){
                    e.persist();
                    if(e.which===13){
                        e.currentTarget.click();
                    }
                }

                modal.open("Add New Password",(
                    <>
                        <Input type="text" id="name" label="Name" required popover pContent="Give a name to your password!" width="100%" submit=".modal .options .s"/>
                        <div className="pass">
                            <Input type="text" id="pass" label="Password" required popover pContent="Enter a password or click the shuffle button to generate new one!" width="100%" submit=".modal .options .s"/>
                            <span className="icon new" tabIndex={0} onKeyUp={click} title="Click to generate random passwords" onClick={generatePass}>shuffle</span>
                        </div>
                        <div className="note">
                            <Textarea id="note" label="Take Note" popover pContent="Enter a note to save with password!"></Textarea>
                        </div>
                    </>
                ),{
                    "s": "Save"
                },true);
                modal.select(".options .s").onclick = ()=>{
                    if(modal.verify("#name")&&modal.verify("#pass")){
                        let salt = session.getSalt();
                        let pass = modal.select(".cont #pass");
                        let name = modal.select(".cont #name");
                        let note = modal.select(".cont #note");
                        let eName = enc.encrypt(name.value,salt);
                        let ePass = enc.encrypt(pass.value,salt);
                        let eNote = enc.encrypt(note.value,salt);
                        pass.select();
                        document.execCommand("copy");
                        modal.close();
                        let names = JSON.parse(session.get("names"));
                        names.push(eName);
                        names = JSON.stringify(names);
                        session.set("names",names);
                        let pwds = JSON.parse(session.get("pwds"));
                        pwds.push(ePass);
                        pwds = JSON.stringify(pwds);
                        session.set("pwds",pwds);
                        let notes = JSON.parse(session.get("notes"));
                        notes.push(eNote);
                        notes = JSON.stringify(notes);
                        session.set("notes",notes); 
                        modal.select(".cont #pass").blur();
                        snackbar.show("Your password is saved and copied to your clipboard!");
                        updater.updateSM(setSM);
                    }
                }    
            }

            function click(e){
                e.persist();
                if(e.which===13){
                    e.currentTarget.click();
                }
            }

            function showSnackForFab(e){
                snackbar.show("Click to add new password!")
            }

            setMain((
                <>
                    {sm}
                    <Fab bg="red" color="#fff" tabIndex={0} onFocus={showSnackForFab} onKeyUp={click} title="Add new password" onClick={fabOpen}>add</Fab>
                </>
            ))
        }
        else{
            setMain((
                <Redirect to="/onboard"/>
            ))
        }

    },[props,sm]);

    return (
        <>
            {main}
        </>
    )
}

export default Home;