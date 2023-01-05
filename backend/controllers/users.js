const { isValidEmailForm, emailExist, isUserExist } = require('../Tools/emailTools');
const { hashPassword } = require('../Tools/hashDehashTools');
const sequelize  = require('../models/index');
const {User} = sequelize.models;
const users = User



async function getUsers(req, res)
{
    var usersReq =  await users.findAll().then(userArray => {
        return userArray;
    });
    res.json(usersReq);
}

async function getUser (req, res) 
{
    
    try 
    {
        const userReq = await users.findOne({ where: {id:req.params.id }})
        .then(user => {
            return user;
        });
        console.log(userReq);
        if(userReq == null) {
            res.status(404).send('User not found');
        }else{
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
        if(!isValidEmailForm(req.body.email)){
            res.status(406).send('Cette adresse email n\'est pas valide');
        }else{
            
            const newUser = {            
                firstName: req.body.firstname,            
                lastName: req.body.lastname,
                email: req.body.email,
                password: hashPassword(req.body.password)
            }

            await users.create(newUser)
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
        if(!isValidEmailForm(req.body.email)){
            res.status(406).send('Cette adresse email n\'est pas valide');
        }

        const user = await users.findOne({ where: {id: req.params.id }})
        .then(user => {
            return user;
        })

        if(user == null) {
            res.status(404).send('L\'utilisateur n\'existe pas');
        }else{

            await users.update(
                { 
                    id: req.body.id,
                    firstName: req.body.firstname,
                    lastName: req.body.lastname,
                    email: req.body.email,
                    password: hashPassword(req.body.password) 
                }, 
                {
                where: {
                    id: req.params.id
                }}).then(user => {
                    res.status(201).send('L\'utilisateur a bien été modifié')
                })
                .catch(err => {
                    res.status(406).send('Cette adresse email est déjà utilisée');
                })
        }
    } catch (error) {
        res.status(406).send('Cette adresse email est déjà utilisée');

    }
    
}

async function deleteUser (req, res) 
{
    try 
    {
       const user = await users.findOne({ where: {id: req.params.id }})
        .then(user => {
            return user;
        })

        if(user != null) {
            await users.destroy({
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


        }else{
            res.status(404).send('L\'utilisateur n\'a pas été trouvé');
        }
    } catch (error) {
        res.status(500).send('Erreur lors de la suppression de l\'utilisateur');

    }
    
}

// pas encore testé
function loginUser (req, res) 
{
    try 
    {
        if(emailExist(req.body.email)) throw new Error('Error');
        //TODO :DEHASH PASSWORD pour la comparaison en BDD
        if(users.findOne({ where: {password: req.body.password }}) == null) throw new Error('Error');
        //FAIRE TON TRUC DE JWT
    } catch (error) {
        res.status(406)
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
