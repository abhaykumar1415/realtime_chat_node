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
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
}, {
    collection: 'User',
    versionKey: false,
    timestamps: true
});

export default connections.db.model < IUserModel >('UserModel', UserSchema);
