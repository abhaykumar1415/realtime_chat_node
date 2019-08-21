import * as express from 'express';
import UserRouter from './UserRouter';
import FcRouter from './FcRouter';
import Fc_HashRouter from './FcHash';
import { IServer } from '../interfaces/ServerInterface';
import SettingRouter from './SettingRoute';
import ModeratorRouter from './ModeratorRoute';
import RequestRouter from './RequestRouter';
import RequestLogRouter from './RequestLogRouter';
// import TokenRouter from './TokenRouter';

import Fc_hashController from '../controllers/Fc_hashController';
import Auth from "../services/JwtToken";

export default class Routes {
    /**
     * @param  {IServer} server
     * @returns void
     */
    static init(server: IServer): void {
        const router: express.Router = express.Router();
        server.app.use('/', router);

        // migrationRoute
        // server.app.use('/test', Fc_hashController.migrateFcHash);

        // mobile routes
        server.app.use('/api/verify', Auth.verifyRequestAuth);
        server.app.use('/api/users', new UserRouter().router);
        server.app.use('/api/request', new RequestRouter().router);

        // dashboard routes
        server.app.use('/api/fc', Auth.verifyFcAuth, new FcRouter().router);
        server.app.use('/api/fc-hash', Auth.verifyFcAuth, new Fc_HashRouter().router);
        server.app.use('/api/setting', Auth.verifyFcAuth, new SettingRouter().router);
        server.app.use('/api/moderator', new ModeratorRouter().router);
        server.app.use('/api/requestLog', Auth.verifyFcAuth, new RequestLogRouter().router);
    }
}
