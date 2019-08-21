import * as connections from '../config/connection';
import { Schema, Document } from 'mongoose';

/**
 * @export
 * @interface IUserModel
 * @extends {Document}
 */
export interface IUserModel extends Document {
    createdAt ? : Date;
    updatedAt ? : Date;
    name: string;
    email: string;
    source: String;
    preferredLanguage: String
}

const UserSchema: Schema = new Schema({
    key: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    preferredLanguage: {
      type: String,
      default: 'en'
    }

}, {
    collection: 'User',
    versionKey: false,
    timestamps: true
});

export default connections.db.model < IUserModel >('UserModel', UserSchema);
