const express = require("express");
const cripto = require("../cripto");
const router = express.Router();

router.post("/cipher", (req, res) => {
    if (req.body.command == "DES") {
        var secret = cripto.DES.encriptar(req.body.msg, req.body.key);
        var clear = cripto.DES.desencriptar(secret, req.body.key);
        res.render("results.html", {
            crypted: secret,
            decrypted: clear,
        });
        return;
    } else if (req.body.command == "AES") {
        var secret = cripto.AES.encriptar(req.body.msg, req.body.key);
        var clear = cripto.AES.desencriptar(secret, req.body.key);
        res.render("results.html", {
            crypted: secret,
            decrypted: clear,
        });
        return;
    } else {
        res.render("index.html");
        console.log(req.body);
        return;
    }
});

router.get("/", (req, res) => {
    res.render("index.html");
});
module.exports = router;
