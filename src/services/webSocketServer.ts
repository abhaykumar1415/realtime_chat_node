
import * as http from 'http';
import { v4 as uuid } from 'uuid';

export default class WebSockets {
    public static wss: any
    public static connections = []
    public static chats = new Map<string, Chat>()

    static init(server: http.Server): void {

        const WebSocketServer = require("websocket").server

        this.wss = new WebSocketServer({
            "httpServer": server
        })

        this.wss.on("request", (request) => {

            console.log("Websocket request received.")
            let connection = request.accept(null, request.origin)
            WebSockets.connections.push(connection)
            let senderid = request.httpRequest.url.split("/")[2]
            connection.userID = senderid            

            connection.on("open", () => {
                console.log("Server socket Connection opened.")

            })
            connection.on("close", () => {
                console.log("Server socket Connection closed.")
            })

            connection.on('message', function (message: { utf8Data: string; }) {
                let msgData = JSON.parse(message.utf8Data)
                WebSockets.createPrivateChat(msgData)
            });
        })
    }

    // Method to Create Private Conversation Space
    static createPrivateChat(msgData: any): void {
        if (msgData.chatid !== undefined) { 
            // Append Message to Existing Chat
            let chat = WebSockets.chats.get(msgData.chatid)
            let message = new Message(chat.chatId, uuid(), msgData.message, msgData.date, msgData.senderid, msgData.receiverid)
            chat.messages.push(message)
            WebSockets.sendMsgtoClient(message)
        } else { 
            // Create New Chat
            let chat = new Chat(uuid(), [msgData.senderid, msgData.receiverid])
            let message = new Message(chat.chatId, uuid(), msgData.message, msgData.date, msgData.senderid, msgData.receiverid)
            chat.messages.push(message)
            WebSockets.chats.set(chat.chatId, chat)
            WebSockets.sendMsgtoClient(message)
        }
    }

    // Method to send Data to Clients
    static sendMsgtoClient(message: Message) {
        WebSockets.connections.map(conn => {
            if (conn.userID == message.to || conn.userID == message.from) {
                conn.send(JSON.stringify(message))
            }
        })
    }
}

// Class for all Chats
class Chat {
    chatId: string
    members: string[]
    messages: Message[] = []
    constructor(chatId: string, members: string[]) {
        this.chatId = chatId
        this.members = [...members]
    }
}

// Class for All Messages
class Message {
    messageId: string
    chatId: string
    msg: string
    time: Date
    from: string
    to: string
    constructor(chatId: string, messageId: string, msg: string, time: Date, from: string, to: string) {
        this.chatId = chatId
        this.messageId = messageId
        this.from = from
        this.to = to
        this.time = time
        this.msg = msg
    }
}