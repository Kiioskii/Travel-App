const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const socket = require("socket.io");
const app = express();
require("dotenv").config();
mongoose.set("strictQuery", false);
app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB is working");
  })
  .catch((err) => {
    console.log("blond z mongo");
    console.log(err);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server working on Port ${process.env.PORT}`);
});

// const io = socket(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     credentials: true,
//   },
// });

// global.onlineUsers = new Map();

// io.on("connection", (socket) => {
//   global.chatSocket = socket;
//   socket.on("add-user", (userId) => {
//     onlineUsers.set(userId, socket.id);
//   });
// });
