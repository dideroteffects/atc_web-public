import React, { useEffect, useRef } from "react";

export default function Clickoutside(props){
    const wrapperRef = useRef(null);
    ClickOutsideWrapper(wrapperRef, props);
    return <div ref={wrapperRef}>{props.children}</div>
}

function ClickOutsideWrapper(ref, props){
    useEffect(()=>{
        const handleClickOutside = (e)=>{
            if (ref.current && !ref.current.contains(e.target)){
                
                // alert("you clicked outside of modal popup");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return ()=>{
            // console.log(props.closemodal);
            props.closemodal();
            console.log(props.testprop);
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [ref]);
}
