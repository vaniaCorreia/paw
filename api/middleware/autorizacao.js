const jwt = require('express-jwt');
const {secret} = require('.././config.json');
const database = require('.././helper/database');

function autorizacao(tipo = []){
    if(typeof tipo === 'string'){
        tipo = [tipo];
    }

    return [
        // autentica o token JWT e anexa o utilizador ao objeto da solicitação (req.user)
        jwt({secret, algorithms:['HS256']}),

        //autorização baseada no tipo de utilizador
        async(req, res, next) =>{
            const utilizador = await database.Utilizadores.findById(req.user.id);
            if(!utilizador || (tipo.length && !tipo.includes(utilizadortipo))){
                return res.status(401).json({ message: 'Unauthorized' });
            }
            req.user.tipo = utilizador.tipo;
            next();
        }
    ];
}

module.exports = autorizacao;