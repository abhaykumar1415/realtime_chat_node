"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var connections = require("../config/connection");
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    path: String,
    md5: String,
    pHash: String,
    dHash: String,
    type: String,
    size: String,
    videoLength: String,
    canonicalUrl: String,
}, {
    collection: 'assets',
    versionKey: false,
    timestamps: true
}).pre('save', function (next) {
    // this will run before saving
    // if (this._doc) {
    //     const doc: AssetModel = this._doc;
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
//# sourceMappingURL=Assets.js.map