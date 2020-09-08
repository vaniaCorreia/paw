const mongoose = require('mongoose');

const utilizadorSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        max: 255
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        min: 6
    },
    nif: {
        type: Number,
        required: true,
        unique: true,
        min: 9
    }, 
    contacto: {
        type: Number,
        required: true,
        min: 9
    },
    tipo:{
        type: String,
        required: true,
        default: 'Utilizador'
    }
});

utilizadorSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        //remove os parâmetros _id e password quando o objeto é serializado
        delete ret._id;
        delete ret.password;
    }
});

module.exports = mongoose.model('Utilizador', utilizadorSchema);