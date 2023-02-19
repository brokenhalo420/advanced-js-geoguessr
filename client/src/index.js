import "../style.css"
import initializeLogin from "./pages/login"

const root = document.getElementById("root")

const baseUrl = process.env.SERVER_BASE_URL
let heading = document.createElement("h1")
fetch(baseUrl)
  .then((res) => res.json())
  .then((res) => {
    heading.textContent = res.message
    root.appendChild(heading)
  })
  initializeLogin(root)
//initialize(root)
