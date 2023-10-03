import { Request, Response } from 'express';


class MainController {

    async getIndexPage(_request: Request, response: Response) {

        return response.status(200).render('index', {
            layout: 'main', }); 
    }

}



export const mainController = new MainController();