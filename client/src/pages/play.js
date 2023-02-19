import { Loader } from "@googlemaps/js-api-loader"

const LOCATIONS = [
  { name: "Eiffel Tower", lat: 48.8584, lng: 2.2945 },
  { name: "Grand Canyon", lat: 36.05444, lng: -112.1401 },
  { name: "Golden Gate", lat: 37.8199, lng: -122.47866935528667 },
  { name: "Big Ben", lat: 51.5007, lng: -0.1246 },
  { name: "La Sagrada Familia", lat: 41.4036, lng: 2.1744 },
]
const scores = []
const baseUrl = process.env.SERVER_BASE_URL

const loader = new Loader({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
  version: "weekly",
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

const initializeGame = async (root, round) => {
  root.innerHTML = ""
  if(round === LOCATIONS.length + 1) {
    const ggMessage = document.createElement('p')
    ggMessage.innerHTML = `Thanks for playing. Your scores: ${scores}`
    root.appendChild(ggMessage)
    return
  }
  else if(round > 1) {
    const scoreMessage = document.createElement('p')
    scoreMessage.innerHTML = scores[round - 2]
    root.appendChild(scoreMessage) 
  }
  const google = await loader.load()
  const mapDiv = appendElWithId("map", root)
  let marker = null
  appendElWithId("pano", root)

  const location = LOCATIONS[round - 1]
  console.log(location)
  const randomStartPoint = { lat: getRandomCoord(), lng: getRandomCoord() }
  const map = new google.maps.Map(document.getElementById("map"), {
    center: randomStartPoint,
    zoom: 5,
  })

  const panorama = new google.maps.StreetViewPanorama(
    document.getElementById("pano"),
    {
      position: location,
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
    const payload = {
      userId: sessionStorage.getItem("userId"),
      actual: location,
      guess: guessPosition,
    }
    fetch(`${baseUrl}/guess`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        const score = `Location: ${LOCATIONS[round - 1]}. Distance: ${res.distance}. Score: ${res.score}`
        scores.push(score)
        initializeGame(root,round + 1)
      })
  })
}

export default initializeGame
