function validacao(req, next, schema) {
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };

    const {error, value} = schema.validate(req.body, options);
    if(error){
        next(`Erro na validação: ${error.details.map(x => x.message).join(', ')}`);
    }else{
        req.body = value;
        next();
    }
}

module.exports = validacao;