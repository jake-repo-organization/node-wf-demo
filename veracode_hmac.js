// https://gist.githubusercontent.com/mrpinghe/f44479f2270ea36bf3b7cc958cc76cc0/raw/47d255303b2221c83c144a090f1295c23fb27308/auth.js
const crypto = require('crypto');

const id = process.env.API_ID; // your API ID, reading from environment variable
const key = process.env.API_KEY; // your API key, reading from environment variable

if (!id) {
    console.error("No API_ID was found!")
}

if (!key) {
    console.error("No API_KEY was found!")
}

const preFix = "VERACODE-HMAC-SHA-256";
const verStr = "vcode_request_version_1";

const resthost = "api.veracode.com"; // rest host
const xmlhost = "analysiscenter.veracode.com"; // xml host

const hmac256 = (data, key, format) => {
    const hash = crypto.createHmac('sha256', key).update(data);
    // no format = Buffer / byte array
    return hash.digest(format);
}

const getByteArray = (hex) => {
    const bytes = [];

    for(let i = 0; i < hex.length-1; i+=2){
        bytes.push(parseInt(hex.substr(i, 2), 16));
    }

    // signed 8-bit integer array (byte array)
    return Int8Array.from(bytes);
}

const getHost = (xml) => {
    return xml ? xmlhost : resthost;
}

const generateHeader = (url, method, xml) => {

    const host = getHost(xml);

    const data = `id=${id}&host=${host}&url=${url}&method=${method}`;
    const timestamp = (new Date().getTime()).toString();
    const nonce = crypto.randomBytes(16).toString("hex");

    // calculate signature
    const hashedNonce = hmac256(getByteArray(nonce), getByteArray(key));
    const hashedTimestamp = hmac256(timestamp, hashedNonce);
    const hashedVerStr = hmac256(verStr, hashedTimestamp);
    const signature = hmac256(data, hashedVerStr, 'hex');

    return `${preFix} id=${id},ts=${timestamp},nonce=${nonce},sig=${signature}`;
}

module.exports = {
    getHost,
    generateHeader
}
