import dotenv from 'dotenv';
import axios from "axios";




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

    async sendMessage(msgdata: any) {
        
        const msg = `webhook: ${msgdata}`; 
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