import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  let [counter,setCounter] = useState(10);

const valueadd= ()=>{
    if(counter>=20) return;
    setCounter(counter+1);
    console.log("value added",counter);
  }
const valuedec= ()=>{
  if(counter<=0) return;
    setCounter(counter-1);
     console.log("value decrease",counter);
  }
const resetValue=()=>{
  setCounter(0);
  console.log("value reset");
}
  return (
    
    <>
      <h1>Chai aur React</h1>
      <h2>Value : {counter}</h2>
      <button onClick={valueadd}>Increment {counter}</button>
      <br />
      <button onClick={valuedec}>Decrement {counter}</button>
      <br />
      <button onClick={resetValue}>Reset {counter}</button>
    </>
  )
}

export default App
