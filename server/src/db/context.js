const sqlite3 = require("sqlite3")
const User = require("../models/user").User
const Score = require("../models/score").Score
const initQueries = require("./migrations/innitial")

class DBContext {
  constructor() {
    this.filename = "./src/db/geoguessr.db"
    this.connection = new sqlite3.Database(this.filename, (err) => {
      if (err) {
        console.log("error init", err.message)
      }
    })
    initQueries.forEach((query) => {
      this.connection.run(query)
    })
  }

  getUser(id) {
    let query = `
            SELECT *
            FROM Users
            WHERE id = ?
        `
    return new Promise((resolve, reject) => {
      this.connection.get(query, id, (err, row) => {
        console.log("here")
        if (err) {
          console.log(err.message)
          reject(err)
        }
        const res = new User(row)
        console.log(res)
        resolve(res)
      })
    })
  }

  getUsers() {
    let query = `
            SELECT *
            FROM Users
        `
    return new Promise((resolve, reject) => {
      this.connection.all(query, (err, rows) => {
        if (err) {
          console.log(err.message)
          reject(err)
        }

        let users = rows.map((user) => new User(user))
        resolve(users)
      })
    })
  }

  addUser(user) {
    let query = `
        INSERT INTO Users(username, password)
        VALUES (?,?)
        `

    this.connection.run(query, [user.username, user.password], (err) => {
      if (err) {
        console.log(err.message)
      }
    })
  }

  updateUser(user, id) {
    let query = `
        UPDATE Users
        SET username = ?, password = ?
        WHERE id = ?
        `

    this.connection.run(query, [user.username, user.password, id], (err) => {
      if (err) {
        console.log(err.message)
      }
    })
  }

  deleteUser(id) {
    let query = `
        DELETE FROM Users
        WHERE id = ?
        `

    this.connection.run(query, [id], (err) => {
      if (err) {
        console.log(err.message)
      }
    })
  }

  deleteUsers() {
    const query = `
        DELETE FROM Users
        `

    this.connection.run(query, (err) => {
      if (err) {
        console.log(err.message)
      }
    })
  }

  getScores() {
    const query = "SELECT * FROM Scores;";
    return new Promise((resolve,reject) => {
        this.connection.all(query,(err,rows) => {
            if(err) {
                console.log(err.message)
                reject(err)
            }
            resolve(rows.map((score) => new Score(score)))
        })
    })
  }
  getScoresForUserId(userId) {
    let query = `
        SELECT *
        FROM Scores JOIN Users ON Scores.user_id = Users.id
        WHERE Users.id = ?
        `
    return new Promise((resolve, reject) => {
      this.connection.all(query, userId, (err, rows) => {
        if (err) {
          console.log(err.message)
          reject(err)
        }

        let scores = rows.map((score) => new Score(score))
        resolve(scores)
      })
    })
  }

  addScoreForUserId(score, userId) {
    let query = `
            INSERT INTO Scores(timestamp,points,user_id)
            VALUES(?,?,?)
            `

    this.connection.run(
      query,
      [Date.now(),score, userId],
      (err) => {
        if (err) {
          console.log(err.message)
        }
      }
    )
  }

  deleteScore(scoreId) {
    let query = `
        DELETE FROM Scores
        WHERE id = ?
        `

    this.connection.run(query, scoreId, (err) => {
      if (err) {
        console.log(err.message)
      }
    })
  }
}
module.exports = DBContext
