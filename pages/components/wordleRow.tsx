import React, {useRef,useState} from 'react'
import styles from '../wordle.module.css'
import axios from 'axios';

const WordleRow = ({rowNumber , setWord, wordOfday,setChances,chances}) => {
    
    const [RowWord,setRowWord] = useState("");
    const [isDisabled,setIsDisabled] = useState(false)

    let Defaultcolor = new Array(5).fill("transparent")
    const [color,setColor] = useState(new Array(5).fill("transparent"))

  const handleFocus = (e:any) =>{
    const {maxLength,value,name} = e.target;
    const [rowName,rowIndex,fieldIndex] = name.split("-")

    if(fieldIndex == 1){
        setWord(value)
        setRowWord(value)
    }
    else{
        setWord((word:string) => word + value)
        setRowWord((word:string) => word + value)
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

    
  const onEnterr = async () =>{
    if(RowWord.length != 5){
        alert("Please Enter the full word!")
        return
    }

    if(chances <= 0){
        alert("0 Chances left")
    }
    else{
        setChances((chances) => chances-1)
    }

    let res = await axios.get(`http://localhost:3000/api/validate?word=${RowWord}`)
    .then(res =>{
      let isvalidWord = res.data.isvalid;
      let message = res.data.message;
      
        setIsDisabled(true)
      if(RowWord == wordOfday){
        setColor(new Array(5).fill("green"))
        alert("You won!")
      }
      for(let i = 0;i<RowWord.length;i++){
        if(wordOfday.includes(RowWord[i])){
          if(RowWord[i] == wordOfday[i]){
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


  

  return (
    <div className={`${styles.row}`}>
            <input style={{backgroundColor:color[0]}} name={`row-${rowNumber}-1`} maxLength={1} disabled={isDisabled} onChange={(e)=>{
                handleFocus(e)
            }}></input>

            <input style={{backgroundColor:color[1]}} name={`row-${rowNumber}-2`} maxLength={1} disabled={isDisabled} onChange={(e)=>{
                handleFocus(e)
            }}></input>

            <input style={{backgroundColor:color[2]}} name={`row-${rowNumber}-3`} maxLength={1} disabled={isDisabled} onChange={(e)=>{
                handleFocus(e)
            }}></input>

            <input style={{backgroundColor:color[3]}} name={`row-${rowNumber}-4`} maxLength={1} disabled={isDisabled} onChange={(e)=>{
                handleFocus(e)
            }}></input>

            <input style={{backgroundColor:color[4]}} name={`row-${rowNumber}-5`} maxLength={1} disabled={isDisabled} onChange={(e)=>{
                handleFocus(e)
            }}
            ></input>

            <button className={styles.enter} onClick={()=>{
                onEnterr()
            }} disabled={isDisabled}>Enter</button>
        </div>
  )
}

export default WordleRow