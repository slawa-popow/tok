import mysql from 'mysql2/promise';
import { Pool } from "mysql2/promise";
import dotenv from 'dotenv';
import session from 'express-session';
import { DbClient } from '../types/dbt/DbClient';
const MySQLStore = require('express-mysql-session')(session);


dotenv.config();

export enum Table {
    Clients='clients',
    Admins='managers'
};

export class MysqlClient implements DbClient{

    private HOST: string = process.env.PHOST || '';
    private USER: string = process.env.PUSER || '';
    private DATABASE: string = process.env.PDATABASE || '';
    private PASSWORD: string = process.env.PPASSWORD || ''; 
    private pool: Pool | null = null;

    public sessionStore: any = null;

    constructor() { 
        this.setPool();      
    }

    setPool(): void {
        const pool: Pool = mysql.createPool({ 
            connectionLimit: 20, 
            host: this.HOST,
            user: this.USER,
            password: this.PASSWORD,
            database: this.DATABASE,
            waitForConnections: true,
            rowsAsArray: false,
        }); 
        this.pool = pool;
        this.sessionStore = new MySQLStore({
            createDatabaseTable: true,
            clearExpired: true,
            checkExpirationInterval: 600000,
            expiration: 6000000,
        }, this.pool);
    }


    



    //--------- sample method --------------------------------------
    async setTestData(data: Array<string>): Promise<any> {  
        const connection = await this.pool!.getConnection();

        try {
            if (connection) {
                const res = connection.query(`INSERT INTO ${Table.Clients}(name, age) VALUES(?, ?);`, data);  
                return res;
            }

        } catch (e) { console.log('Error in MySqlAgent->setTestData()->catch', e) } 
        finally {
            connection.release();
        }
        return [];
    } 

    
}

