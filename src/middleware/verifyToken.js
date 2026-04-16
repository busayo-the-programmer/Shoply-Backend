const jwt = require('jsonwebtoken')
async function verifyToken(req, res, next) {
    try {
        const header = req.headers.authorization
        if (!header) {
            return res.status(401).json({
                message: "Authorization header missing"
            });
        }

        const token = header.split(' ')[1]
        if (!token) {
            return res.status(401).json({
                message: "Token missing"
            });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(err)
                return res.status(401).json({
                    message: "Token expired",
                    expiredAt: err.expiredAt
                });
            }

            req.user = decoded
    
            next()
        });

    } catch (error) {
        console.log(error)

    }
}
const verifyIsAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            message: "Forbidden: Admins only"
        });
    }
    next()
}
const verifyIsVendor = (req, res, next) => {
    if (req.user.role !== 'vendor' && req.user.role !== 'admin') {
        return res.status(403).json({
            message: "Forbidden: Vendors and admins only"
        });
    }
    next()
}


module.exports = {
    verifyToken, verifyIsAdmin, verifyIsVendor
}