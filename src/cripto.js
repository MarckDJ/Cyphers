const CryptoJS = require("crypto-js");

var DES =
    DES ||
    (() => {
        var cripto = (msg, key, command) => {
            if (command == true) {
                var msgWordArrray = CryptoJS.lib.WordArray.create(msg); // Convert: ArrayBuffer -> WordArray
                var encrypted = CryptoJS.DES.encrypt(
                    msgWordArrray,
                    key
                ).toString(); // Encryption: I: WordArray -> O: -> Base64 encoded string (OpenSSL-format)
                return encrypted;
            } else {
                var secret = CryptoJS.DES.decrypt(msg, key);
                var typedArray = CryptJsWordArrayToUint8Array(secret);
                var clear = uintToString(typedArray);
                return clear;
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
                var msgWordArrray = CryptoJS.lib.WordArray.create(msg);
                var encrypted = CryptoJS.AES.encrypt(
                    msgWordArrray,
                    key
                ).toString();
                return encrypted;
            } else {
                var secret = CryptoJS.AES.decrypt(msg, key);
                var typedArray = CryptJsWordArrayToUint8Array(secret);
                var clear = uintToString(typedArray);
                return clear;
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

function CryptJsWordArrayToUint8Array(wordArray) {
    const l = wordArray.sigBytes;
    const words = wordArray.words;
    const result = new Uint8Array(l);
    var i = 0 /*dst*/,
        j = 0; /*src*/
    while (true) {
        // here i is a multiple of 4
        if (i == l) break;
        var w = words[j++];
        result[i++] = (w & 0xff000000) >>> 24;
        if (i == l) break;
        result[i++] = (w & 0x00ff0000) >>> 16;
        if (i == l) break;
        result[i++] = (w & 0x0000ff00) >>> 8;
        if (i == l) break;
        result[i++] = w & 0x000000ff;
    }
    return result;
}
function uintToString(uintArray) {
    let TYPED_ARRAY = new Uint8Array(uintArray);
    const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
        return data + String.fromCharCode(byte);
    }, "");
    return STRING_CHAR;
}
