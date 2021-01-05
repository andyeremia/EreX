const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  // TEST API

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  // USER CRUD

  // GET //

  app.get("/users/user/:id", controller.findUserById);

  app.get("/users/user/me/:username", controller.findUserByUsername);

  app.get("/users", controller.findAllUsers);

  app.get("/users/:username", controller.findUsersByUsername);

  // DELETE //

  app.delete("/users/user/:id", controller.deleteOneById);
};
