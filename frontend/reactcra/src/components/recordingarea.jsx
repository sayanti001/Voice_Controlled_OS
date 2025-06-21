import React, { useContext, useEffect, useState } from 'react'
import MicButton from './micbutton';
import { ReactMic } from 'react-mic';
import chatContext from '../context/chatcontext';
import { CircularProgress } from '@mui/material';
import { getExecute, getText } from '../apis';
import Typewriter from './typewriter';

export default function RecordingArea() {
    const {messages,setmessages,inputloading,outputloading}=useContext(chatContext);
    useEffect(()=>{
        var objDiv = document.getElementById("messages");
        objDiv.scrollTop = objDiv.scrollHeight+100;
    },[messages])

    const [rec,setRec]=useState(false);
    const clk=()=>{
        setRec(!rec);
        // onStop();
    }
    let newmsg=[];
    const onstop=async(blob)=>{
        console.log("HELLO",blob);
        // let filenow =new File([blob.blob],"newvoice.webm");
        let aud=new Audio(blob.blobURL);
        // aud.play();
        console.log("HERE",messages)
        newmsg=newmsg.concat([{time:new Date(),text:<CircularProgress color="success" />,sender:'user'}])
        setmessages(newmsg);
        let datenow=Date();
        let filenow =new File([blob.blob],`newvoice${datenow.toString().slice(0,25).split(":").join("")}.webm`);
        console.log("FILE",filenow);
        let textres=await getText(filenow)
        console.log("textres",textres)
        newmsg=newmsg.slice(0,newmsg.length-1);
        if(textres.error){
            newmsg=newmsg.concat([{time:new Date(),text:<div><audio className='w-[100%] rounded-lg bg-blue-800' src={`${blob.blobURL}`} controls></audio><br />{textres.error}</div>,sender:'user'}])
            setmessages(newmsg);
            return;
        }
        newmsg=newmsg.concat([{time:new Date(),text:<div><audio className='w-[100%] rounded-lg bg-blue-800' src={`${blob.blobURL}`} controls></audio><br /><Typewriter text={textres} delay={100}/></div>,sender:'user'}])
        newmsg=newmsg.concat([{time:new Date(),text:<CircularProgress color="success" />,sender:'bot'}])
        setmessages(newmsg);
        
        let execres=await getExecute(filenow)
        newmsg=newmsg.slice(0,newmsg.length-1);
        newmsg=newmsg.concat([{time:new Date(),text:<Typewriter text={execres.status} delay={50}/>,sender:'bot'}])
        setmessages(newmsg)
        
    }
  return (
    <div className='flex p-1 m-1 border-[2px] border-blue-800 shadow-lg shadow-white md:w-[100%] h-20 rounded-md w-full bg-transparent'>
        <div className='md:w-[90%] w-[85%] rounded-xl border-[2px] border-blue-700 p-0 md:h-16 bg-white '>
        <ReactMic
        record={rec}
        onStop={onstop}
        className='md:h-14 md:w-[95%] h-10 w-[90%] rounded-2xl mx-2'
        />
        </div>
        <div className='md:pl-[5vw]'>
            <MicButton recording={rec} clickHandler={clk} disabled={inputloading||outputloading}/>
        </div>
    </div>
  )
}
