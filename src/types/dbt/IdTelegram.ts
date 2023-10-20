
export enum TelegramIdStatus {
    OFF='БЛОКИРОВАН',
    ON='ВКЛЮЧЕН',
}

export interface IdTelegram {
    id: number;
    name: string;
    telegramid: string;
    status : TelegramIdStatus;
}