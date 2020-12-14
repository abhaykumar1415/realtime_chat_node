# Real-Time Secure Chat Application using Web Sockets
 - The real-time implementation of this Chat application is done using Web Sockets development technique.
 - For End-to-end Encryption, I have made use of the [Signal Protocol](https://github.com/signalapp/libsignal-protocol-javascript) at the client side. Refer the link mentioned below for the Client Application.

## Technology Stack
 - NodeJS
 - Express
 - TypeScript
 - MongoDB
 - Web Sockets

## Web Sockets (Push Server) as a Service
 - HTTP protocol upgrade to websocket (101 status code)
 ```
 import * as http from ‘http’

 export default class WebSockets {
    	public static wsServer: any
			  static init(server: http.Server): void {
        		const WebSocketServer = require("websocket").server
          this.wsServer = new WebSocketServer({
               "httpServer": server
          })
     }
 }
 ```
 - Sending and Receiving of Messages to/from my [Client Application build in React](https://github.com/abhaykumar1415/realtime_chat_react)
 ```
 wsServer.on(‘request',request => {
    const connection = request.accept(null, request.origin);

    connection.on(‘message’, message => {
      console.log('Received Message:', message.utf8Data);
      connection.sendUTF('Hi this is WebSocket server!');
    });
    
    connection.on('close',(reasonCode, description) => {
        console.log('Client has disconnected.');
    });
});
 ```

## Add ons
 - Apidoc integrated for better api documentation
 - Dummy cron job
 - Dummy controller, router, models configured.
 - Basic **JWT** setup.
 - Development and production environment setup for easy of use

## Resources
 - [Writing WebSocket Servers](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers)
 - [TypeScript](https://www.typescriptlang.org/)
 - [Express](https://expressjs.com/)

**PRs and issues are most welcome**
