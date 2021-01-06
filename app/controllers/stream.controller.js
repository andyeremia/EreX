const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Stream = db.stream;

exports.createStream = (req, res) => {
  const stream = new Stream({
    owner: req.body.owner,
    title: req.body.title,
    description: req.body.description,
  });

  stream.save(async (err, stream) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    await User.findOne(
      {
        username: req.body.owner,
      },
      (err, user) => {
        if (err) {
          console.log(err);
          return res.status(404).send(err);
        }

        user.streams.push(stream._id);

        user.save((err) => {
          if (err) {
            return res.status(500).send({ message: err });
          }

          res.send(stream);
        });
      }
    );
  });
};

exports.deleteStreamById = async (req, res) => {
  try {
    await Stream.findOneAndDelete(
      {
        _id: req.params.id,
      },
      (err, stream) => {
        if (err) {
          console.log(err);
          return res.status(404).send(err);
        } else {
          User.findOne(
            {
              username: stream.owner,
            },
            (err, user) => {
              if (err) {
                console.log(err);
                return res.status(404).send(err);
              }

              user.streams.pop(stream._id);

              user.save((err) => {
                if (err) {
                  return res.status(500).send({ message: err });
                }

                console.log("Deleted stream: ", stream);
                return res.status(200).send(stream);
              });
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(503).send(error);
  }
};
