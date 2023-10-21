import { Router } from "express";
import { mainController } from "./MainController";
import { emaiVld, messageVld, nameVld, phoneVld } from "../middlewares/postValidate";


const mainRouter = Router(); 
mainRouter.post('/tgbot', mainController.tgBot);

mainRouter.get('/',  mainController.getIndexPage);
mainRouter.post('/sendMessage',
                nameVld(),
                emaiVld(),
                phoneVld(),
                messageVld(),
                mainController.sendMessage);
 

export { mainRouter }