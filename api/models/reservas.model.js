const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
    dia: {
        type: String,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    tipo:{
        type: String,
        required: true,
        enum: ["almoço", "jantar"]
    },
    numeroP: {
        type: Number,
        required: true
    }, 
    observacoesU: {
        type: String
    },
    utilizador:{
        type: String,
        required: true
    },
    ementa: {
        type: String
    },
    estado: {
        type: String,
        required: true,
        default: 'pendente'
        //enum: ['pendente', 'ativa', 'confirmada', 'não compareceu', 'cancelada']
    },
    criadoA: {
        type: Date,
        default: Date.now()
    },
    mesa: {
        type: String
    },
    observacoesA: {
        type: String
    },
    atualizadoA: {
        type: Date
    }
});

reservaSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        //remove os parâmetros _id quando o objeto é serializado
        delete ret._id;
        delete ret.criadoA;
    }
});

module.exports = mongoose.model('Reservas', reservaSchema);