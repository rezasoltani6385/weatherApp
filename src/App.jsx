import bg from './assets/background.webp'
import Weather from './components/weather'
import { useState } from 'react'

function App() {
  const [background, setBackground] = useState()

  return(
    <div className={`min-h-screen ${background}`} style={{backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <Weather setBackground={setBackground}/>
    </div>
  )

}

export default App
