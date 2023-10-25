import bg from './assets/bg.webp'
import bgNight from './assets/bg-night.webp'
import Weather from './components/weather'
import { useState } from 'react'

function App() {
  const [background, setBackground] = useState(bg)

  return (
    <div className='bg-blue-400 text-white text-center min-h-screen bg-local bg-cover' style={{backgroundImage: `url(${background})`}}>
      <Weather setBackground={setBackground} background={background}/>
    </div>
  )
}

export default App
