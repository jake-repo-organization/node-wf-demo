const url = require('url');
const crypto = require('crypto');

const id = process.env.API_ID || "";
const key = process.env.API_KEY || "";

if (!id) {
    console.error("No API_ID was found!")
}

if (!key) {
    console.error("No API_KEY was found!")
}

const authorizationScheme = 'VERACODE-HMAC-SHA-256';
const requestVersion = "vcode_request_version_1";
const nonceSize = 16;

function computeHashHex(message, key_hex) {
    const hmac = crypto.createHmac('sha256', Buffer.from(key_hex, 'hex'));
    hmac.update(message);
    return hmac.digest('hex');
}

function calculateDataSignature(key, nonceBytes, dateStamp, data) {
    const kNonce = computeHashHex(nonceBytes, key);
    const kDate = computeHashHex(dateStamp, kNonce);
    const kSig = computeHashHex(requestVersion, kDate);
    return computeHashHex(data, kSig);
}

function newNonce() {
    return crypto.randomBytes(nonceSize).toString('hex').toUpperCase();
}

function toHexBinary(input) {
    return Buffer.from(input, 'utf8').toString('hex');
}

function calculateVeracodeAuthHeader(httpMethod, requestUrl) {
    const parsedUrl = url.parse(requestUrl);
    const data = `id=${id}&host=${parsedUrl.hostname}&url=${parsedUrl.path}&method=${httpMethod}`;
    const dateStamp = Date.now().toString();
    const nonceBytes = newNonce(nonceSize);
    const dataSignature = calculateDataSignature(key, nonceBytes, dateStamp, data);
    const authorizationParam = `id=${id},ts=${dateStamp},nonce=${toHexBinary(nonceBytes)},sig=${dataSignature}`;
    return authorizationScheme + " " + authorizationParam;
}

// Assuming 'request' and 'pm' are defined elsewhere in your code
// const substitutedUrl = request.url; // Replace with your own logic for handling substitutions
// const hmacAuthHeader = calculateVeracodeAuthHeader(request.method, substitutedUrl);
// console.log('HMAC Auth Header:', hmacAuthHeader);
