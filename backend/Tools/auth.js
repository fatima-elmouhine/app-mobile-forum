const jwt = require("jsonwebtoken");
const path = require('path');
const sequelize  = require('../models/index');
const {User} = sequelize.models;
const SECRET_KEY = process.env.SECRET_KEY;


const auth = async (req, res, next) => {

    // const jwtPrivateKey = fs.readFileSync(path.resolve('') + process.env.JWT_SECRET_KEY, 'utf8');
    const tokenAllStr = req.headers.cookie;
    const tokenStr = tokenAllStr.split('=')[1];
    try {
        const token = jwt.verify(tokenStr, SECRET_KEY);
        req.user = token;
        req.user.isAdmin = isAdmin(req.user);
        next();
    } catch (error) {
        res.status(401).json({message: "Accès refusé"});
    }
};

const isAdmin = (user) => {
    let isAdmin;
    user.role.map(role => {
        if(role === 'ROLE_ADMIN') isAdmin = true;
    })
    return isAdmin === undefined ? false : isAdmin;
};



module.exports = auth;