const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isAlphanumeric(value)) {
                throw new Error('Username containes illegal characters');
            }
            if (!validator.isLength(value, { min: 3, max: 20 })) {
                throw new Error('Username is invalid length');
            }
        }
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        require: false,
        default: 'https://pokemon-challenges.s3.amazonaws.com/users/default.jpg'
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Number
    },
    badges: {
        type: Array,
        default: ['Beta Tester']
    },
    featuredRun: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Run'
    }
});

UserSchema.methods.isCorrectPassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, same) => {
        if (err) {
            console.log('in function', err);
            cb(err);
        } else {
            cb(err, same)
        }
    })
}

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;

    return userObject;
}

UserSchema.statics.findByCredentials = async function (username, password) {
    const user = await this.findOne({ username });

    if (!user) {
        throw new Error('Could not locate user')
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('password incorrect')
    }

    return user;
}

UserSchema.methods.generateAuthTokens = async function () {
    const user = this;
    const token = jwt.sign({ _id: user.username }, process.env.SECRET);

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

UserSchema.pre('save', function (next) {
    //Checks if document is new or a password has been set
    if (this.isNew || this.isModified('password')) {
        const document = this;
        if (!validator.isAlphanumeric(document.password) || !validator.isLength(document.password, { min: 6, max: 20 })) {
            const err = { response: 'Your password is invalid' };
            next(err);
        }
        bcrypt.hash(document.password, saltRounds, function (err, hashedPassword) {
            if (err) {
                next(err);
            } else {
                document.password = hashedPassword;
                next()
            }
        });
    } else {
        next()
    }
});

module.exports = mongoose.model('User', UserSchema);