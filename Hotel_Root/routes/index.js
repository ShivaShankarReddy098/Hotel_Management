const express = require("express");
const fs = require("fs");
const router = express.Router();
const app = new express();
const rooms = require("./detail.json");
const getAllRooms = (req, res) => {
  res.status(200).json({
    status: "sucess",
    rooms,
    length: rooms.length,
  });
};
const addRoom = (req, res) => {
  const newId = rooms.length - 1 + 1;
  const newRoom = Object.assign({ id: newId }, req.body);

  rooms.push(newRoom);

  fs.writeFile("detail.json", JSON.stringify(rooms), (err) => {
    if (err) {
      res.send(err);
    }
    res.status(201).json({
      status: "success",
      rooms,
    });
  });
};
module.exports = getAllRooms;
module.exports = addRoom;
