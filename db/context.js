const sqlite3 = require("sqlite3");
const User = require("../models/user").User;
const Score = require("../models/score").Score;

class DBContext {
    constructor() {
        this.filename = "./db/geoguessr.db"
        this.connection = new sqlite3.Database(this.filename, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.log(err.message);
            };
        })
    }

    getUser(id) {
        let query = `
            SELECT *
            FROM Users
            WHERE user_id = ?
        `;
        return new Promise((resolve, reject) => {
            this.connection.get(query, [id], (err, row) => {
                if (err) {
                    console.log(err.message);
                    reject(err);
                };

                resolve(new User(row));
            });
        });
    }

    getUsers() {
        let query = `
            SELECT *
            FROM Users
        `;
        return new Promise((resolve, reject) => {
            this.connection.all(query, (err, rows) => {
                if (err) {
                    console.log(err.message);
                    reject(err);
                };

                let users = rows.map(user => new User(user));
                resolve(users);
            });

        })
    }

    addUser(user) {
        let query = `
        INSERT INTO Users(username, email, password, name)
        VALUES (?,?,?,?)
        `;

        this.connection.run(query, [user.username, user.email, user.password, user.name], (err) => {
            if (err) {
                console.log(err.message);
            }
        });
    }

    updateUser(user, id) {
        let query = `
        UPDATE Users
        SET username = ?, email = ?, password = ?, name = ?
        WHERE user_id = ?
        `;

        this.connection.run(query, [user.username, user.email, user.password, user.name, id], (err) => {
            if (err) {
                console.log(err.message);
            };
        })
    }

    deleteUser(username) {
        let query = `
        DELETE FROM Users
        WHERE username = ?
        `;

        this.connection.run(query, [username], (err) => {
            if (err) {
                console.log(err.message);
            };
        })
    }


    getScoresForUser(username) {
        let query = `
        SELECT Scores.timestamp, Scores.points
        FROM Scores JOIN Users ON Scores.user_id = Users.user_id
        WHERE Users.username = ?
        `;
        return new Promise((resolve, reject) => {
            this.connection.all(query, username, (err, rows) => {
                if (err) {
                    console.log(err.message);
                    reject(err);
                };

                let scores = rows.map(score => new Score(score));
                resolve(scores);
            })
        })
    }

    addScoreForUser(score, username) {
        let userQuery = `
        SELECT user_id
        FROM Users
        WHERE username LIKE ?
        `;

        let id;
        this.connection.get(userQuery, username, (err, row) => {
            if (err) {
                console.log(err.message);
            };

            id = Number(row.user_id);
            let query = `
            INSERT INTO Scores(timestamp,points,user_id)
            VALUES(?,?,?)
            `;

            this.connection.run(query, [score.timestamp, score.points, id], (err) => {
                if (err) {
                    console.log(err.message);
                };
            });
        });
    }

    deleteScore(timestamp, username) {
        let query = `
        DELETE FROM Scores
        WHERE timestamp = ? AND user_id = (SELECT user_id FROM Users WHERE username = ?)
        `;

        this.connection.run(query, [timestamp, username], (err) => {
            if (err) {
                console.log(err.message);
            };
        });
    }
}
module.exports = { DBContext };