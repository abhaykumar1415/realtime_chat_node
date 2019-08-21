"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var connections = require("../config/connection");
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    key: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    }
}, {
    collection: 'user',
    versionKey: false
}).pre('save', function (next) {
    // this will run before saving
    if (_this._doc) {
        var doc = _this._doc;
        var now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.updatedAt = now;
    }
    next();
    return _this;
});
exports.default = connections.db.model('UserModel', UserSchema);
//# sourceMappingURL=User.js.map