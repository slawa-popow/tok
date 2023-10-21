import dotenv from 'dotenv';
import axios from "axios";
import { ContactForm } from '../types/front/ContactForm';
import { Hook } from '../types/bot/Hook';




export class Messager {
    token: string = '';
    tgUrl: string = '';
    constructor () {
        dotenv.config();
        this.token = process.env.TOKEN_BOT || "";
        this.tgUrl = `https://api.telegram.org/bot${this.token}/sendMessage`;
    };


    telegramUrl(message: string, id: string): string {
        return `${this.tgUrl}?chat_id=${id}&text=${message}&parse_mode=HTML`
    }

    // ----------------------------------------------------------------

    async sendMessage(mdata: ContactForm, ids: string[], status = 'Клиент с сайта') {
        
        const msg = `
        ${status} %0A${new Date().toLocaleString("ru-RU", {timeZone: "Europe/Moscow"})}%0A%0A
имя: <b>${mdata.name || ''}</b>%0A
e-mail: <b>${mdata.email || ''}</b>%0A
тел: <b>${mdata.phone || ''}</b>%0A
сообщение: <b>${mdata.message || ''}</b>%0A
        `; 
        try {
            for (let id of ids) {
                const headers = {
                    'User-Agent':  'axios client',
                }
                await axios.get(this.telegramUrl(msg, id), {headers,});
            }
            return {err: ''};
        }
        catch (e) {
            console.log('error in sendtgMessage() axios run: ', e);
            return {err: e}
        }
        
    }

    async sendRaw(msg: Hook) {
        try {
            if (msg && msg.message && msg.message.from && msg.message.from.id) {
                const fromMsg = msg.message.text || '';
                const who = msg.message.from.first_name || msg.message.from.username || 'чувак';
                const headers = {
                    'User-Agent':  'axios client',
                }
                await axios.get(this.telegramUrl(`Извини ${who}, но это: <b>${fromMsg}</b> я пока еще не могу обработать.`, "" + msg.message.from.id), {headers,});
                
                return;
            }
        }
        catch (e) {
            console.log('error in sendRaw() axios run: ', e);
        }
        return;
    }
    // ----------------------------------------------------------------

}