const express = require("express");
const { AES } = require("../cripto");
const cripto = require("../cripto");
const router = express.Router();

router.post("/cipher", (req, res) => {
    if (req.body.cipher == "DES") {
        if (req.body.command == "enc") {
            var out = cripto.DES.encriptar(req.body.msg, req.body.key);
            res.render("results.html", {
                msg: out,
            });
            return;
        } else if (req.body.command == "dec") {
            var out = cripto.DES.desencriptar(req.body.msg, req.body.key);
            res.render("results.html", {
                msg: out,
            });
            return;
        } else {
            res.redirect("/");
            console.log(req.body.command);
            return;
        }
    } else if (req.body.cipher == "AES") {
        if (req.body.command == "enc") {
            var out = cripto.AES.encriptar(req.body.msg, req.body.key);
            console.log(out);
            res.render("results.html", {
                msg: out,
            });
            return;
        } else if (req.body.command == "dec") {
            var out = cripto.AES.desencriptar(req.body.msg, req.body.key);
            res.render("results.html", {
                msg: out,
            });
            return;
        } else {
            res.redirect("/");
            console.log(req.body.command);
            return;
        }
    } else {
        res.redirect("/");
        return;
    }
});

router.get("/", (req, res) => {
    res.render("index.html");
    return;
});
module.exports = router;
