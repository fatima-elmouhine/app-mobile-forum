import { isValidEmailForm, emailExist } from '../Tools/emailTools';
import {} from '../Tools/hashDehashTools';

const users = require('../models/users')


async function getUsers(req, res)
{
    return await users.findAll();
}

function getUser (req, res) 
{
    try 
    {

        if(users.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        res.json(users.findOne({ where: {id: req.body.id }}));
         
    } 
    catch (error) 
    {
        res.status(406)
    }
}

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

async function postUser (req, res) 
{
    try 
    {
        if(!isValidEmailForm(req.body.email)) throw new Error('Error');
        if(emailExist(req.body.email)) throw new Error('Error');
        const newUser = {            
            firstname: req.body.firstname,            
            lastname: req.body.lastname,
            email: req.body.email,
            //TODO: HASHPASSWORD
            password: req.body.password 
        }
        const jane = await User.create(newUser);
        res.status(201).json(newUser)
    } catch (error) {
        res.status(406)
    }
    
}

async function updateUser (req, res) 
{

    try 
    {
        
        if(users.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        await User.update(
            { 
                id: req.body.id,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password }, 
            {
            where: {
                id: req.body.id
            }
            }
        );

        res.status(200).json('User updated')
    } catch (error) {
        res.status(406)
    }
    
}

async function deleteUser (req, res) 
{
    try 
    {

        if(users.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        await User.destroy({
            where: {
              id: req.body.id
            }
          });

        res.status(200).json('User deleted')
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