import { Request, Response } from 'express';
import { Messager } from '../telegram/Messager';
 


class MainController {

    async getIndexPage(_request: Request, response: Response) {

        return response.status(200).render('index', {
            layout: 'main', }); 
    }


    async testPostReq(request: Request, _response: Response) {
        const data = request.body;
        console.log(data);
        return;
    }


    async tgbot(request: Request, response: Response) {
        try {
            const tData = request.body;
            const messager = new Messager();
            const issend = await messager.sendMessage(JSON.stringify(tData));
            
            return response.status(200).json(issend); 

        } catch (err) {
            return response.status(403).json(err);
        }
        
    }



}



export const mainController = new MainController();