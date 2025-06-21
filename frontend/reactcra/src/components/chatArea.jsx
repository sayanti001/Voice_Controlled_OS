import React, { useContext, useEffect } from 'react'
import Message from './message';
import RecordingArea from './recordingarea';
import { Box, Grid } from '@mui/material';
import chatContext from '../context/chatcontext';

export default function ChatArea({onStop}) {

    const {messages}=useContext(chatContext);
    useEffect(()=>{
        console.log(messages);
    },[])
    

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "transparent",
        paddingBottom:0
      }}
    >
        <div id="messages" className='h-[75%] overflow-auto p-2'>
        {messages.map((message) => (
          <Message  message={message} />
        ))}
        </div>
      <Box sx={{ p: 1, backgroundColor: "transparent" }} >
        
            <RecordingArea onStop={onStop}/>

      </Box>
    </Box>
  );
}
