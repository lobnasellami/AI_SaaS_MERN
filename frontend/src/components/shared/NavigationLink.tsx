import {Link} from 'react-router-dom'
import React from 'react'
type props={
    to:string ;
    bg:string;
    text:string;
    textcolor:string 
    onClick?:()=>Promise<void>;
}
const NavigationLink = (props:props) => {
  return (
<Link className ="nav-link" to ={props.to} 
style ={{background:props.bg,color:props.textcolor}}>{props.text}</Link>  )
}

export default NavigationLink