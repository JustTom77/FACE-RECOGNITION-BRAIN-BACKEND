const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const { response } = require("express");
const register = require("./controllers/register");
const signIn = require("./controllers/signIn");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  // Enter your own database information here based on what you created
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "test",
    database: "smart_brain",
  },
});

db.select("*")
  .from("users")
  .then(data => {
    console.log(data);
  });

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send('success');
});

app.post("/signin", (req,res) => {signIn.handleSignIn(req, res, db, bcrypt)});
app.post("/register",(req,res) => {register.handleRegister(req, res, db, bcrypt)} );
app.get("/profile/:id", (req, res) => {profile.handleProfile(req,res,db)});
app.put("/image", (req, res) => {image.handleImage(req, res, db)});
app.post("/imageurl", (req, res) => {image.handleApiCall(req, res)});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
