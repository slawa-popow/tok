import mysql, { ResultSetHeader } from 'mysql2/promise';
import { Pool } from "mysql2/promise";
import dotenv from 'dotenv';
import session from 'express-session';
import { DbClient } from '../types/dbt/DbClient';
import { Clients } from '../types/dbt/Clients';
import { IdTelegram } from '../types/dbt/IdTelegram';
const MySQLStore = require('express-mysql-session')(session);


dotenv.config();

export enum Table {
    Clients='clients',
    Admins='managers',
    IDtelegram='idtelegram',
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

    async getTelegramIdAdmins(): Promise<IdTelegram[] | null> {
        const connection = await this.pool!.getConnection();

        try {
            if (connection) {
                const [_resid, _] = await connection.query(`SELECT * FROM ${Table.IDtelegram};`);  
                const resid = _resid as IdTelegram[];
                
                return resid;
            }

        } catch (e) { console.log('Error in MySqlAgent->setTestData()->catch', e) } 
        finally {
            connection.release();
        }
        return null;
    }


    async writeNewClientData(rowdata: Clients) {
        const connection = await this.pool!.getConnection();
        try {
            if (connection) {
                const fields = Object.keys(rowdata);
                const values = Object.values(rowdata);
                const [_res, _] = await connection.query(`INSERT INTO ${Table.Clients}(${fields.join(',')}) VALUES(?, ?, ?, ?, ?, ?);`, values);  
                const res = _res as ResultSetHeader;
                if (+res.affectedRows > 0)
                    return true;
            }

        } catch (e) { console.log('Error in MySqlAgent->writeNewClientData()->catch', e) } 
        finally {
            connection.release();
        }
        return false;
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

