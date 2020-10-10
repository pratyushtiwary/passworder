import React,{ useEffect, useState } from 'react';
import "../css/input.css";
import Popover from './Popover';

function Input(props){
    const [p,setP] = useState("");
    const [pv,setPV] = useState("");
    const [val,setVal] = useState(props.value?props.value:"");

    useEffect(()=>{
        function float(e){
            e.persist();
            e.target.parentElement.querySelector("label").classList.add("float");
            setPV("visible");
            setVal(e.currentTarget.value);
        }
        function shakeInput(e){
            let input = e;
            input.style.border = "1px solid red";
            input.style.boxShadow = "0 0 5px 0 red";
            setTimeout(()=>{
                input.style.border = "1px solid transparent";
                input.style.boxShadow = "0 0 5px 0 transparent";
            },500);
        }
        
        function removeFloat(e){
            e.persist();
    
            if(e.target.value===""){
                if(props.required){
                    shakeInput(e.target.parentElement);
                }
                e.target.parentElement.querySelector("label").classList.remove("float");
            }
            setPV("");
    
        }    

        function submit(e){
            e.persist();
            if(e.which===13){
                document.querySelector(props.submit).click();
            }
        }

        function handleChange(e){
            e.persist();
            setVal(e.currentTarget.value);
        }

        if(props.popover){
            setP((
                <Popover content={props.pContent} className={pv+" "+props.pClassName} width={props.pWidth}>
                    <div className={"input "+(props.center?"center":"")} style={{"width":props.width}}>
                        <label htmlFor={props.id} className={props.float?"float":""}>{props.label}</label>
                        <input type={props.type} id={props.id} onFocus={float} onBlur={removeFloat} value={val} onChange={handleChange} onKeyUp={submit}/>
                    </div>
                </Popover>
            ))
        }
        else{
            setP((
                <div className={"input "+(props.center?"center":"")} style={{"width":props.width}}>
                    <label htmlFor={props.id} className={props.float?"float":""}>{props.label}</label>
                    <input type={props.type} id={props.id} onFocus={float} onBlur={removeFloat} value={val} onChange={handleChange} onKeyUp={submit}/>
                </div>
                ))
        }
    },[props,pv,val]);

    return (
        <>
            {p}
        </>
    )
}

export default Input;