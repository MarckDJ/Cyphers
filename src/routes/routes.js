const express = require("express");
const cripto = require("../cripto");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + ".txt");
    },
});
const upload = multer({ dest: "uploads/", storage: storage });

const fs = require("fs");

router.post("/cipher", upload.single("document"), (req, res) => {
    if (typeof req.file == "undefined" || req.body.key == ("" || undefined)) {
        res.render("results.html", {
            wrn: "No deje campos vacios",
        });
        return;
    } else if (!req.file.filename.endsWith(".txt" || ".TXT")) {
        res.render("results.html", {
            wrn: "Actualmente solo se aceptan archivos de tipo 'txt'",
        });
        return;
    }
    if (req.body.cipher == "DES") {
        if (String(req.body.key).length < 8) {
            res.render("results.html", {
                wrn:
                    "El tamaño de la clave es muy pequeño, use solo 8 caracteres",
            });
            return;
        }
        if (String(req.body.key).length > 8) {
            res.render("results.html", {
                wrn:
                    "El tamaño de la clave es muy grande, use solo 8 caracteres",
            });
            return;
        }
        if (req.body.command == "enc") {
            let data = fs.readFile(req.file.path, function read(err, data) {
                if (err) {
                    throw err;
                }
                var out = cripto.DES.encriptar(data.buffer, req.body.key);
                res.render("results.html", {
                    msg: out,
                    name: req.file.originalname,
                    op: "_enc",
                });
            });
            return;
        } else if (req.body.command == "dec") {
            let data = fs.readFile(req.file.path, "utf8", function read(
                err,
                data
            ) {
                if (err) {
                    throw err;
                }
                const content = data;

                var out = cripto.DES.desencriptar(content, req.body.key);
                res.render("results.html", {
                    msg: out,
                    name: req.file.originalname,
                    op: "_dec",
                });
            });
            return;
        } else {
            res.redirect("/");
            console.log(req.body.command);
            return;
        }
    } else if (req.body.cipher == "AES") {
        if (
            String(req.body.key).length == 16 ||
            String(req.body.key).length == 24 ||
            String(req.body.key).length == 32
        ) {
            if (req.body.command == "enc") {
                let data = fs.readFile(req.file.path, function read(err, data) {
                    if (err) {
                        throw err;
                    }
                    var out = cripto.AES.encriptar(data.buffer, req.body.key);
                    res.render("results.html", {
                        msg: out,
                        name: req.file.originalname,
                        op: "_enc",
                    });
                });
                return;
            } else if (req.body.command == "dec") {
                let data = fs.readFile(req.file.path, "utf8", function read(
                    err,
                    data
                ) {
                    if (err) {
                        throw err;
                    }
                    const content = data;
                    var out = cripto.AES.desencriptar(content, req.body.key);
                    res.render("results.html", {
                        msg: out,
                        name: req.file.originalname,
                        op: "_dec",
                    });
                });
                return;
            } else {
                res.redirect("/");
                console.log(req.body.command);
                return;
            }
        } else {
            res.render("results.html", {
                wrn:
                    "El tamaño de la clave no es valido, use solo 16, 24, o 32 caracteres",
            });
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
