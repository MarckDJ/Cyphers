const CryptoJS = require("crypto-js");

var DES =
    DES ||
    (() => {
        var cripto = ((msg, key, command) => {
            if (command) {
                return CryptoJS.DES.encrypt(msg, key);
            } else {
                return CryptoJS.DES.decrypt(msg, key);
            }
        })();
        return {
            encript: (msg, key) => {
                return cripto(msg, key, true);
            },
            decrypt: (msg, key) => {
                return cripto(msg, key, false);
            },
        };
    })();

export default DES;
