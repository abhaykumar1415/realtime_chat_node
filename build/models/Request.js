"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var connections = require("../config/connection");
var mongoose_1 = require("mongoose");
var RequestSchema = new mongoose_1.Schema({
    key: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    geolocation: {
        type: { type: String },
        coordinates: []
    },
    assets: [
        {
            asset_id: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'asset'
            }
        }
    ],
    text: {
        type: String
    },
    sourceUrl: {
        type: String
    },
    status: {
        type: String,
        default: "Pending"
    },
    fc_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'fc'
    },
    prefferedLanguage: {
        type: String,
        default: 'English'
    },
    clientId: {
        type: String
    },
    duplicateCounter: {
        type: Number,
        default: 0
    }
}, {
    collection: 'request',
    versionKey: false,
    timestamps: true
}).pre('save', function (next) {
    // this will run before saving
    // if (this._doc) {
    //     const doc: RequestModel = this._doc;
    //     const now: Date = new Date();
    //     if (!doc.createdAt) {
    //         doc.createdAt = now;
    //     }
    //     doc.updatedAt = now;
    // }
    next();
    return _this;
});
exports.default = connections.db.model('RequestModel', RequestSchema);
//# sourceMappingURL=Request.js.map