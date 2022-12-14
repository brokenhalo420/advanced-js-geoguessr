const sqlite3 = require("sqlite3");

class DBContext {
    constructor(){
        this.filename = "./db/geoguessr.db"
        this.connection = new sqlite3.Database(this.filename,sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.log(err.message);
            };
        })
    }

    getUser(id){
        let query = `
            SELECT *
            FROM Users
            WHERE Users.id == ${id}
        `;

        this.connection.run(query);
    }

    getUsers() {
        let query = `
            SELECT *
            FROM Users
        `;

        this.connection.run(query);
    }
}

module.exports({DBContext});