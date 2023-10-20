import { Request, Response } from 'express';
import { ContactForm } from '../types/front/ContactForm';
import { Messager } from '../telegram/Messager';
import { myValidationResult } from '../customErrors/customErrField';
import { db } from '..';


class MainController {

    async getIndexPage(request: Request, response: Response) { 
        request.session.sessionData = request.ip;
        return response.status(200).render('index', {
            layout: 'main', }); 
    }


    async sendMessage(request: Request, response: Response) {
        const errors = myValidationResult(request); 
         
        if (!errors.isEmpty()) {
            return response.status(400).json( { errorsMessages: errors.array({onlyFirstError: true}) } ); // только первые показать
        } 
        const data = request.body as ContactForm;
        const ip = request.session.sessionData || '';
        const isWriteformData = await db.newClient(data, ip);
        if (isWriteformData) {
            const ids = await db.getIdTelegram();
            const tg = new Messager();
            tg.sendMessage(data, ids);
        }

        return response.status(200).json({errorsMessages:[]});
    }



}



export const mainController = new MainController();