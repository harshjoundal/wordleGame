import React, {useRef,useState} from 'react'
import styles from '../wordle.module.css'

const WordleRow = ({rowNumber , setWord, onEnter, bcolor}) => {
    
    const [RowWord,setRowWord] = useState("");

  const handleFocus = (e:any) =>{
    const {maxLength,value,name} = e.target;
    const [rowName,rowIndex,fieldIndex] = name.split("-")

    if(fieldIndex == 1){
        setWord(value)
    }
    else{
        setWord((word:string) => word + value)
    }


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
    <div className={`${styles.row}`}>
            <input style={{backgroundColor:bcolor[0]}} name={`row-${rowNumber}-1`} maxLength={1} onChange={(e)=>{
                handleFocus(e)
            }}></input>

            <input style={{backgroundColor:bcolor[1]}} name={`row-${rowNumber}-2`} maxLength={1} onChange={(e)=>{
                handleFocus(e)
            }}></input>

            <input style={{backgroundColor:bcolor[2]}} name={`row-${rowNumber}-3`} maxLength={1} onChange={(e)=>{
                handleFocus(e)
            }}></input>

            <input style={{backgroundColor:bcolor[3]}} name={`row-${rowNumber}-4`} maxLength={1} onChange={(e)=>{
                handleFocus(e)
            }}></input>

            <input style={{backgroundColor:bcolor[4]}} name={`row-${rowNumber}-5`} maxLength={1} onChange={(e)=>{
                handleFocus(e)
            }}
            ></input>

            <button className={styles.enter} onClick={()=>{
                onEnter()
            }}>Enter</button>
        </div>
  )
}

export default WordleRow