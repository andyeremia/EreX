const db = require("../models");
const User = db.user;
const Role = db.role;

// Tests for verifying the app
exports.allAccess = (req, res) => {
  res.status(200).send("Public content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator content.");
};

// User methods
// FIND: one, many, (depending on user's role)
// UPDATE: one
// DELETE: one, many, (depending on user's role)

// FIND //

exports.findUserById = async (req, res) => {
  try {
    await User.findById(req.params.id, (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(404).send(err);
      }
      return res.status(200).send(doc);
    });
  } catch (error) {
    console.log(error);
    return res.status(503).send(error);
  }
};

exports.findUserByUsername = async (req, res) => {
  try {
    await User.findOne(
      {
        username: req.params.username,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(404).send(err);
        }
        return res.status(200).send(doc);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(503).send(error);
  }
};

exports.findAllUsers = async (req, res) => {
  try {
    await User.find((err, docs) => {
      if (err) {
        console.log(err);
        return res.status(404).send(err);
      }
      return res.status(200).send(docs);
    });
  } catch (error) {
    console.log(error);
    return res.status(503).send(error);
  }
};

// Find all the users whose usernames contain a specific substring

exports.findUsersByUsername = async (req, res) => {
  try {
    await User.find(
      {
        username: { $regex: req.params.username, $options: "i" },
      },
      (err, docs) => {
        if (err) {
          console.log(err);
          return res.status(404).send(err);
        }
        return res.status(200).send(docs);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(503).send(error);
  }
};

// FIND USERS BY ROLE //

// ***************** //

// UPDATE //

// ***************** //

// DELETE //

exports.deleteOneById = async (req, res) => {
  try {
    await User.findOneAndDelete(
      {
        _id: req.params.id,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(404).send(err);
        } else {
          console.log("Deleted user: ", doc);
          return res.status(200).send(doc);
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(503).send(error);
  }
};

// DELETE ONE BY USERNAME
// DELETE MANY
