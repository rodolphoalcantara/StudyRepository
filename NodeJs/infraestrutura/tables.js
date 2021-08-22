class Tables {
    init(connection){
        this.connection = connection;
        this.createAtendimento();
    }

    createAtendimento(){
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, client varchar(50) NOT NULL, pet varchar(20), service varchar(20) NOT NULL, date datetime NOT NULL, creationDate datetime NOT NULL, status varchar(20) NOT NULL, comments text, PRIMARY KEY(id))'

        this.connection.query(sql, err =>{
            if(err){
                console.log(err);
            }
        })
    }
}

module.exports = new Tables;