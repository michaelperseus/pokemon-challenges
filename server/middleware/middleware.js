const jwt = require('jsonwebtoken');
const User = require('../models/User');

const withAuth = async (req, res, next) => {
    // const token = req.cookies.token;

    // if (!token) {
    //     res.status(401).send('Unauthorized Access: No token provided');
    // } else {
    //     jwt.verify(token, process.env.SECRET, (err, decoded) => {
    //         if (err) {
    //             res.status(401).send('Unauthorized: Invalid Token')
    //         } else {
    //             req.username = decoded.username;
    //             next();
    //         }
    //     })
    // }
    try {
        const token = req.header('Authorization').split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findOne({username: decoded._id, 'tokens.token': token});

        if (!user) {
            throw new Error();
        }

        next();

    } catch (e) {
        console.log(e);
        res.status(401).send(e);
    }

}

module.exports = withAuth;