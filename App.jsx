import { useEffect, useRef, useState } from 'react'
import './App.css'
import events from 'inquirer/lib/utils/events';

function App() {
  let [password,setpassword]=useState('');
  let [length,setlength]=useState(8);;
  let [takecharacter,settakecharacters]=useState(false);
  let [takenumber,settakenumber]=useState(false);
  let passwordref=useRef(null)
  let generatePassword=()=>{
    let pass ='';
    let str='abcdefghijklmnopqrstuvwxyz';
    if(takenumber)str+='0123456789';
    if(takecharacter)str+='$@&*';
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char)
      setpassword(pass);
    }

  }
  useEffect (()=>{
    generatePassword();
  },[length,takenumber,takecharacter]);
  let copytoclipboard=()=>{
    passwordref.current.select();
    window.Navigator.clipboard.writetext(password);
  }
  return (
    <>
    <h1>Password Generator</h1>
    <input type="text "readOnly value={password}ref={passwordref} />
     <button onClick={copytoclipboard}>copy</button>


     { 
      <div>
        <input type="range" min={6} max={15} name='rangeinput' onChange={(event)=>setlength(event.target.value)} />
        <label> length: {length}</label>

        <input type='checkbox' defaultChecked={takenumber}id='fornumber'onChange={()=>settakenumber (!takenumber)} />
        <label htmlFor='fornumber'>Take number in your password</label>

        <input type='checkbox' defaultChecked ={takecharacter}id='forcharacter'onChange={()=> settakecharacters(!takecharacter)} />
        <label htmlFor='forcharacter'>Take character in your password</label>

     </div>

      }
    </>
  )
}

export default App
