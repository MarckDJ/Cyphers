const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");

app.set("port", process.env.PORT || 8080);
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.set("views", path.join(__dirname, "views"));

app.use(morgan("dev"));

app.use(require("./routes/routes"));

app.listen(app.get("port"), () => {
    console.log("Server on port", app.get("port"));
});
