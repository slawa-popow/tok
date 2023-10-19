
import cors from 'cors';
import path  from 'path';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session'; 
import { engine } from 'express-handlebars';
import { mainRouter } from './routes/mainRouter';
import { MysqlClient } from './database/MysqlClient';
import { Db } from './database/db';

declare module 'express-session' {
  interface SessionData {
    sessionData: any;
  }
}

dotenv.config();

export const app = express();

const secret = process.env.SECRET || '123dfgdsdgfghghfdh';
export const mysqlc = new MysqlClient();
export const db = new Db(mysqlc);
app.set('trust proxy', 2);
app.use(cors({credentials: true,}));

app.use(session({
  name: 'sos',
  secret: secret,
  store: mysqlc.sessionStore,
  resave: false,
	saveUninitialized: false,
    proxy: true, 
    cookie: {maxAge: 800000, secure: true, httpOnly: true}
}));
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(express.static(path.join(__dirname, '../public'))); 
app.engine('handlebars', engine());
app.set('view engine', 'handlebars'); 
app.set('views', __dirname + '/../views');

app.use('/', mainRouter);
 
const port = process.env.PORT;

app.listen(port, () => { 
  console.log(`\nRunning App at localhost:${port}\n`)   
});  