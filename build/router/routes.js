"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
// import * as React from 'react';
var UserRouter_1 = require("./UserRouter");
// import { renderToString } from 'react-dom/server';
var Routes = /** @class */ (function () {
    function Routes() {
    }
    /**
     * @param  {IServer} server
     * @returns void
     */
    Routes.init = function (server) {
        var router = express.Router();
        server.app.use('/', router);
        server.app.use('/v1/users', new UserRouter_1.default().router);
        // server.app.use('/', (req, res) => {
        //     res.render('index', { title: 'Hey', message: 'Hello there!' });
        // });
        // users
    };
    return Routes;
}());
exports.default = Routes;
//# sourceMappingURL=routes.js.map