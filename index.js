import express from 'express';
import Connection from './database/connect.js';
import dotenv from "dotenv";
import cors from 'cors';
import bodyParser from 'body-parser';
import Router from './routes/route.js';
const app = express();
const port = 8000;
app.use(cors({
  origin: 'https://blognex.onrender.com',
  methods: 'GET, POST, PUT, DELETE',
  credentials: true,
}));
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',Router)

app.listen(port, () => {
    console.log(`Server is nunning  on port ${port}`)
});

const username=process.env.DB_username;
const password=process.env.DB_password;
Connection();
