# Real-Time Secure Chat Application using Web Sockets
 
## Technology Stack
 - NodeJs
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
 - Sending and receiving of Messages from my Client application build in React
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


    ```git clone https://github.com/abhaykumar1415/node-express-ts-starterkit.git```

## Resources
 - [Writing WebSocket Servers](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers)
 - [TypeScript](https://www.typescriptlang.org/)
 - [Express](https://expressjs.com/)

**PRs and issues are most welcome**
