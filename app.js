// const express = require("express");
// const path = require("path");
// const app = express();
// const dotenv = require("dotenv");
// const getAllRooms = require("./Hotel_Root/routes/index");
// const addRoom = require("./Hotel_Root/routes/index");
// // app.use(express.json);
// app.set("view engine", "pug");
// app.set("views", path.join(__dirname, "views"));
// app.get("/login", (req, res) => {
//   res.status(200).json({
//     message: "hi",
//   });
// });
// app.get("/signup", (req, res) => {
//   res.status(200).send("SIGNUP PAGE");
// });
// app.route("/rooms").get(getAllRooms).post(addRoom);
// module.exports = app;

const express = require("express");
const mongoose = require("mongoose");
// const port = 80;
const app = express();
mongoose.connect("mongodb://localhost:27017", {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});
let db = mongoose.connection;
app.use(express.json());
// For serving static HTML files
app.use(express.static("Hotel_Root/public"));
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.set({
    "Allow-access-Allow-Origin": "*",
  });
  // res.send("Hello World");
  return res.redirect("index.html");
});
app.post("/formFillUp", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;
  const city = req.body.city;
  const state = req.body.state;
  const address = req.body.address;
  const data = {
    name: name,
    email: email,
    password: password,
    phone: phone,
    city: city,
    address: address,
    state: state,
  };
  db.collection("users").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Data inserted successfully!");
  });
  return res.redirect("formSubmitted.html");
});
// app.listen(port, () => {
//   console.log(`The application started
// successfully on port ${port}`);
// });
app.get("/login", (req, res) => {
  res.set({
    "Allow-access-Allow-Origin": "*",
  });
  // res.send("Hello World");
  return res.redirect("login.html");
});
app.post("/loginForm", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Assuming 'db' is the MongoDB client instance
  // and 'users' is the collection you want to query

  // Find a user with the specified email and password
  db.collection("users").findOne(
    { email: email, password: password },
    (err, user) => {
      if (err) {
        console.error("Error finding user:", err);
        return res.status(500).send("Internal Server Error");
      }
      if (user) {
        // User found, redirect to home.html
        console.log(email, password);
        return res.redirect("home.html");
      } else {
        // User not found
        return res.redirect("index.html");
      }
    }
  );
});
//BOOKING PAGE
app.get("/home", (req, res) => {
  res.set({
    "Allow-access-Allow-Origin": "*",
  });
  // res.send("Hello World");
  return res.redirect("home.html");
});
app.post("/booking", (req, res) => {
  const checkIn = req.body.checkIn;
  const checkOut = req.body.checkOut;
  const email = req.body.email;
  const phone = req.body.phone;
  const no_rooms = req.body.no_rooms;
  const members = req.body.members;
  const type = req.body.type;
  const data1 = {
    checkIn: checkIn,
    checkOut: checkOut,
    email: email,
    phone: phone,
    no_of_rooms: no_rooms,
    members: members,
    type: type,
  };
  db.collection("booking_details").insertOne(data1, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Data inserted successfully!");
  });
  return res.redirect("bookingSubmitted.html");
});
module.exports = app;
