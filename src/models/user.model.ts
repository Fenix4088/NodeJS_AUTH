import mongoose, { Schema } from 'mongoose';
import { IUser } from 'src/types/auth';


const User: Schema = new Schema<IUser>({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}]
});

export default mongoose.model<IUser>('User', User);
