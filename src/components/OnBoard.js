import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Input from './Input';
const session = require("../session");
const modal = require("../modal");

function OnBoard(props){
    const [main,setMain] = useState("");
    useEffect(()=>{
        if(session.saltExists()){
            setMain((
            <Redirect to="/"/>
            ));
        }
        modal.open("Enter A Pass Phrase",(
            <>
            <Input type="text" required popover pClassName="center" pContent="Enter Pass Phrase" id="salt" center label="Pass Phrase" pWidth="90%" width="100%" submit=".modal .options .s"/>
            <p className="info">This <b>Pass Phrase</b> will be used to <b>encrypt your passwords</b> and will be asked to you randomly so <b>please keep it safe and remember it!</b></p>
            </>
        ),{
            "s": "Set Pass Phrase"
        },false);

        modal.select(".options .s").onclick = ()=>{
            if(modal.verify("#salt")){
                let i=modal.select(".body #salt")
                let c;
                c = window.confirm("Are you sure you want to use '"+i.value+"' as your pass phrase??");
                if(c){
                    session.setSalt(i.value);
                    window.location.href = "#";
                    modal.close();
                }
                else{
                    i.focus();
                }
            }
        };
    
    },[props])
    return (
        <>
            {main}
        </>
    )
};

export default OnBoard;