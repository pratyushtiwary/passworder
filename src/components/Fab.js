import React from 'react';
import "../css/fab.css";

function Fab(props){
    return (
        <div className="fab" tabIndex={props.tabIndex} onKeyUp={props.onKeyUp} onFocus={props.onFocus} style={{background:props.bg,color:props.color,boxShadow: "0 0 5px 0 "+props.bg}} onClick={props.onClick} title={props.title}>
            <span className="icon">{props.children}</span>
        </div>
    )
}

export default Fab 