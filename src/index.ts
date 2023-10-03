
import cors from 'cors';
import path  from 'path';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { engine } from 'express-handlebars';
import { mainRouter } from './routes/mainRouter';

dotenv.config();

export const app = express();

app.use(cors({credentials: true})); 

app.use(express.static(path.join(__dirname, '../public'))); 
app.engine('handlebars', engine());
app.set('view engine', 'handlebars'); 
app.set('views', __dirname + '/../views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

app.use(cookieSession({keys: ['cookiestr'], maxAge: 24 * 60 * 60 * 5000, httpOnly: true}));

app.use('/', mainRouter);
 

const port = process.env.PORT;

app.listen(port, () => { 
  console.log(`\nRunning App at localhost:${port}\n`)   
});  