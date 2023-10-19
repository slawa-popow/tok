import { DbClient } from "../types/dbt/DbClient";

 

export class Db {

    private client: DbClient | null = null;

    constructor (client: DbClient) {
        this.client = client;
    }

    async test() {
        if (this.client)
            return await this.client?.setTestData([]);
    }
}


