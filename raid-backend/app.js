const path = require("path");
const express = require("express");
const port = process.env.PORT || 3001;
const app = express();
const bodyParser = require("body-parser")
const ejsLayouts = require("express-ejs-layouts");
const passport = require("passport")
const session = require("express-session");
const auth = require("./routes/auth")
const cors = require('cors');

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.set("view engine", "ejs");
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 600000,
    },
  })
);

//Middlware
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.get("/", (req, res) => {
  res.send("i am alive.");
})
app.get("/errorMock", (req, res) => {
  res.send("failed login.");
})

app.get("/successMock", (req, res) => {
  res.send("sucesss login.");
})

app.use("/auth", auth)

app.listen(port, () => {
  console.log(`🚀 Server has started at http://localhost:${port}`);
});