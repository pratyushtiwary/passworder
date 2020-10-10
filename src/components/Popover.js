import React from 'react';
import "../css/popover.css";

function Popover(props){
    return (
        <div className={"popover-container "+props.className} data-content={props.content} style={{width:props.width}}>
            <span className="popover">{props.content}</span>
            {props.children}
        </div>
    )
}

export default Popover;