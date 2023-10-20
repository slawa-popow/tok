import { Clients } from "../types/dbt/Clients";
import { DbClient } from "../types/dbt/DbClient";
import { TelegramIdStatus } from "../types/dbt/IdTelegram";
import { ContactForm } from "../types/front/ContactForm";

 

export class Db {

    private client: DbClient | null = null;

    constructor (client: DbClient) {
        this.client = client;
    }

    async newClient(formData: ContactForm, ip: string): Promise<boolean> {
        if (this.client) {
            const rowdata: Clients = {
                name: formData.name || '',
                email: formData.email || '',
                phone: formData.phone || '',
                message: formData.message || '',
                date: new Date().toLocaleString("ru-RU", {timeZone: "Europe/Moscow"}),
                ip: ip || '',
            };
            return await this.client.writeNewClientData(rowdata);
        }
        return false;
    }

    async getIdTelegram(): Promise<string[]> {
        if (this.client) {
            const arrIds = await this.client.getTelegramIdAdmins();
            if (arrIds) {
                const ids = [];
                for (let i of arrIds) {
                    if (i.status === TelegramIdStatus.ON)
                        ids.push(i.telegramid);
                }
                return ids;
            }
        }
        return [];
    }

    // -------------------------------------------------
    async test() {
        if (this.client)
            return await this.client?.setTestData([]);
    }
}


