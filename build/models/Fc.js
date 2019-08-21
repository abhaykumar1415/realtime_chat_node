"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var connections = require("../config/connection");
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    path: String,
    md5: String,
    url: String,
    summary: String,
    request: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'request'
    }
}, {
    collection: 'fc',
    versionKey: false,
    timestamps: true
}).pre('save', function (next) {
    // this will run before saving
    // if (this._doc) {
    //     const doc: FCModel = this._doc;
    //     const now: Date = new Date();
    //     if (!doc.createdAt) {
    //         doc.createdAt = now;
    //     }
    //     doc.updatedAt = now;
    // }
    next();
    return _this;
});
exports.default = connections.db.model('UserModel', UserSchema);
//# sourceMappingURL=Fc.js.map