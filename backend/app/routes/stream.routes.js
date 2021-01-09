const { authJwt } = require("../middleware");
const controller = require("../controllers/stream.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  // CREATE STREAM //

  app.post("/streams/stream", controller.createStream);

  // GET //

  app.get("/streams/stream/:id", controller.findStreamById);

  app.get("/streams/stream/specific/:title", controller.findStreamByTitle);

  app.get("/streams/specific/:owner", controller.findStreamsByOwner);

  app.get("/streams/:title", controller.findStreamsByTitle);

  app.get("/streams", controller.findAllStreams);

  // DELETE STREAM //

  app.delete("/streams/stream/:id", controller.deleteStreamById);
};
