const jwt = require('jsonwebtoken');

const withAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).send('Unauthorized Access: No token provided');
    } else {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send('Unauthorized: Invalid Token')
            } else {
                req.username = decoded.username;
                next();
            }
        })
    }
}

module.exports = withAuth;