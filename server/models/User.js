const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
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
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.isCorrectPassword = function(password, cb) {
    bcrypt.compare(password, this.password, (err, same) => {
        if (err) {
            console.log( 'in function' , err);
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

UserSchema.statics.findByCredentials = async function(username, password) {
    const user = await this.findOne({username});

    if(!user) {
        throw new Error('Could not locate user')
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        throw new Error('password incorrect')
    }

    return user;
}

UserSchema.methods.generateAuthTokens = async function() {
    const user = this;
    const token = jwt.sign({_id: user.username}, process.env.SECRET);

    user.tokens = user.tokens.concat({token});
    await user.save();

    return token;
}

UserSchema.pre('save', function(next) {
    //Checks if document is new or a password has been set
    if (this.isNew || this.isModified('password')) {
        const document = this;
        bcrypt.hash(document.password, saltRounds, function(err, hashedPassword) {
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