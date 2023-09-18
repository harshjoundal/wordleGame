
import {NextApiRequest,NextApiResponse} from 'next'

export const fiveLetterWords = [
  "apple",
  "baker",
  "candy",
  "diner",
  "eager",
  "flame",
  "grape",
  "happy",
  "inbox",
  "jolly",
  "knife",
  "lemon",
  "money",
  "ocean",
  "piano",
  "quiet",
  "ruler",
  "sunny",
  "table",
  "under",
  "vivid",
  "waste",
  "xenon",
  "young",
  "zebra"
];

export default function wordOftheDay (req : NextApiRequest,res:NextApiResponse <{wordOdtheDay : string}>){

    let {word} = req.query
    res.status(200).json({wordOdtheDay : fiveLetterWords[3]})
}