const customExpress = require('./config/customExpress');
const connection = require('./infraestrutura/connection');
const Tables = require('./infraestrutura/tables')

connection.connect(err => {
    if(err) {
        console.log(err);
    }else{

        Tables.init(connection);
        const app = customExpress();
        app.listen(3000, () => console.log('servidor escutando na porta 3000'));
    }
})
