const express = require("express");
const cripto = require("../cripto");
const router = express.Router();

router.get("/", (req, res) => {
    var secret = cripto.DES.encriptar(
        "saludos desde marte",
        "asdfghjklñqwerty"
    );
    var clear = cripto.DES.desencriptar(secret, "asdfghjklñqwerty");
    console.log(secret, clear);
    res.render("index.html", {
        crypted: secret,
        decrypted: clear,
    });
});

module.exports = router;
