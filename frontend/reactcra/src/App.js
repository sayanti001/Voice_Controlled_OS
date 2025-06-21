import logo from './logo.svg';
import './App.css';
import MainPage from './pages/mainpage';
 
import React, { useState } from "react";
// import Auth from "./Auth";
import ChatContext from './context/chatcontext';
import Navbar from './components/navbar';

function App() {
  const [messages,setmessages]=useState([]);
  const [inputloading,setinputloading]=useState(false);
  const [outputloading,setoutputloading]=useState(false);
  return (
    <React.Fragment>
      <ChatContext.Provider value={{messages,setmessages,inputloading,setinputloading,outputloading,setoutputloading}}>
    <div className="App">
      <Navbar/>
      <MainPage/>
    </div>
    </ChatContext.Provider>
    </React.Fragment>

  );
}

export default App;
