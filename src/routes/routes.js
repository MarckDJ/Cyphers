const express = require("express");
const cripto = require("../cripto");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index.html", {
        title: cripto.default.encript("saludos desde marte"),
    });
});

module.exports = router;
