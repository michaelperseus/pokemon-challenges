const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    }
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