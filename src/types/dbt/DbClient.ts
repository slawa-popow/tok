import { Clients } from "./Clients";
import { IdTelegram } from "./IdTelegram";

export interface DbClient {
    writeNewClientData(rowdata: Clients):Promise<boolean>;
    getTelegramIdAdmins(): Promise<IdTelegram[] | null>;

    setTestData(data: Array<string>): Promise<any>;
}