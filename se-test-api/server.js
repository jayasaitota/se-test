
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import {getTopHeadLines,getNewsByTopic} from './Services/NewsApi.service';

const SERVER_PORT = process.env.SERVER_PORT;
const app = express();

// enable CORS - Cross Origin Resource Sharing
app.use(cors({origin: 'http://localhost:3000'}));

app.use(bodyParser.json({type:"application/json"}))
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/top-headlines', async (req,res)=>{
   let response = await getTopHeadLines();
   if(response.status === 'ok'){
     return res.status(200).json(response)
   }else{
    console.log(response.err)
    return res.status(200).json({articles:[]})
   }
});

app.get('/everything', async (req,res)=>{
  if(!req.query.q){
    req.query.q = 'apple'
  }
  let response = await getNewsByTopic(req.query.q);
  if(response.status === 'ok'){
    return res.status(200).json(response)
  }else{
  console.log(response.err)
   return res.status(200).json({articles:[]})
  }
});

app.get('', (req, res) => {
  return res.send("Server is up and running")
});

const server = app.listen(SERVER_PORT,()=>{
  console.log(`Server Started and running on port  ${SERVER_PORT}`)
})

export default server;