
import express from 'express';
import bodyParser from 'body-parser';

import {getTopHeadLines,getNewsByTopic} from './Services/NewsApi.service';

const SERVER_PORT = process.env.SERVER_PORT;
const app = express();

app.use(bodyParser.json({type:"application/json"}))
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/top-headlines', async (req,res)=>{
   let response = await getTopHeadLines();
   if(response.status === 'ok'){
     return res.status(200).json(response)
   }else{
    return res.status(400).json({errMessage:"Some thing went worng. Please try again later."})
   }
});

app.get('/everything', async (req,res)=>{
  if(!req.query.q){
   return res.status(400).json({errMessage:"Missing Madatory field"})
  }
  let response = await getNewsByTopic(req.query.q);
  if(response.status === 'ok'){
    return res.status(200).json(response)
  }else{
   return res.status(400).json({errMessage:"Some thing went worng. Please try again later."})
  }
});

app.get('', (req, res) => {
  return res.send("Server is up and running")
});

const server = app.listen(SERVER_PORT,()=>{
  console.log(`Server Started and running on port  ${SERVER_PORT}`)
})

export default server;