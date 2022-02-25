var express = require("express");
var mongoose = require("mongoose");

var app = express();
var PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes"));

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://chelsieuser:chelsiepassword@cluster0.vw7fo.mongodb.net/the-social-platform?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set("debug", true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));