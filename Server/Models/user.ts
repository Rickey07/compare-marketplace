import mongoose, { ObjectId } from "mongoose";
import { v4 as uuidV4 } from "uuid";

interface User {
  name: string;
  image_url?: string;
  password: string;
  email: string;
  objectIdField?: ObjectId;
}

const userSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  objectIdField: { type: String },
});


const User = mongoose.model<User>('User',userSchema)

export {User}
