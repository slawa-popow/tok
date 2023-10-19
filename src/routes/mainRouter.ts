import { Router } from "express";
import { mainController } from "./MainController";


const mainRouter = Router(); 

mainRouter.get('/',  mainController.getIndexPage);
mainRouter.post('/sendMessage', mainController.sendMessage);
 

export { mainRouter }