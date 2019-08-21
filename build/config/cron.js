"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cron_1 = require("cron");
var TEST_CRON_INTERVAL = '* 1 * * * *';
/**
 * @export
 * @class Cron
 */
var Cron = /** @class */ (function () {
    function Cron() {
    }
    /**
     * @private
     * @static
     * @memberof Cron
     */
    Cron.testCron = function () {
        new cron_1.CronJob(TEST_CRON_INTERVAL, function () {
            console.log('Hello, I am Cron! Please see ../config/cron.ts');
        }, null, true);
    };
    /**
     * @static
     * @memberof Cron
     */
    Cron.init = function () {
        Cron.testCron();
    };
    return Cron;
}());
exports.default = Cron;
//# sourceMappingURL=cron.js.map