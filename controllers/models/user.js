const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');




const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: function (val) {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return emailRegex.test(val);
            }

        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (value) {
                return /[a-z]/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value) && /[!@#$%^&*(),.?":{}|<>]/.test(value);
            },

        }
    },
    name: {
        type: String,
        maxLength: 100,
        trim: true,
        default: ''
    }
})

const imageSchema = mongoose.Schema({
    images: {
        type: String,
        default: null
    }
})


userSchema.pre('save', async function (next) {
    const saltRounds = 10;
    try {

        const user = this;



        if (user.isModified('password')) {
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);
            user.password = hashedPassword;
        }


        next();
    } catch (err) {
        next(err);
    }
});
const User = mongoose.model('User', userSchema);
const Images = mongoose.model('Images', imageSchema);
module.exports = { User, Images };