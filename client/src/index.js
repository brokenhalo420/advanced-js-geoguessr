import { Loader } from "@googlemaps/js-api-loader"

import "../style.css"

const root = document.getElementById("root")
const loader = new Loader({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
  version: "weekly",
})

const baseUrl = process.env.SERVER_BASE_URL
let heading = document.createElement("h1")
fetch(baseUrl)
  .then((res) => res.json())
  .then((res) => {
    heading.textContent = res.message
    root.appendChild(heading)
  })

loader
  .load()
  .then((google) => {
    initialize(google)
  })
  .catch((e) => {
    // do something
  })

const appendElWithId = (id, parent, el) => {
  const element = el ?? "div"
  let child = document.createElement(element)
  child.id = id

  parent.appendChild(child)
  return child
}

const getRandomCoord = () => {
  return Math.random() * 180 - 90
}

const initialize = (google) => {
  const mapDiv = appendElWithId("map", root)
  let marker = null
  appendElWithId("pano", root)

  const eiffelTower = { lat: 48.8584, lng: 2.2945 }
  const randomStartPoint = { lat: getRandomCoord(), lng: getRandomCoord() }
  const map = new google.maps.Map(document.getElementById("map"), {
    center: randomStartPoint,
    zoom: 5,
  })

  const panorama = new google.maps.StreetViewPanorama(
    document.getElementById("pano"),
    {
      position: eiffelTower,
      pov: {
        heading: 34,
        pitch: 10,
      },
      addressControl: false,
    }
  )

  map.addListener("click", (mapsMouseEvent) => {
    if (!!marker) {
      marker.setMap(null)
      marker = null
    }
    marker = new google.maps.Marker({
      position: mapsMouseEvent.latLng,
      map: map,
    })
    submitButton.removeAttribute("disabled")
  })

  const submitButton = appendElWithId("submit-btn", root, "button")

  if (!marker) {
    submitButton.setAttribute("disabled", true)
  }

  submitButton.innerHTML = "Submit guess"

  submitButton.addEventListener("click", (e) => {
    if (!marker) {
      return
    }

    const guessPosition = {
      lat: marker.getPosition().lat(),
      lng: marker.getPosition().lng(),
    }
    const payload = { userId: 1, actual: eiffelTower, guess: guessPosition }
    fetch(`${baseUrl}/guess`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
  })
}
