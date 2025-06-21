import React, { useContext } from 'react'
import chatContext from '../context/chatcontext';

export default function MicButton({recording,clickHandler,disabled}) {
  const running="gradient-to-r from-green-500 to-green-100";
  const stopped="gradient-to-r from-red-700 to-red-400";
  const discol="gradient-to-r from-gray-700 to-gray-400";

  const {inputloading,outputloading}=useContext(chatContext);

  return (
    <div>
      <button className={`bg-${disabled?discol:(recording?running:stopped)} flex justify-around rounded-full m-1 h-14 w-14 md:h-16 md:w-16 md:pt-7 border-[1px] pt-7 border-black`} onClick={clickHandler} disabled={disabled}>
      <i className="fa-solid fa-microphone fa-2xl"></i>
      </button>
    </div>
  )
}
