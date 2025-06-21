import React, { useEffect, useState } from 'react'
import MicButton from '../components/micbutton';
import RecordingArea from '../components/recordingarea';
import Message from '../components/message';
import ChatArea from '../components/chatArea';



export default function MainPage() {
  const [messages,setmessages] = useState( [
    // {  text: "Hi there!", sender: "bot" },
    // {  text: "Hello!", sender: "user" },
    // {  text: "How can I assist you today?", sender: "bot" },
  ]);
  // let semimsg=[];
  useEffect(()=>{
    // semimsg=messages;
    console.log("useffect",messages)
  },[messages])

    const [rec,setRec]=useState(false);
    const clk=()=>{
        setRec(!rec);
    }
    
    const onstop=()=>{
      let blob={blobURL:"test"}
      console.log("Changing",messages);
      let obj={time:messages.length,text:blob.blobURL,sender:"user"};
      setmessages(messages.concat([obj]));
    }
  return (
    <div>
      {/* <MicButton recording={rec} clickHandler={clk}/> */}
      {/* <RecordingArea onStop={onstop}/> */}
      {/* <Message message={{text:"HELLO",sender:"bot"}}/> */}
      <ChatArea messages={messages} onStop={onstop}/>
    </div>
  )
}
