import { useState } from "react";
import axios from 'axios'; 

export function Box() {

    const [prompt, setPrompt] = useState('') ; 
    const [response, setResponse] = useState('');           
  return (
   <>

   <input type="text" placeholder="Enter a Prompt" id="box" onChange={ (e)=>{setPrompt(e.target.value)}}/> 

   <br/> <br/> 
   <button onClick={ async () => {

    const responce = await axios.post('http://localhost:3048/api/analyse', { sentence: prompt });
    setResponse(responce.data.content);
   }}> 
   
   Rephrase the Sentence 
   
   </button> <br/> <br/> 


   <button  onClick={ async () => {

const responce = await axios.post('http://localhost:3048/api/checkgrammer', { sentence: prompt });
setResponse(responce.data.content);
}} > Answer my Question </button>
   <br/> <br/> 
   <button
   
   onClick={ async () => {

    const responce = await axios.post('http://localhost:3048/api/checkspelling', { sentence: prompt });
    setResponse(responce.data.content);
   }}> Check for Spelling Mistake </button>
   <br/> <br/> 

   <h1> {response}</h1>
   
   
   </>


  );
}   