import bg from './assets/day.gif'
import Weather from './components/weather'
import { useState } from 'react'

function App() {
  const [background, setBackground] = useState(bg)

  return (
    <div className='text-white text-center min-h-screen bg-local bg-cover' style={{backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center',  maxWidth: '450PX', margin: '0 auto',}}>
      <Weather setBackground={setBackground} background={background}/>
    </div>
  )
}

export default App
