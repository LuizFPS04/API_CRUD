const express = require('express');
const bodyParser = require('body-parser');

const dateNow = new Date();

const userRoute = require('./routes/userRoutes');
const productRoute = require('./routes/productRoutes');
const ManagerCron = require('./manage-cron');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

let hour = dateNow.getHours();
let minutes = dateNow.getMinutes();

app.get('/', (req, res) => {
    res.send('Servidor ONLINE e ROTEANDO na porta 5000, às ' + hour + ':' + minutes + '...');
});

userRoute(app);
productRoute(app);


app.listen(5000, () => {
    console.log('Servidor ONLINE na porta 5000, às ' + hour + ':' + minutes + '...');

    ManagerCron.run();
});