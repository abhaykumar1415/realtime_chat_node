import * as connections from '../config/connection';
import { Schema, Document } from 'mongoose';

/**
 * @export
 * @interface IUserModel
 * @extends {Document}
 */
export interface IUserModel extends Document {
    createdAt?: Date;
    updatedAt?: Date;
    name: string;
    img: string;
    role: string;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    role: { type: String, required: true } // doctor or patient
}, {
    collection: 'User',
    versionKey: false,
    timestamps: true
});

export default connections.db.model<IUserModel>('UserModel', UserSchema);
