import TextField from '@mui/material/TextField';
import React from 'react'

type props={
    name:string;
    type:string;
    label:string;

}
const CustomizedInput = (props:props) => {
  return (
    <TextField margin="normal" InputLabelProps={{style:{color:"white"}}} 
    InputProps={{style:{width:"400px", borderRadius:10 ,fontSize:20, color:"white"}}}
    name={props.name}
    type={props.type}
    label={props.label}
      
      />
  )
}

export default CustomizedInput