
export interface DbClient {
    setTestData(data: Array<string>): Promise<any>;
}