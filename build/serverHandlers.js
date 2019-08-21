"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debug = require("debug");
/**
 * @export
 * @param {(number | string)} val
 * @returns {(number | string | boolean)}
 */
function normalizePort(val) {
    var port = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
exports.normalizePort = normalizePort;
/**
 * @param  {NodeJS.ErrnoException} error
 * @param  {number|string|boolean} port
 * @returns throwerror
 */
function onError(error, port) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = (typeof port === 'string') ? "Pipe " + port : "Port " + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
exports.onError = onError;
/**
 * @export
 */
function onListening() {
    var addr = this.address();
    var bind = (typeof addr === 'string') ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
}
exports.onListening = onListening;
//# sourceMappingURL=serverHandlers.js.map