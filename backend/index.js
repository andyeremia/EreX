const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
import socketIO from "socket.io";
import { v4 as uuidV4 } from "uuid";

const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081",
// };

app.use(cors());

app.use(function (err, req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// SOCKET IO
io.on("connection", (socket) => {
  console.log("socket established");
  socket.on("join-room", (userData) => {
    const { roomID, userID } = userData;
    socket.join(roomID);
    socket.to(roomID).broadcast.emit("new-user-connect", userData);
    socket.on("disconnect", () => {
      socket.to(roomID).broadcast.emit("user-disconnected", userID);
    });
    socket.on("broadcast-message", (message) => {
      socket
        .to(roomID)
        .broadcast.emit("new-broadcast-messsage", { ...message, userData });
    });
    // socket.on('reconnect-user', () => {
    //     socket.to(roomID).broadcast.emit('new-user-connect', userData);
    // });
    socket.on("display-media", (value) => {
      socket.to(roomID).broadcast.emit("display-media", { userID, value });
    });
    socket.on("user-video-off", (value) => {
      socket.to(roomID).broadcast.emit("user-video-off", value);
    });
  });
});

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const dbConfig = require("./app/config/db.config");
const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(
    `mongodb+srv://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@erexdb.vmarh.mongodb.net/${dbConfig.BD}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to EreX!" });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/stream.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
