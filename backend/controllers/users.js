const { isValidEmailForm, emailExist, isUserExist } = require('../Tools/emailTools');
const { hashPassword } = require('../Tools/hashDehashTools');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const sequelize  = require('../models/index');
const {User} = sequelize.models;


async function getUsers(req, res)
{
    var usersReq =  await User.findAll().then(userArray => {
        return userArray;
    });

    res.json(usersReq);
}

async function getUser (req, res) 
{
    
    try 
    {
        const userReq = await User.findOne({ where: {id:req.params.id }})
        .then(user => {
            return user;
        });

        console.log(userReq);

        if(userReq == null) 
        {
            res.status(404).send('User not found');
        }
        else
        {
            res.status(200).send(userReq);
        }
    } 
    catch (error) 
    {
        res.status(500).send(error);
    }
}

async function postUser (req, res) 
{

    if(!isValidEmailForm(req.body.email))
    {
        res.status(406).send('Cette adresse email n\'est pas valide');
    }
    else
    {
        if(!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password)
        {
            res.status(406).send('Les champs doivent être tous remplis');
        }
        else
        {
            const newUser = {            
                firstName: req.body.firstname,            
                lastName: req.body.lastname,
                email: req.body.email,
                password: hashPassword(req.body.password)
            }
        }

        await User.create(newUser)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(406).send('Cette adresse email est déjà utilisée');

        });
    }
    
}

async function updateUser (req, res) 
{
    try 
    {
        if(!isValidEmailForm(req.body.email))
        {
            res.status(406).send('Cette adresse email n\'est pas valide');
        }

        const user = await User.findOne({ where: {id: req.params.id }})
        .then(user => {
            return user;
        })

        if(user == null) 
        {
            res.status(404).send('L\'utilisateur n\'existe pas');
        }
        else
        {
            if(!req.body.firstname || !req.body.lastname || !req.body.email 
                || !req.body.password || !req.body.id)
            {
                res.status(406).send('Les champs doivent être tous remplis');
            }
            else
            {
                await User.update(
                { 
                    id: req.body.id,
                    firstName: req.body.firstname,
                    lastName: req.body.lastname,
                    email: req.body.email,
                    password: hashPassword(req.body.password) 
                }, 
                {
                where: 
                {
                    id: req.params.id
                }})
                .then(user => {
                    res.status(201).send('L\'utilisateur a bien été modifié')
                })
                .catch(err => {
                    res.status(406).send('Cette adresse email est déjà utilisée');
                })
            }
        }
    } 
    catch (error) 
    {
        res.status(406).send('Cette adresse email est déjà utilisée');

    }
    
}

async function deleteUser (req, res) 
{
    try 
    {
       const user = await User.findOne({ where: {id: req.params.id }})
        .then(user => {
            return user;
        })

        if(user != null) 
        {
            await User.destroy({
                where: {
                id: req.params.id
                }
            })
            .then(user => {
                res.status(200).send('L\'utilisateur a bien été supprimé')
                // return user;
            })
            .catch(err => {
                res.status(404).send('L\'utilisateur n\'a pas été trouvé');
            })


        }
        else
        {
            res.status(404).send('L\'utilisateur n\'a pas été trouvé');
        }
    } 
    catch (error) 
    {
        res.status(500).send('Erreur lors de la suppression de l\'utilisateur');
    }
    
}

async function loginUser (req, res) 
{

    const { email, password } = req.body;
    if (!(email && password)) {
        res.status(400).send("Tous les champs doivent etre remplis");
      }
    try {
        let user = await users.findOne({ where: {email: email }});
        if (user != null) {
            bcrypt.compare(password, user['dataValues'].password, function(err, response) {
                if (err) {
                    throw new Error(err);
                }
                if (response) {
                    const expireIn = 24 * 60 * 60;
                    const token    = jwt.sign({
                        id: user['dataValues'].id,
                        email: user['dataValues'].email,
                    },
                    SECRET_KEY,
                    {
                        expiresIn: expireIn
                    });
                    return res.status(200).json(token);
                }else{
                    return res.status(403).json(' Mot de passe incorrect');
                }

                return res.status(403).json(' Mot de passe incorrect');
            });
        } else {
            return res.status(404).json('Email / Mot de passe incorrect');
        }
    } catch (error) {
        return res.status(501).json(error);
    }
}


module.exports = {
    getUsers,
    postUser,
    loginUser,
    getUser,
    updateUser,
    deleteUser
}