import {NextApiResponse,NextApiRequest} from 'next'
import {fiveLetterWords} from './wordOfTheDay'

export default function validate (req:NextApiRequest , res : NextApiResponse){
    let words = fiveLetterWords;
    
    const {word}:any = req.query

    if(!words?.includes(word)){
        res.status(200).json({success: false,data:{isvalid:false,message:"word is Not valid!"}})
    }
    res.status(200).json({success: true,data:{isvalid:true,message:"word is valid!"}})

}