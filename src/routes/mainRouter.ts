import { Router } from "express";
import { mainController } from "./MainController";
import { postMdlw } from "../middlewares/postMdlw";


const mainRouter = Router(); 

mainRouter.get('/',  mainController.getIndexPage);
mainRouter.post('/test', postMdlw, mainController.testPostReq);
mainRouter.post('/tgbot', mainController.tgbot);  

export { mainRouter }