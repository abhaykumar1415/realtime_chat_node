"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var compression = require("compression");
var cookieParser = require("cookie-parser");
var express = require("express");
var cors = require("cors");
var helmet = require("helmet");
var ejs_1 = require("ejs");
var path = require("path");
/**
 * @export
 * @class Middleware
 */
var Middleware = /** @class */ (function () {
    function Middleware() {
    }
    /**
     * @static
     * @param {IServer} server
     * @memberof Middleware
     */
    Middleware.init = function (server) {
        // express middleware
        server.app.use(bodyParser.urlencoded({ extended: false }));
        server.app.use(bodyParser.json());
        // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
        server.app.use(cookieParser());
        // returns the compression middleware
        server.app.use(compression());
        // helps you secure your Express apps by setting various HTTP headers
        server.app.use(helmet());
        // providing a Connect/Express middleware that can be used to enable CORS with various options
        server.app.use(cors());
        // To serve static files such as images, CSS files, and JavaScript files
        server.app.use(express.static(path.join(__dirname, '../client')));
        // render
        server.app.set('views', path.join(__dirname, '../client'));
        server.app.engine('html', ejs_1.renderFile);
        server.app.set('view engine', 'html');
        // cors
        server.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,' +
                ' Content-Type, Accept,' +
                ' Authorization,' +
                ' Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    };
    return Middleware;
}());
exports.default = Middleware;
//# sourceMappingURL=middleware.js.map