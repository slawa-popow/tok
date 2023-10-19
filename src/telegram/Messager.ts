import dotenv from 'dotenv';
import axios from "axios";
import { ContactForm } from '../types/front/ContactForm';




export class Messager {

    channelId : string = '1941650155';
    token: string = '';
    tgUrl: string = '';
    constructor () {
        dotenv.config();
        this.token = process.env.TOKEN_BOT || "";
        this.tgUrl = `https://api.telegram.org/bot${this.token}/sendMessage`;
    };


    telegramUrl(message: string): string {
        return `${this.tgUrl}?chat_id=${this.channelId}&text=${message}&parse_mode=HTML`
    }

    // ----------------------------------------------------------------

    async sendMessage(mdata: ContactForm) {
        
        const msg = `
        Клиент с сайта %0A${new Date().toLocaleString("ru-RU", {timeZone: "Europe/Moscow"})}%0A%0A
имя: <b>${mdata.name || ''}</b>%0A
e-mail: <b>${mdata.email || ''}</b>%0A
тел: <b>${mdata.phone || ''}</b>%0A
сообщение: <b>${mdata.message || ''}</b>%0A
        `; 
        try {
            const headers = {
                'User-Agent':  'axios client',
            }
            await axios.get(this.telegramUrl(msg), {headers,});
            return {err: ''};
        }
        catch (e) {
            console.log('error in sendtgMessage() axios run: ', e);
            return {err: e}
        }
        
    }
    // ----------------------------------------------------------------

}