const path = require("path");
const express = require("express");
const port = process.env.PORT || 3001;
const app = express();
const ejsLayouts = require("express-ejs-layouts");
const auth = require("./routes/auth")
const cors = require('cors');

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false })); //Allows data from forms to be extracted
app.use(ejsLayouts);
app.set("view engine", "ejs");

//Middlware
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("i am alive.");
})

app.use("/auth", auth)

app.listen(port, () => {
  console.log(`🚀 Server has started at http://localhost:${port}`);
});