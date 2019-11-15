import * as express from 'express';
import Routes from './router';
import Middleware from './config/middleware';
import Cron from './config/cron';

/**
 * @export
 * @class Server
 */
export class Server {
    // set app to be of type express.Application
    public app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(function(req, res, next) {
            var allowedOrigins = ['http://localhost:3001'];
            var origin: any = req.headers.origin;
            if(allowedOrigins.indexOf(origin) > -1){
                 res.setHeader('Access-Control-Allow-Origin', origin);
            }
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Origin, X-Requested-With, Cache-Control');
            // res.header('Access-Control-Allow-Credentials', true);
            return next();
          });
        Cron.init(); // Initialise the corn job here.
        Middleware.init(this);
        Routes.init(this);
    }
}

// export
export default new Server().app;
