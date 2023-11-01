import { useEffect, useState } from "react";



const Clock = ({timezone, fetched}) =>{
  const offset = new Date().getTimezoneOffset() * 60 * 1000

  let date = new Date(Date.parse(new Date) + offset + (timezone *1000))

  const [clock, setClock] = useState({
    hour: date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
    minute: date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
    second: date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds(),
  })
  const [fulldate, setFulldate] = useState({
    year: date.getFullYear(),
    month: date.toLocaleString('default', { month: 'long' }),
    date: date.getDate(),
    day: date.toLocaleString('default', { weekday: 'short' }),
  })

  // console.log(timezone)

  useEffect(()=>{
    const myclock = setInterval(function(){
        date = new Date(Date.parse(new Date) + offset + (timezone *1000))
        setFulldate({
          year: date.getFullYear(),
          month: date.toLocaleString('default', { month: 'long' }),
          date: date.getDate(),
          day: date.toLocaleString('default', { weekday: 'short' }),
        })
        setClock ({
          hour: date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
          minute: date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
          second: date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds(),
        })
      }, 1000)

    return () => clearInterval(myclock)

  },[date])


  return (
    <div className={`bg-opacity-60 w-60 mx-auto rounded-md shadow-3xl`}>
        {fetched ?
          <div className="mt-8 p-3">
            <h1 className=" text-3xl text-center">{clock.hour}:{clock.minute}:{clock.second}</h1>
            <h1 className="text-lg text-center">{fulldate.day}, {fulldate.date} {fulldate.month} {fulldate.year}</h1>
          </div>
        :
            <div className={`bg-opacity-60 w-60 mx-auto rounded-md mt-8 text-md p-8`}>
                Processing...
            </div>
        }
    </div>
  )
}


export default Clock
