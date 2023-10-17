import { NextFunction, Request, Response } from "express";



export async function postMdlw (req: Request, resp: Response, next: NextFunction) {
    const data = req.body;
    resp.status(200).json({middleware: 'response', data: data});
    return next();
    
}