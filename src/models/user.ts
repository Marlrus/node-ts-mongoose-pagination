import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
   first_name: String,
   last_name: String,
   email: String,
   date_created: { type: Date, default: Date.now() },
   admin: Boolean,
});

interface UserInterface {
   first_name: string;
   last_name: string;
   email: string;
   date_created?: string;
   admin?: boolean;
}

//Second generic is query helpers
const User = mongoose.model<UserInterface & mongoose.Document>(
   'User',
   userSchema
);

export default User;
