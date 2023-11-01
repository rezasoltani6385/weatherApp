import bg from './assets/background.webp'
import Weather from './components/weather'
import { useState } from 'react'

function App() {
  const [background, setBackground] = useState()
  const [geolocation, setGeolocation] = useState({lat: '', lon: ''})

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("Geolocation not supported");
  }
  
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }
  
  function error() {
    console.log("Unable to retrieve your location");
  }

  return(
    <div className={`min-h-screen ${background}`} style={{backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <Weather setBackground={setBackground}/>
    </div>
  )

}

export default App
