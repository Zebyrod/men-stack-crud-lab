//DEPENDENCIES!
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override"); 
const morgan = require("morgan"); 

const port = process.env.PORT;

//MIDDLEWARE
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}!`);
});

const Player = require("./models/player.js");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); 
app.use(morgan("dev")); 

//ROUTES
// HOME PAGE/ LANDING PAGE 
app.get("/", async (req, res) => {
    res.render("home.ejs");
});

//INDEX.
app.get("/players", async (req, res) => {
    const allPlayers = await Player.find();
    res.render("players/index.ejs", { players: allPlayers });
});

//NEW.
app.get("/players/new", (req, res) => {
    res.render("players/new.ejs")
});
//DELETE.

app.delete("/players/:playerId", async (req, res) => {
    await Player.findByIdAndDelete(req.params.playerId);
    res.redirect("/players");
});

//UPDATE.

app.put("/players/:playerId", async (req, res) => {
   if (req.body.isActive === "on") {
    req.body.isActive = true;
   } else {
    req.body.isActive = false;
   }
   // update the player info in the database
   await Player.findByIdAndUpdate(req.params.playerId, req.body);
   // Redirect the user to the players page to show updated information
   res.redirect(`/players/${req.params.playerId}`);
});

//CREATE.
app.post("/players", async (req, res) => {
    if (req.body.isActive === 'on') {
        req.body.isActive = true;
    } else {
        req.body.isActive = false;
    }
    await Player.create(req.body);
    res.redirect("/players/")
});

// EDIT.
app.get("/player/:playerId/edit", async (req, res) => {
   const foundPlayer = await Player.findById(req.params.playerId);
   res.render("players/edit.ejs", { player: foundPlayer });
});

//SHOW.

app.get("/players/:playerId", async (req, res) => {
    const foundPlayer = await Player.findById(req.params.playerId);
    res.render("players/show.ejs", { player: foundPlayer });
});

//PORT LISTENER

app.listen(port, () => {
    console.log(`Listening on port:`, port)
});