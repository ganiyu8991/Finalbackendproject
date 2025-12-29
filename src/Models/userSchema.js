
import mongoose from 'mongoose';

import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minLength: 6,
        maxLength: 50
    }

},
{timestamps: true}
);

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) next(); 
      


 const salt = await bcrypt.genSalt(10);
 this.password =  await bcrypt.hash(this.password, salt);

 
});




export const userModel = mongoose.model('User', userSchema)