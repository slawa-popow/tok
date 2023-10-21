import { Chat } from "./Chat";
import { Entities } from "./Entities";
import { From } from "./From";

export type Message = {
    message_id: number;
    from: From;
    chat: Chat;
    date: number;
    text: string;
    entities: Entities[];
}