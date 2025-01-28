//DEPENDENCIES!
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const port = process.env.PORT;

//MIDDLEWARE
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}!`);
});

const Player = require("./models/player.js");
app.use(express.urlencoded({ extended: false }));
//ROUTES
//INDEX.
app.get("/", async (req, res) => {
    res.render("index.ejs");
});
//NEW.
app.get("/players/new", (req, res) => {
    res.render("players/new.ejs")
});
//DELETE.

//UPDATE.

//CREATE.
app.post("/players", async (req, res) => {
    if (req.body.isActive === 'on') {
        req.body.isActive = true;
    } else {
        req.body.isActive = false;
    }
    await Player.create(req.body);
    res.redirect("/players/new")
});

//SHOW.

//PORT LISTENER

app.listen(port, () => {
    console.log(`Listening on port:`, port)
});