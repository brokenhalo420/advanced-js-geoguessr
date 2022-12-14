const sqlite3 = require("sqlite3");
const User = require("../models/user").User;
const Score = require("../models/score").Score;

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
            WHERE Users.id = ?
        `;
        let user;
        this.connection.all(query,[id], (err, rows) => {
            if (err) {
                console.log(err.message);
            };

            user = new User(rows[0]);
        });

        return user;
    }

    getUsers() {
        let query = `
            SELECT *
            FROM Users
        `;

        let users = [];

        this.connection.all(query);
    }

    addUser() {

    }
}

module.exports({DBContext});