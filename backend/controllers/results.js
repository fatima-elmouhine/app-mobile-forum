const sequelize = require("../models/index");
const { Result, User, UserQcm, Qcm, Question } = sequelize.models;

async function getResultsByUser(req, res) {
  try {
    const { id } = req.user;
    const { isGenerated } = req.query;
    console.log("isGenerated", isGenerated);
    const results = await Result.findAll({
      attributes: ["result"],
      include: {
        where: { id_user: id },
        model: UserQcm,
        attributes: ["id_qcm"],
        include: {
          where:
            isGenerated === undefined
              ? {}
              : { isGenerated: isGenerated === "true" },
          attributes: [],
          model: Qcm,
        },
      },
    });

    if (results.length === 0) {
      return res.status(404).json("Aucun résultat trouvé");
    }

    let total = 0;

    const scoresByQcmId = results.reduce((acc, result) => {
      const qcmId = result.UserQcm.id_qcm;
      acc[qcmId] = acc[qcmId] || [];
      acc[qcmId].push(result.result);
      return acc;
    }, {});

    const averages = Object.entries(scoresByQcmId).reduce(
      (acc, [qcmId, scores]) => {
        const sum = scores.reduce((acc, score) => acc + score, 0);
        const scoreOn100 = (sum / scores.length) * 100;
        total += scoreOn100;
        acc[qcmId] = scoreOn100;
        return acc;
      },
      {}
    );
    res.status(200).json({ averages, total });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function getResultsByTheme(req, res) {
  try {
    const { id } = req.user;
    const { id_theme } = req.params;
    const { isGenerated } = req.query;
    const results = await Result.findAll({
      include: [
        {
          model: UserQcm,
          attributes: ["id_qcm", "id_user"],
          where: { id_user: id },
          include: {
            model: Qcm,
            attributes: [],
            where:
              isGenerated === undefined
                ? {}
                : { isGenerated: isGenerated === "true" },
          },
        },
        {
          model: Question,
          where: { id_theme: id_theme },
          attributes: [],
        },
      ],
    });

    if (results.length === 0) {
        return res.status(404).json("Aucun résultat trouvé");
      }
  
    const scoresByQcmId = results.reduce((acc, result) => {
      const qcmId = result.UserQcm.id_qcm;
      acc[qcmId] = acc[qcmId] || [];
      acc[qcmId].push(result.result);
      return acc;
    }, {});
    let total = 0;
    const averages = Object.entries(scoresByQcmId).reduce(
      (acc, [qcmId, scores]) => {
        const sum = scores.reduce((acc, score) => acc + score, 0);
        const scoreOn100 = (sum / scores.length) * 100;
        total += scoreOn100;
        acc[qcmId] = scoreOn100;
        return acc;
      },
      {}
    );
    res.status(200).json({ averages, total });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function postResult(req, res) {
  if (!req.body.result || !req.body.id_question || !req.body.id_user_qcm) {
    res.status(406).send("Les champs doivent être tous remplis");
  } else {
    const newResult = {
      result: req.body.result,
      id_question: req.body.id_question,
      id_user_qcm: req.body.id_user_qcm,
    };
  }

  await Result.create(newResult)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(406).send("Cette adresse email est déjà utilisée");
    });
}

async function updateResult(req, res) {
  try {
    const result = await Result.findOne({ where: { id: req.params.id } }).then(
      (result) => {
        return result;
      }
    );

    if (result == null) {
      res.status(404).send("L'artefact n'existe pas");
    } else {
      if (
        !req.body.result ||
        !req.body.id_question ||
        !req.body.id_user_qcm ||
        !req.body.id
      ) {
        res.status(406).send("Les champs doivent être tous remplis");
      } else {
        await Result.update(
          {
            id: req.body.id,
            result: req.body.result,
            id_question: req.body.id_question,
            id_user_qcm: req.body.id_user_qcm,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        )
          .then((result) => {
            res.status(201).send("La modification a été effectuée");
          })
          .catch((err) => {
            res.status(406).send("Error");
          });
      }
    }
  } catch (error) {
    res.status(406).send("Error");
  }
}

async function deleteResult(req, res) {
  try {
    const result = await Result.findOne({ where: { id: req.params.id } }).then(
      (result) => {
        return result;
      }
    );

    if (result != null) {
      await Result.destroy({
        where: {
          id: req.params.id,
        },
      })
        .then((result) => {
          res.status(200).send("La suppression a été effectuée");
          // return result;
        })
        .catch((err) => {
          res.status(404).send("La suppression n'a pas aboutie!");
        });
    } else {
      res
        .status(404)
        .send("Ce que vous tentez de supprimer n'a pas été trouvé");
    }
  } catch (error) {
    res.status(500).send("Erreur lors de la suppression");
  }
}

module.exports = {
  getResultsByUser,
  getResultsByTheme,
  updateResult,
  deleteResult,
};
