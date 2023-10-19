import { Request, Response } from 'express';
import { ContactForm } from '../types/front/ContactForm';
import { Messager } from '../telegram/Messager';


class MainController {

    async getIndexPage(request: Request, response: Response) { 
        request.session.sessionData = request.ip;
        return response.status(200).render('index', {
            layout: 'main', }); 
    }


    async sendMessage(request: Request, response: Response) {
        const data = request.body as ContactForm;
        const tg = new Messager();
        tg.sendMessage(data);
        return response.status(200).json({data});
    }



}



export const mainController = new MainController();