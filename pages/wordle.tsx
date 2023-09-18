'use client'
import React, { useEffect, useState } from 'react'
import styles from './wordle.module.css'
import axios from 'axios';
import WordleRow from './components/wordleRow';
import wordOftheDay from './api/wordOfTheDay';

const Wordle = () => {
  const [wordDay,setWordDay] = useState("");
  const [word, setWord] = useState("");
  const [isvalid, setIsvalid] = useState("true");

  const [ chances,setChances ] = useState(5)
  const getWordoftheday = async ()=>{
    let res = await axios.get("http://localhost:3000/api/wordOfTheDay")
    setWordDay(res.data.wordOdtheDay)
  }
  useEffect(()=>{
    getWordoftheday()
  },[])

  

  const handleFocus = (e:any) =>{
    const {maxLength,value,name} = e.target;
    const [rowName,rowIndex,fieldIndex] = name.split("-")
    const length = 5;

    if(value.length == 1){
        if(parseInt(fieldIndex,10) < 5){
          const nextBox = document.querySelector(`input[name = row-${rowIndex}-${parseInt(fieldIndex,10) + 1}]`)

          if(nextBox != null){
            nextBox.focus()
          }
        }
    }
  }

  return (
    <div className={styles.main}>
       <div className={styles.title}>Wordle</div>

       <div>Chances Left : {chances}</div>

       <div className={styles.gameContainer}>
        
        <WordleRow rowNumber={1} setWord={setWord} setChances={setChances} chances={chances}  wordOfday ={wordDay} />
        <WordleRow rowNumber={2} setWord={setWord} setChances={setChances} chances={chances}  wordOfday ={wordDay}/>
        <WordleRow rowNumber={3} setWord={setWord} setChances={setChances} chances={chances}  wordOfday ={wordDay}/>
        <WordleRow rowNumber={4} setWord={setWord} setChances={setChances} chances={chances}  wordOfday ={wordDay}/>
        <WordleRow rowNumber={5} setWord={setWord} setChances={setChances} chances={chances}  wordOfday ={wordDay}/>

        <div>
          <button className={styles.reset} onClick={()=>{
            window.location.reload()
          }}>Reset</button>
        </div>
       </div>

    </div>
  )
}

export default Wordle