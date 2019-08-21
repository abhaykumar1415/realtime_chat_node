"use strict";
// default config
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    port: process.env.PORT || 3000,
    env: 'development',
    database: {
        client: 'mongodb'
    }
};
// Set the current environment or default to 'development'
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
config.env = process.env.NODE_ENV;
exports.default = config;
//# sourceMappingURL=defaults.js.map