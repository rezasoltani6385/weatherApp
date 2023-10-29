import { useEffect, useState } from "react";
// import bgNight from '../assets/bg-night.webp'
import bgNight from '../assets/night.gif'
import bg from '../assets/day.gif'
// import bg from '../assets/bg.webp'



const Clock = ({setBackground, sunset, timezone, city, background}) =>{
    const offset = new Date().getTimezoneOffset() * 60 * 1000

    let date = new Date(Date.parse(new Date) + offset + (timezone *1000))

  const[hour, setHour]= useState()
  const[minute, setMinute] = useState()
  const[second, setSecond] = useState()

useEffect(()=>{
    const myClock = setInterval(function(){
        // city !== 'Tehran' ? date = new Date(Date.parse(new Date) + offset + (timezone *1000)) :  date = new Date(Date.parse(new Date))
        date = new Date(Date.parse(new Date) + offset + (timezone *1000))
        date.getHours() < 10 ? setHour(`0${date.getHours()}`) : setHour(date.getHours())
        date.getMinutes() < 10 ? setMinute(`0${date.getMinutes()}`) : setMinute(date.getMinutes())
        date.getSeconds() < 10 ? setSecond(`0${date.getSeconds()}`) : setSecond(date.getSeconds())
    }, 1000)

    return () => clearInterval(myClock)

    },[timezone])

  if (date > (sunset * 1000)){
    setBackground(bgNight)
  }
  else{
    setBackground(bg)
  }

  return (
    <div className={`bg-opacity-60 ${background === bg ? 'bg-blue-600' : 'bg-gray-500'} w-60 mx-auto rounded-md`}>
        {hour ?
            <h1 className="mt-8 text-3xl p-8">{hour}:{minute}:{second}</h1>
        :
            <div className={`bg-opacity-60 ${background === bg ? 'bg-blue-600' : 'bg-gray-500'} w-60 mx-auto rounded-md mt-8 text-md p-8`}>
                Processing...
            </div>
        }
    </div>
  )
}


export default Clock
