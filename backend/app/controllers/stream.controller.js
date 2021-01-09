const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Stream = db.stream;

// STREAM CRUD //

// CREATE
// READ:
//
// I. ONE:
//  - BY ID
//  - BY TITLE
//
// II. MANY:
//  - BY TITLE
//  - BY OWNER
//  - ALL
//
// UPDATE
//
// DELETE

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

exports.findStreamById = async (req, res) => {
  try {
    await Stream.findById(req.params.id, (err, stream) => {
      if (err) {
        console.log(err);
        return res.status(404).send(err);
      } else {
        console.log("Stream found!");
        return res.status(200).send(stream);
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(503).send(error);
  }
};

exports.findStreamByTitle = async (req, res) => {
  try {
    await Stream.find(
      {
        title: req.params.title,
      },
      (err, stream) => {
        if (err) {
          console.log(err);
          return res.status(404).send(err);
        } else {
          console.log("Stream found!");
          return res.status(200).send(stream);
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(503).send(error);
  }
};

exports.findStreamsByOwner = async (req, res) => {
  try {
    await Stream.find(
      {
        owner: req.params.owner,
      },
      (err, streams) => {
        if (err) {
          console.log(err);
          return res.status(404).send(err);
        } else {
          console.log("Streams found!");
          return res.status(200).send(streams);
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(503).send(error);
  }
};

exports.findStreamsByTitle = async (req, res) => {
  try {
    await Stream.find(
      {
        title: { $regex: req.params.title, $options: "i" },
      },
      (err, streams) => {
        if (err) {
          console.log(err);
          return res.status(404).send(err);
        } else {
          console.log("Streams found!");
          return res.status(200).send(streams);
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(503).send(error);
  }
};

exports.findAllStreams = async (req, res) => {
  try {
    await Stream.find((err, streams) => {
      if (err) {
        console.log(err);
        return status(404).send(err);
      } else {
        console.log("Streams found!");
        return res.status(200).send(streams);
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(503).send(error);
  }
};

// UPDATE //
// **************** //
//  //
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
