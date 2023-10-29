import React, { useEffect, useState } from 'react'
import bg from '../assets/day.gif'
import {WiStrongWind, WiHumidity, WiSunrise, WiSunset} from 'react-icons/wi'
import {FiSettings, FiEdit} from 'react-icons/fi'
import { httpService } from '../core/http-service'
import timeStammConverter from '../core/timestampConverter'
import Modal from './modal'
import ClockComponent from './clock'

function Weather({setBackground, background}) {
  const [city, setCity] = useState('Tehran')
  const [temp, setTemp] = useState('')
  const [lastUpdate, setLastUpdate] = useState()
  const [icon, setIcon] = useState('')
  const [unit, setUnit] = useState('Metric')
  const [weatherMain, setWeatherMain] = useState('')
  const [weaterDesc, setWeatherDesc] = useState('')
  const [tempMin, setTempMin] = useState('')
  const [tempMax, setTempMax] = useState('')
  const [feelsLike, setFeelsLike] = useState('')
  const [humidity, setHumidity] = useState('')
  const [wind, setWind] = useState('')
  const [sunrise, setSunrise] = useState()
  const [sunset, setSunset] = useState()
  const [timezone, setTimezone] = useState(0)
  const [threeHours, setThreeHours] = useState()
  const [modal, setModal] = useState(false)
  const [message, setMessage] = useState('You can select any city you want and also change the unit.')



  useEffect(()=>{
    const getCurrentData = async ()=> {
      try{
        const response = await httpService.get('/weather', {params: {q: city, units: unit}})
        if (response.data.cod === 200){
          setCity(response.data.name)
          setTemp(response.data.main.temp)
          setLastUpdate(response.data.dt)
          setIcon(response.data.weather[0].icon)
          setWeatherMain(response.data.weather[0].main)
          setWeatherDesc(response.data.weather[0].description)
          setTempMin(response.data.main.temp_min)
          setTempMax(response.data.main.temp_max)
          setFeelsLike(response.data.main.feels_like)
          setHumidity(response.data.main.humidity)
          setWind(response.data.wind.speed)
          setSunrise(response.data.sys.sunrise)
          setSunset(response.data.sys.sunset)
          setTimezone(response.data.timezone)
          setModal(false)
        }
        else {
          setMessage('City Not Found')
          setModal(true)
        }
      }
      catch{
        setMessage('Please select a right city name')
        setModal(true)
      }
    }

    const get3hrsData = async ()=> {
      try{
        const response = await httpService.get('/forecast', { params: { q: city, units: unit}})
  
        const extractedData = response.data.list.map(item => ({
          dt: item.dt,
          temp: item.main.temp,
          humidity: item.main.humidity,
          icon: item.weather[0].icon
        }));
  
        setThreeHours(extractedData)

      }
      catch(error){
        console.log('error', error)
      }
    }

    getCurrentData()
    get3hrsData()
  }, [city, unit])


  return (
    <div className='bg-local bg-cover' >
      <header className="pt-6 pe-12 flex justify-end">
        {/* <h1 className='text-2xl font-bold'>Weather App</h1> */}
        <div className="my-auto" role='button' onClick={()=> setModal(true)}>
          <FiSettings size='1.5rem'/>
        </div>
      </header>
      <Modal modal={modal} setModal={setModal} setCity={setCity} setUnit={setUnit} message={message}/>
      <ClockComponent setBackground={setBackground} sunset={sunset} timezone={timezone} city={city} background={background}/>
      <div className='grid grid-cols-2'>
        <div className='my-auto'>
          <h1 className='text-4xl font-semibold	'>
            <span>{Math.round(temp)}</span>
            <span>{unit === 'Metric' ? '°C' : '°F'}</span>
          </h1>
          <h3 className='text-2xl'>{weatherMain}</h3>
        </div>
        <div className='flex justify-center'>
          <img src={`/weatherApp/src/assets/${icon}.png`} alt="icon" />
        </div>
      </div>
      <div className='mt-5 flex justify-center'>
        <h1 className='text-3xl me-2'>{city}</h1>
        <div className='text-lg' role='button' onClick={()=> setModal(true)}>
          <FiEdit/>
        </div>
      </div>
      <h4 className='mt-3 text-lg'>{Math.round(tempMin)}° / {Math.round(tempMax)}° Feels like {Math.round(feelsLike)}°</h4>
      <div className="mt-4 flex">
        <h5>
          <span className='me-2 ms-3 justify-start'>Last update:</span>
          <span>{timeStammConverter(lastUpdate, timezone)}</span>
        </h5>
        {/* <h5 className='text-md'>update every 5 minutes</h5> */}
      </div>
      <div className={`grid-cols-12 m-2 p-2 rounded ${background === bg ? 'bg-blue-600' : 'bg-gray-500'} bg-opacity-60`}>
        <div className="border-b-2 flex justify-start">
          <h1>{weaterDesc}</h1>
        </div>
        <div className='flex flex-row overflow-x-auto p-3 gap-5'>
          {threeHours &&
            threeHours.map((item) => (
              <div className='me-1' key={item.dt}>
                <p className='justify-center'>{timeStammConverter(item.dt, timezone)}</p>
                <img src={`/weatherApp/src/assets/${item.icon}.png`} alt='icon' width='60rem'/>
                <p className='justify-center'>{Math.round(item.temp)}°</p>
                <div className='flex mt-auto mb-auto justify-center'>
                  <WiHumidity size='1.4rem'/>
                  <span className='p-0'>{item.humidity}</span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div className="grid grid-cols-12 mt-8">
        <div className={`rounded col-start-2 col-end-7 m-1 p-2 ${background === bg ? 'bg-blue-600' : 'bg-gray-500'} bg-opacity-60`}>
          <div className="flex justify-center">
            {/* <img src={humidityLogo} alt="humidityLogo" width='30rem'/> */}
            <WiHumidity size='3rem'/>
          </div>
          <h1>Humidity</h1>
          <h1 className='ms-2'>{humidity} %</h1>
        </div>
        <div className={`rounded col-start-7 col-end-12 m-1 p-2 ${background === bg ? 'bg-blue-600' : 'bg-gray-500'} bg-opacity-60`}>
          <div className="flex justify-center">
            <WiStrongWind size='3rem' />
          </div>
          <h1>Wind</h1>
          <h1 className='ms-2'>
            <span>{wind}</span>
            <span className='ms-1'>{unit === 'Metric' ? 'km/h' : ''}</span>
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-12 mt-1">
        <div className={`rounded col-start-2 col-end-7 m-1 p-2 ${background === bg ? 'bg-blue-600' : 'bg-gray-500'} bg-opacity-60`}>
          <div className="flex justify-center">
            <WiSunrise size='3rem' />
          </div>
          <h2>Sunrise</h2>
          <h2>{timeStammConverter(sunrise, timezone)}</h2>
        </div>
        <div className={`rounded col-start-7 col-end-12 m-1 p-2 ${background === bg ? 'bg-blue-600' : 'bg-gray-500'} bg-opacity-60`}>
          <div className="flex justify-center">
            <WiSunset size='3rem' />
          </div>
          <h2>Sunset</h2>
          <h2>{timeStammConverter(sunset, timezone)}</h2>
        </div>
      </div>
    </div>
  )
}

export default Weather
