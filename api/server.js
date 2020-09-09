const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

//Rotas
app.use('/utilizadores', require('./routes/utilizador.route'));

//Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>  console.log('Servidor na porta ' + PORT + '.'));