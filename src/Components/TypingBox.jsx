import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import UpperMenu from "./UpperMenu";
import { useTestMode} from '../Context/TestModeContext';

var randomWords = require('random-words');

const TypingBox = () =>{
    const inputRef = useRef(null);
    const {testTime} =useTestMode();
    const [countDown, setCountDown] = useState(testTime);
    const [testStart, setTestStart] = useState(false);
    const [testEnd, setTestEnd] = useState(false);
    const [wordsArray, setWordsArray] = useState(() =>{
        return randomWords(50);
    });

    const [currWordIndex, setCurrWordIndex] = useState(0);
    const [currCharIndex, setCurrCharIndex] = useState(0);

    const wordsSpanRef = useMemo(() =>{
        return Array(wordsArray.length).fill(0).map(i=>createRef(null));
    }, [wordsArray]);

    const startTimer =() =>{
        const intervalId = setInterval(timer, 1000);
        function timer (){
            setCountDown((latestCountDown) =>{
                if(latestCountDown === 1){
              setTestEnd(true);
              clearInterval(intervalId);
              return 0;
                }
            return latestCountDown-1;    
            });
        }
    }
}
const resetTest =()=>{
    setCountDown(testTime);
    setCurrWordIndex(0);
    setCurrWordIndex(0);
    setTestStart(false);
    setTestEnd(false);
    setWordsArray(randomWords(50));
}

const handleUserInput =(e) =>{
    if(!testStart){
        startTimer();
        setTestStart(true);
    }
  const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes ;
  
  if(e.keyCode === 32){
    if(allCurrChars.length<= currCharIndex){
      allCurrChars[currCharIndex-1].classList.remove('current-right');  
    }
    else{
        allCurrChars[currCharIndex+1].current.childNodes[0].className ='current';
        setCurrWordIndex(currWordIndex+1);
        setCurrCharIndex(0);
        return;
    }
    if(e.keyCode === 8){
        if(currCharIndex !==0){
            if(allCurrChars[currCharIndex-1].className.includes('extra')){
                allCurrChars[currCharIndex-1].remove();
                allCurrChars[currCharIndex-2].className += 'current - right';
            }
            else{
                allCurrChars[currCharIndex-1].className ='current';
            }
            setCurrCharIndex(currCharIndex-1);
            return;
        }
        allCurrChars[currCharIndex].className ='';
        allCurrChars[currCharIndex-1].className ='current';
        setCurrCharIndex(currCharIndex-1);
    }
    return;
  }
  if(currCharIndex === allCurrChars.length){
    let newSpan = document.createElement('span');
    newSpan.innertext = e.key;
    newSpan.className = 'incorrect extra current-right';
    allCurrChars[currCharIndex-1].classList.remove('current-right');
    wordsSpanRef[currCharIndex].current.append(newSpan);
    setCurrCharIndex(currCharIndex+1);
    return;
  }
  if(e.key === allCurrChars[currCharIndex].innertext){
    allCurrChars[currCharIndex].className = 'correct';
  }
  else{
    allCurrChars[currCharIndex].className ='incorrect';
  }
  if(currCharIndex+1 === allCurrChars.length){
    allCurrChars[currCharIndex].className += 'current-right';
  }
  else{
    allCurrChars[currCharIndex+1].className = 'current'
  }
  setCurrCharIndex(currCharIndex+1);
}
const focusInput =() =>{
    inputRef.current.focus();
}
useEffect(() =>{
    setCountDown(testTime);
}, [testTime])

useEffect(() =>{
    focusInput();
    wordsSpanRef[0].current.childNodes[0].classname = 'current';
},[]);

return(
    <div>
        <UpperMenu countDown={countDown}/>
        {(testEnd) ? (<h1>Test Over</h1>) : (<div className="type-box" onClick={focusInput}>
            <div className="words">
             {
               wordsArray.map((word, index) => (
               <span className="word" ref={wordsSpanRef[index]}>
                {word.split('').map(char =>
                 <span>{char}</span>   
                )}
               </span> 
               ))
             }   
            </div>
            </div>)}
        <input
           type="text"
           className="hidden-input"
           ref={inputRef}
           onKeyDown={handleUserInput}
           />    
    </div>
)
            