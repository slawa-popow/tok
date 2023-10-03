import { Router } from "express";
import { mainController } from "./MainController";


const mainRouter = Router(); 

mainRouter.get('/',  mainController.getIndexPage);

 

export { mainRouter }