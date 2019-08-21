"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var defaults_1 = require("./defaults");
// Load environment-specific settings
var localConfig = {};
try {
    // The environment file might not exist
    localConfig = require("../env/" + defaults_1.default.env);
    localConfig = localConfig || {};
}
catch (error) {
    localConfig = {};
    console.error('error', error);
}
// merge the config files
// localConfig will override defaults
exports.default = Object.assign({}, defaults_1.default, localConfig);
//# sourceMappingURL=index.js.map