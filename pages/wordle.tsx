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

  let Defaultcolor = new Array(5).fill("transparent")
  const [color,setColor] = useState(Defaultcolor)


  const onEnter = async () =>{
    if(word.length != 5){
        alert("Please Enter the full word!")
        return
    }

    let res = await axios.get(`http://localhost:3001/api/validate?word=${word}`)
    .then(res =>{
      let isvalidWord = res.data.isvalid;
      let message = res.data.message;
      
  

      if(word == wordDay){
        setColor(["green","green","green","green","green"])
      }
      for(let i = 0;i<word.length;i++){
        if(wordDay.includes(word[i])){
          if(word[i] == wordDay[i]){
              Defaultcolor[i] = "green";
              setColor([...Defaultcolor])

          }
          else{
            Defaultcolor[i] = "yellow"
            setColor([...Defaultcolor])
          }
        }
      }

    }
    )
    
    
  }

  const getWordoftheday = async ()=>{
    let res = await axios.get("http://localhost:3001/api/wordOfTheDay")
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

       <div>isValid : {isvalid}</div>
       <div className={styles.gameContainer}>
        <WordleRow rowNumber={1} setWord={setWord} onEnter={onEnter} bcolor={color} />
        <WordleRow rowNumber={2} setWord={setWord} onEnter={onEnter} bcolor={color}/>
        <WordleRow rowNumber={3} setWord={setWord} onEnter={onEnter} bcolor={color}/>
        <WordleRow rowNumber={4} setWord={setWord} onEnter={onEnter} bcolor={color}/>
        <WordleRow rowNumber={5} setWord={setWord} onEnter={onEnter} bcolor={color}/>
       </div>
    </div>
  )
}

export default Wordle