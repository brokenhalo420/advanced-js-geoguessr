const express = require("express")

const getDistance = (p1, p2) => {
  return Math.sqrt(Math.pow(p1.lat - p2.lat, 2) + Math.pow(p1.lng - p2.lng, 2))
}

// game mode
const app = express()

app.use(express.json())
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
  const { guess, actual } = req.body
  const distance = getDistance(actual, guess)
  // ideas for evaluating diff:
  // < 0.05 is excellent
  // < 0.2 is ok
  // < 1 is meh
  // > 5 is bad
  res.send({ distance })
})
app.listen(8080, () => {
  console.log("Server is listening on :8080")
})
