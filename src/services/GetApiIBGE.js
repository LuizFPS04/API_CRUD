const axios = require('axios');

const apiIBGE = axios.create({
    baseURL: "https://servicodados.ibge.gov.br/api/v1/paises"
});

module.exports = apiIBGE;