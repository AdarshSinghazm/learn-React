import { useState } from "react";
function Adarsh(){
    const[count,setCount] = useState(0);
    function increase(){
        setCount(count+1);
    }
    function decrease(){
        if(count==0) return;
        setCount(count-1);
    }
    
    function reset(){
        setCount(0);
    }
    return(
        <>
        <h1> Hi I am Adarsh </h1>
        <div className="">
            <h1>{count}</h1>
            <button onClick={increase}>
                Increase
            </button>
            <button onClick={decrease}>
                decrease
            </button>
            <button onClick={reset}>
                reset
            </button>
        </div>
        
        </>
    )
}

export default Adarsh