const moment = require('moment');
const connection = require('../infraestrutura/connection');

class Atendimento {
    add(atendimento){
        const creationDate = moment().format('YYYY-MM-DD HH:MM:SS');
        const date = moment(atendimento.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        const atendimentoDate = {...atendimento, creationDate, date}
        const sql = 'INSERT INTO Atendimentos SET ?'

        connection.query(sql, atendimentoDate, (err, result) =>{
            if(err){
                console.log(err)
            }else{
                console.log(result);
            }
        })
    }
}

module.exports = new Atendimento;