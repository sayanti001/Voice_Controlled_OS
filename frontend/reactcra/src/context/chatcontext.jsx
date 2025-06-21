 
import React from 'react';
 
// Creating the context object and passing the default values.
const chatContext = React.createContext({messages:[],setmessages:()=>{},inputloading:false,setinputloading:()=>{},outputloading:false,setoutputloading:()=>{}});
 
export default chatContext;