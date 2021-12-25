import mongoose, { Schema } from 'mongoose';
import { IRole } from 'src/types/auth';

const Role: Schema = new Schema<IRole>({
      value: {type: String, unique: true, required: true, default: 'USER'},
});


export default mongoose.model<IRole>('Role', Role);