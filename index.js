import express from 'express';
import Connection from './database/connect.js';
import dotenv from "dotenv";
import cors from 'cors';
import bodyParser from 'body-parser';
import Router from './routes/route.js';
const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://blognex.onrender.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
const port = 8000;


app.use(cors());
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',Router)

app.listen(port, () => {
    console.log(`Server is nunning  on port ${port}`)
});

const username=process.env.DB_username;
const password=process.env.DB_password;
Connection();
