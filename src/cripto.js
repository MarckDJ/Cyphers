const CryptoJS = require("crypto-js");

var DES =
    DES ||
    (() => {
        var cripto = (msg, key, command) => {
            if (command == true) {
                var secret = CryptoJS.DES.encrypt(msg, key);
                return secret;
            } else {
                var secret = CryptoJS.DES.decrypt(msg, key);
                return secret.toString(CryptoJS.enc.Utf8);
            }
        };
        return {
            encriptar: (msg, key) => {
                return cripto(msg, key, true);
            },
            desencriptar: (msg, key) => {
                return cripto(msg, key, false);
            },
        };
    })();

var AES =
    AES ||
    (() => {
        var cripto = (msg, key, command) => {
            if (command == true) {
                var secret = CryptoJS.AES.encrypt(msg, key);
                return secret;
            } else {
                var secret = CryptoJS.AES.decrypt(msg, key);
                return secret.toString(CryptoJS.enc.Utf8);
            }
        };
        return {
            encriptar: (msg, key) => {
                return cripto(msg, key, true);
            },
            desencriptar: (msg, key) => {
                return cripto(msg, key, false);
            },
        };
    })();

module.exports = {
    DES: DES,
    AES: AES,
};
