
import * as http from 'http';
import { v4 as uuid } from 'uuid';

export default class WebSockets {
    public static wss: any
    public static connections = []
    public static chats = []
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
            WebSockets.chats.map(chat => {
                let receiverFound = chat.members.includes(connection.userID)
                if (receiverFound)
                    connection.send(JSON.stringify(chat.textMsg))
            })

            connection.on("open", () => {
                console.log("server socket Connection opened. ")

            })
            connection.on("close", () => {
                console.log("server socket Connection closed")
            })

            connection.on('message', function (message: { utf8Data: string; }) {                
                let msgData = JSON.parse(message.utf8Data)
                WebSockets.createPrivateChat(msgData)

                // connection.sendUTF('Hi this is Chat server!');
                // Broadcasting
                /* for (let conn of WebSockets.connections) {
                    if (conn != connection)
                        conn.send(msgData.message)
                } */
            });

        })
    }

    // Method to Create Private Conversation Space
    static createPrivateChat(msgData: any): void {
        let chatExist = false;
        for (let chat of WebSockets.chats) { // if chatid exists ->append msg
            let senderFound = chat.members.includes(msgData.senderid)
            if (senderFound) {
                let receiverFound = chat.members.includes(msgData.receiverid)
                if (receiverFound) {
                    chatExist = true
                    let chatobj = { msgid: uuid(), msg: msgData.message, time: msgData.date, from: msgData.senderid, to: msgData.receiverid }
                    chat.textMsg.push(chatobj)
                    WebSockets.sendMsgtoClient(chatobj)
                }
            }
        }
        if (chatExist == false) { // if chat id does not exist
            let chatPayload = {
                chatid: uuid(),
                members: [msgData.senderid, msgData.receiverid],
                textMsg: [{ msgid: uuid(), msg: msgData.message, time: msgData.date, from: msgData.senderid, to: msgData.receiverid }]
            }
            WebSockets.sendMsgtoClient(chatPayload.textMsg[0])
            WebSockets.chats.push(chatPayload)
        }
    }

    // Method to send Data to Clients
    static sendMsgtoClient(msgData: any) {
        WebSockets.connections.map(conn => {
            if (conn.userID == msgData.to || conn.userID == msgData.from) {
                conn.send(JSON.stringify(msgData))
            }
        })
    }
}