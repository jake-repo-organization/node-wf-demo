const axios = require("axios");
const auth = require("./veracode_hmac");

const apiUrl = "https://" + auth.getHost() + "/api/authn/v2/principal";

const headers = {
    "Authorization": auth.generateHeader("/api/authn/v2/principal", "GET")
};

axios.get(apiUrl, { headers })
    .then((response) => {
        console.log(`Endpoint: ${apiUrl}`);
        console.log(response.data);
    })
    .catch((error) => {
        console.error(error);
    });
