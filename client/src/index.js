import { Loader } from '@googlemaps/js-api-loader';
import environment from './env/env-dev';

import '../style.css'

const root = document.getElementById('root')
const loader = new Loader({
  apiKey: environment.GOOGLE_MAPS_API_KEY,
  version: "weekly",
});

let heading = document.createElement('h1')
fetch('http://localhost:8080/api').then(res => res.json()).then(res => {
    heading.textContent = res.message
    root.appendChild(heading)
})

loader
  .load()
  .then((google) => {
    initialize(google)
  })
  .catch(e => {
    // do something
  });

const appendDivWithId = (id,parent) => {
  let child = document.createElement('div')
  child.id = id

  parent.appendChild(child)
}

const getRandomCoord = () => {
  return (Math.random()  * 180) - 90
}

const initialize = (google) => {
  appendDivWithId('map',root)
  appendDivWithId('pano',root)

  const eiffelTower = { lat: 48.8584, lng: 2.2945 };
  const randomStartPoint = {lat: getRandomCoord(), lng: getRandomCoord()}
  const map = new google.maps.Map(document.getElementById("map"), {
    center: randomStartPoint,
    zoom: 5,
  });

  const panorama = new google.maps.StreetViewPanorama(
    document.getElementById("pano"),
    {
      position: eiffelTower,
      pov: {
        heading: 34,
        pitch: 10,
      },
      addressControl: false
    }
  );

}
