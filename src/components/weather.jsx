import React, { useEffect, useState } from 'react'
import {WiStrongWind, WiHumidity, WiSunrise, WiSunset} from 'react-icons/wi'
import {FiSettings, FiEdit} from 'react-icons/fi'
import { httpService } from '../core/http-service'
import timeStammConverter from '../core/timestampConverter'
import Modal from './modal'
import ClockComponent from './clock'

function Weather({setBackground}) {
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
  const [fetched, setfetched] = useState(false)



  useEffect(()=>{
    setfetched(false)
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
          setfetched(true)
          {response.data.weather[0].icon.includes('n') ? setBackground('grayscale') : setBackground('grayscale-0')}
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
    <>
    {fetched ?
      <div className='bg-local bg-cover' >
        <header className="pt-6 pe-12 flex justify-end">
          <div className="my-auto" role='button' onClick={()=> setModal(true)}>
            <FiSettings size='1.5rem'/>
          </div>
        </header>
        <Modal modal={modal} setModal={setModal} setCity={setCity} setUnit={setUnit} message={message}/>
        <ClockComponent setBackground={setBackground} sunset={sunset} timezone={timezone} city={city} fetched={fetched}/>
        <div className='grid grid-cols-2'>
          <div className='my-auto mx-auto'>
            <h1 className='text-4xl font-semibold'>
              <span>{Math.round(temp)}</span>
              <span>{unit === 'Metric' ? '°C' : '°F'}</span>
            </h1>
            <h3 className='text-2xl'>{weatherMain}</h3>
          </div>
          <div className='flex justify-center'>
            {/* <img src={`/src/assets/${icon}.webp`} alt="icon" width='100rem'/> */}
            <img src={`/weatherApp/assets/${icon}.webp`} alt="icon" width='100rem'/>
          </div>
        </div>
        <div className='mt-5 flex justify-center'>
          <h1 className='text-3xl me-2'>{city}</h1>
          <div className='text-lg' role='button' onClick={()=> setModal(true)}>
            <FiEdit/>
          </div>
        </div>
        <h4 className='mt-3 text-lg text-center'>{Math.round(tempMin)}° / {Math.round(tempMax)}° Feels like {Math.round(feelsLike)}°</h4>
        <div className={`grid-cols-12 m-2 mt-4 p-2 rounded bg-slate-50 bg-opacity-60 shadow-3xl`}>
          <div className="border-b-2 flex justify-between">
            <h1>{weaterDesc}</h1>
            <h5>
              <span className='me-2 ms-3 justify-start'>Last update:</span>
              <span>{timeStammConverter(lastUpdate, timezone)}</span>
          </h5>
          </div>
          <div className='flex flex-row overflow-x-auto p-3 gap-5'>
            {threeHours &&
              threeHours.map((item) => (
                <div className='me-1' key={item.dt}>
                  <p className='text-center'>{timeStammConverter(item.dt, timezone)}</p>
                  {/* <img className='mt-1' src={`/src/assets/${item.icon}.webp`} alt='icon' width='60rem'/> */}
                  <img className='mt-1' src={`/weatherApp/assets/${item.icon}.webp`} alt='icon' width='60rem'/>
                  <p className='text-center p-0 mt-1'>{Math.round(item.temp)}°</p>
                  <div className='flex mt-1 mb-auto justify-center'>
                    <WiHumidity size='1.4rem'/>
                    <span className='p-0'>{item.humidity}</span>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className="grid grid-cols-12 mt-8">
          <div className={`rounded col-start-2 col-end-7 m-1 p-2 bg-slate-50 bg-opacity-60 shadow-3xl`}>
            <div className="flex justify-center">
              <WiHumidity size='3rem'/>
            </div>
            <h1 className='text-center'>Humidity</h1>
            <h1 className='ms-2 text-center'>{humidity} %</h1>
          </div>
          <div className={`rounded col-start-7 col-end-12 m-1 p-2 bg-slate-50 bg-opacity-60 shadow-3xl`}>
            <div className="flex justify-center">
              <WiStrongWind size='3rem' />
            </div>
            <h1 className='text-center'>Wind</h1>
            <h1 className='ms-2 text-center'>
              <span>{wind}</span>
              <span className='ms-1'>{unit === 'Metric' ? 'km/h' : ''}</span>
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-1">
          <div className={`rounded col-start-2 col-end-7 m-1 p-2 bg-slate-50 bg-opacity-60 shadow-3xl`}>
            <div className="flex justify-center">
              <WiSunrise size='3rem' />
            </div>
            <h2 className='text-center'>Sunrise</h2>
            <h2 className='text-center'>{timeStammConverter(sunrise, timezone)}</h2>
          </div>
          <div className={`rounded col-start-7 col-end-12 m-1 p-2 bg-slate-50 bg-opacity-60 shadow-3xl`}>
            <div className="flex justify-center">
              <WiSunset size='3rem' />
            </div>
            <h2 className='text-center'>Sunset</h2>
            <h2 className='text-center'>{timeStammConverter(sunset, timezone)}</h2>
          </div>
          </div>
        </div>
      :
        <div>
          <div className='bg-opacity-60 shadow-3xl w-60 rounded-md text-md p-8 mx-auto'>
            <p className='text-center align-middle my-auto'>Processing...</p>
          </div>
        </div>
      }
      </>
  )
}

export default Weather
