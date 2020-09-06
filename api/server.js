require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_CONN, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

//Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>  console.log('Servidor na porta ' + PORT + '.'));