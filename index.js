const axios = require('axios');

const endpointUrl = 'https://pokeapi.co/api/v2/pokemon/mew';

async function restfulCall() {
    try {
        const response = await axios.get(endpointUrl);
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error.message || error);
    }
}

restfulCall();
