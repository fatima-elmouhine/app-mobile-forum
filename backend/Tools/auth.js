const jwt = require("jsonwebtoken");
const path = require('path');
const sequelize  = require('../models/index');
const {User} = sequelize.models;
const SECRET_KEY = process.env.SECRET_KEY;


const auth = async (req, res, next) => {

    // const jwtPrivateKey = fs.readFileSync(path.resolve('') + process.env.JWT_SECRET_KEY, 'utf8');
    const tokenAllStr = req.headers.cookie;

    try {
        const token = tokenAllStr.split('token=')[1] || req.cookies.token;

        if (!token) return res.status(403).send({"message": "Accès refusé."});
        const decoded = jwt.verify(token,SECRET_KEY);
        req.user = decoded;
        console.log(decoded.id);
       const user = await User.findOne({email: decoded.email})
    //    res.json(user);
       if(user == null) return res.status(403).send({"message": "Accès refusé."});
       user['dataValues'].role.role.map((role) => {
            console.log(role);
            if (role === 'ROLE_ADMIN' || req.params.id_user == decoded.id ) {
                // res.send(role);
                console.log(role);
                next();
            }
        
       })
    //    console.log(user);
        // .then((user) => {
        //     // console.log(user['dataValues'].role.role);
        //     user['dataValues'].role.role.map((role) => {
        //         // console.log(role);
        //         if (role === 'ROLE_ADMIN' || req.params.id == decoded.id ) {
        //             // req.user.role.role = role;
        //             // console.log(role);
        //             next();
        //         }
        //         // else{
        //         //     res.status(403).send({"message": "Accès refusé !"});
        //         // }
        //     })
            
        // })
        // .catch((err) => {
        //     // res.status(403).send({"message": "Token invalide !"});
        // });
    } catch (error) {
        res.status(400).json({"message": "Vous n'êtes pas connecté"});
    }
    
};



module.exports = auth;