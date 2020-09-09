const mongoose = require('mongoose');

const mesaSchema = new mongoose.Schema({
    numero: {
        type: String,
        required: true
    },
    capacidade: {
        type: String,
        required: true
    },
    tempo:{
        type: String,
        required: true
    }
});

mesaSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        //remove os parâmetros _id quando o objeto é serializado
        delete ret._id;
    }
});

module.exports = mongoose.model('Mesas', mesaSchema);