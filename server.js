const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const items = require("./routes/api/items");

const app = express();

//bodyparser middleware
app.use(bodyParser.json());

//database config
const db = require("./config/keys").mongoURI;

//connecting to MOngo

// mongoose
//   .connect(db)
//   .then(() => console.log("mongodb connected"))
//   .catch(err => console.log(err));
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));

//use routes
app.use("/api/items", items);

//serve static assests
if (process.env.NODE_ENV === "production") {
  //set a static foldder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
