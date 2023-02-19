const express = require("express")

const DBContext = require("./db/context")
const { getDistance, getScoreFromDistance } = require("./utils")

// game mode
const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:9000",
    methods: ["GET", "POST"],
  },
})

app.use(express.json())
const db = new DBContext()

db.getUsers().then((users) => {
  if (users.length === 0) {
    db.addUser({
      username: "test",
      password: "1234",
    })
  }
})

const happyHourStart = 1000 * 10

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
  const { userId, guess, actual, scoreModifier } = req.body
  const distance = getDistance(actual, guess)

  res.send({ distance, score: getScoreFromDistance(distance, scoreModifier) })
  db.addScoreForUserId(distance, userId)
  db.getUsers().then((res) => console.log("users: ", res))
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
      res.send({ message: "Wrong username or password" })
    } else {
      res.status = 200
      res.send({ userId: user.id })
    }
  })
})

io.on("connection", (socket) => {
  console.log("connected")
  console.log("initaiting happy hour")
  setTimeout(() => {
    io.send("Happy hour started! Scores are doubled!")
  }, happyHourStart)
})
server.listen(8080, () => {
  console.log("Server is listening on :8080")
})
