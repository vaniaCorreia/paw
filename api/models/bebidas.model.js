const mongoose = require('mongoose');

const bebidaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ["agua", "refrigerante", "cerveja", "vinho", "licor", "outros"]
    },
    preço:{
        type: String,
        required: true,
    }
});

bebidaSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        //remove os parâmetros _id quando o objeto é serializado
        delete ret._id;
    }
});

module.exports = mongoose.model('Bebidas', bebidaSchema);