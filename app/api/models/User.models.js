import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: {
        type: String,
        enum: ['admin', 'manager', 'technician', 'user', 'viewer'],
        default: 'user'
    },
    department: { type: String },
    active: { type: Boolean, default: true }
}, { timestamps: true });

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    if (this.password.startsWith('$2')) return;
    this.password = await bcrypt.hash(this.password, 12);
});


userSchema.methods.comparePassword = async function (candidatePassword) {
    const storedPassword = this.password;
    if (storedPassword.startsWith('$2')) {
        return await bcrypt.compare(candidatePassword, storedPassword);
    }
    return storedPassword === candidatePassword;
};


const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;