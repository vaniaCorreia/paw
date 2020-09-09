const jwt = require('express-jwt');
const {secret} = require('.././config.json');
//const database = require('.././helper/database');

function autorizacao(tipo = []){
    if(typeof tipo === 'string'){
        tipo = [tipo];
    }

    return [
        // autentica o token JWT e anexa o utilizador ao objeto da solicitação (req.user)
        jwt({secret, algorithms:['HS256']}),

        //autorização baseada no tipo de utilizador
        (req, res, next) =>{
            if(tipo.length && !tipo.includes(req.user.tipo)){
                return res.status(401).json({ message: 'Unauthorized' });
            }
            
            next();
        }
    ];
}

module.exports = autorizacao;