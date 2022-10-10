const cron = require('node-cron');

const apiIBGE = require('./GetApiIBGE');

const sendCountry = async () => {
    const { data } = await apiIBGE.get('/');

    const getData = data.filter(country => country.nome.abreviado === 'Brasil' || country.nome.abreviado === 'Portugal');
    const finalData = getData.map(dado => [{
        nome: dado.nome.abreviado,
        area: dado.area.total + ' km²',
        localizao: dado.localizacao.regiao.nome,
        subRegiao: dado.localizacao["sub-regiao"].nome,
        idioma: lingua = dado.linguas.find(idioma => idioma.nome).nome,
        capital: dado.governo.capital.nome,
        moeda: dado["unidades-monetarias"].find(moeda => moeda.nome).nome,
        historico: dado.historico
      }]);

    console.log(finalData);
    return finalData;
};

/* --- Irá rodar todos os dias, a cada 5 minutos entre às 12:00 e 12:59 --- */

module.exports = cron.schedule('*/5 12 * * *', sendCountry, {
    scheduled: false
});