import React, { useState,useEffect } from 'react';
import "../css/textarea.css";
import Popover from './Popover';


function Textarea(props){
    const [p,setP] = useState("");
    const [pv,setPV] = useState("");

    useEffect(()=>{
        function float(e){
            e.persist();
            setPV("visible");
            e.currentTarget.parentElement.querySelector("label").classList.add("float");
        }
        
    
        function remFloat(e){
            e.persist();
            if(e.currentTarget.value===""){
                e.currentTarget.parentElement.querySelector("label").classList.remove("float");
            }
            setPV("");
        }
        if(props.popover){
            setP((
                <Popover content={props.pContent} className={pv+" "+props.pClassName} width={props.pWidth}>
                    <div className="textarea">
                        <label htmlFor={props.id} className={props.float?"float":""}>{props.label}</label>
                        <textarea id={props.id} onFocus={float} onBlur={remFloat} defaultValue={props.children}></textarea>
                    </div>
                </Popover>
            ))
        }
        else{
            setP((
                <div className="textarea">
                    <label htmlFor={props.id} className={props.float?"float":""}>{props.label}</label>
                    <textarea id={props.id} onFocus={float} onBlur={remFloat} defaultValue={props.children}></textarea>
                </div>
            ));
        }
    },[props,pv]);

    return (
        <>
            {p}
        </>
    )
}

export default Textarea;