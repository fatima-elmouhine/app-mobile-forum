const {
  isValidEmailForm,
  emailExist,
  isUserExist,
} = require("../Tools/emailTools");
const { hashPassword } = require("../Tools/hashDehashTools");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const sequelize = require("../models/index");
const { User } = sequelize.models;
const { genericGetAll, genericGetOne } = require("../Tools/dbTools");
const fs = require("fs");

async function getUsers(req, res) {
  try {
    const users = await genericGetAll(User, req);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getUser(req, res) {
  try {
    const user = await genericGetOne(User, req);
    if (user === null) return res.status(404).json("La réponse n'existe pas");
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function postUser(req, res) {
  if (!isValidEmailForm(req.body.email)) {
    res.status(406).send("Cette adresse email n'est pas valide");
  } else {
    if (
      !req.body.firstname ||
      !req.body.lastname ||
      !req.body.email ||
      !req.body.password
    ) {
      res.status(406).send("Les champs doivent être tous remplis");
    } else {
      const newUser = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        password: hashPassword(req.body.password),
      };
      await User.create(newUser)
        .then((user) => {
          res.status(201).json(user);
        })
        .catch((err) => {
          res.status(406).send("Cette adresse email est déjà utilisée");
        });
    }
  }
}

async function updateUser(req, res, next) {
  try {
    if (req.body.password) {
      req.body.password = hashPassword(req.body.password);
    }
    if (req.body.id && req.user.isAdmin === false)
      throw new Error(
        "Vous ne pouvez pas modifier l'id d'un autre utilisateur"
      );
    if (req.body.role && req.user.isAdmin === false)
      throw new Error("Vous ne pouvez pas modifier le role d'un utilisateur");
    // check if email is already used
    // if (req.body.email) {
    //     const emailExist = await User.findOne({where: {email: req.body.email}});
    //     if (emailExist) throw new Error("Cette adresse email est déjà utilisée");
    // }
    const id = req.user.isAdmin ? req.body.id : req.user.id;
    const user = await User.update(req.body, { where: { id: id } });
    const newUser = await User.findOne({ where: { id: id } });
    const expireIn = 24 * 60 * 60;
    const token = jwt.sign(
      {
        id: newUser["dataValues"].id,
        email: newUser["dataValues"].email,
        firstName: newUser["dataValues"].firstName,
        lastName: newUser["dataValues"].lastName,
        role: newUser["dataValues"].role.role,
      },
      SECRET_KEY,
      {
        expiresIn: expireIn,
      }
    );
    console.log("L. token", token);
    res
      .cookie("token", token, {
        httpOnly: true,
        // secure: true,
      })
      .status(200)
      .json({ user: newUser, token: token });
  } catch (error) {
    if (error.parent?.errno) {
      return res.status(500).json(error.parent.errno);
    }
    // console.log('L. erreurrrr',error.parent.errno);
    res.status(500).json(error.message);
  }
}

async function deleteUser(req, res) {
  try {
    const user = await User.findOne({ where: { id: req.params.id_user } }).then(
      (user) => {
        return user;
      }
    );
    if (user != null) {
      await User.destroy({
        where: {
          id: req.params.id,
        },
      })
        .then((user) => {
          res.status(200).send("L'utilisateur a bien été supprimé");
          // return user;
        })
        .catch((err) => {
          res.status(404).send("L'utilisateur n'a pas été trouvé");
        });
    } else {
      res.status(404).send("L'utilisateur n'a pas été trouvé");
    }
  } catch (error) {
    res.status(500).send("Erreur lors de la suppression de l'utilisateur");
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).json("Tous les champs doivent etre remplis");
  }
  try {
    let user = await User.findOne({ where: { email: email } });
    console.log(user);
    if (user != null) {
      bcrypt.compare(
        password,
        user["dataValues"].password,
        function (err, response) {
          if (err) {
            throw new Error(err);
          }
          if (response) {
            const expireIn = 24 * 60 * 60;
            console.log(user["dataValues"]);
            const token = jwt.sign(
              {
                id: user["dataValues"].id,
                email: user["dataValues"].email,
                firstName: user["dataValues"].firstName,
                lastName: user["dataValues"].lastName,
                role: user["dataValues"].role.role,
              },
              SECRET_KEY,
              {
                expiresIn: expireIn,
              }
            );

            // return res.status(200).json(token)
            res
              .cookie("token", token, {
                httpOnly: true,
                // secure: true,
              })
              .status(200)
              .json({
                token: token,
              });
          } else {
            return res.status(403).json("Mot de passe incorrect");
          }
        }
      );
    } else {
      return res.status(404).json("Email / Mot de passe incorrect");
    }
  } catch (error) {
    // console.log(error);
    return res.status(501).json(error);
  }
}

async function uploadAvatar(req, res) {
    console.log('L. req.file', req.file)
  if (!req.file) {
    return res.status(400).send({ error: "Aucune image téléchargée" });
  }
  const user = await User.findByPk(req.body.id, { attributes: ["avatar"] });
  if (user.avatar) {
    fs.unlink(`./public/avatars/` + user.avatar, (err) => {
      if (err) {
        console.log("err", err);
      }
    });
  }
  const avatar = await User.update(
    { avatar: req.file.filename },
    { where: { id: req.body.id } }
  );
  res.status(200).send(req.file);
}

async function getAvatar(req, res) {
  try {
    const user = await User.findByPk(req.params.id, { attributes: ["avatar"] });
    if (user.avatar) {
      return res.status(200).json({ avatar: `http://${req.headers.host}/avatars/${user.avatar}`});
    }
    return res.status(200).json({ avatar: `http://${req.headers.host}/default/default.png` });
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = {
  getUsers,
  postUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
  uploadAvatar,
  getAvatar,
};
