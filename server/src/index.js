const express = require("express")
const DBContext = require("./db/context")
const getScoreFromDistance = require("./utils")
const getDistance = (p1, p2) => {
  return Math.sqrt(Math.pow(p1.lat - p2.lat, 2) + Math.pow(p1.lng - p2.lng, 2))
}

// game mode
const app = express()

app.use(express.json())
const db = new DBContext()

db.getUsers().then(users => {
  if(users.length === 0) {
    db.addUser({
      username: "test",
      password: "1234",
    })
  }
}) 



app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  )
  next()
})

app.get("/api", (_req, res) => {
  res.send({ message: "HELLO FROM BACKEND!" })
})

app.post("/api/guess", (req, res) => {
  const { userId, guess, actual } = req.body
  const distance = getDistance(actual, guess)
  // ideas for evaluating diff:
  // < 0.05 is excellent
  // < 0.2 is ok
  // < 1 is meh
  // > 5 is bad
  res.send({distance, score: getScoreFromDistance(distance)})
  db.addScoreForUserId(distance, userId)
  db.getUsers().then((res) => console.log('users: ' , res))
  db.getScores().then((res) => console.log(res))
})

app.post("/api/login", (req, res) => {
  const { userName, password } = req.body
  const user = db.getUsers().then((users) => {
    const user = users.find(
      (user) => user.userName === userName && user.password === password
    )
    if (!user) {
      res.status = 403
      res.send({message: "Wrong username or password"})
    } else {
      res.status = 200
      res.send({userId: user.id})
    }
  })
})

app.listen(8080, () => {
  console.log("Server is listening on :8080")
})
