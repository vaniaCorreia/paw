const mongoose = require('mongoose');

const comidachema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ["carne", "peixe", "cmarisco", "ventrada", "sopa", "sobremesa", "acompanhamento"]
    },
    preço:{
        type: String,
        required: true,
    },
    descricao:{
        type: String
    }
});

comidaSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        //remove os parâmetros _id quando o objeto é serializado
        delete ret._id;
    }
});

module.exports = mongoose.model('Comidas', comidaSchema);