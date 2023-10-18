import { useEffect, useState } from 'react'
import DayOfWeek from './DayOfWeek'
import './calendar.scss'
import axios from 'axios'
import { api_key } from '../../config/api_key'

export default function Calendar() {

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - (startDate.getDay() + 6) % 7);
    const endDate = new Date()
    endDate.setDate(startDate.getDate() + 6)
    let currentDate = new Date()
    const daysOfWeek = [
        {"name": "Lundi", "date": startDate},
        {"name": "Mardi", "date": new Date(currentDate.setDate(startDate.getDate() + 1))},
        {"name": "Mercredi", "date": new Date(currentDate.setDate(startDate.getDate() + 2))},
        {"name": "Jeudi", "date": new Date(currentDate.setDate(startDate.getDate() + 3))},
        {"name": "Vendredi", "date": new Date(currentDate.setDate(startDate.getDate() + 4))},
        {"name": "Samedi", "date": new Date(currentDate.setDate(startDate.getDate() + 5))},
        {"name": "Dimanche", "date": endDate},
    ]

    const [showsToAir, setShowsToAir] = useState([])

    const getShowToAir = async () => {
        try {
            let shows = []
            await axios.get(`https://api.themoviedb.org/3/discover/tv?first_air_date.gte=${startDate.toISOString().substring(0, 10)}&first_air_date.lte=${endDate.toISOString().substring(0, 10)}&language=en-US&page=1&api_key=${api_key}&popularity=revenue.desc`)
            .then(async (response) => {
                console.log(response.data)
                for (const show of response.data.results) {
                    const showNew = await axios.get(`https://api.themoviedb.org/3/tv/${show.id}?api_key=${api_key}`)
                    shows = shows.concat(showNew.data)
                }
                setShowsToAir(shows)
            })
            .catch((error) => console.error(error))
        }
        catch(error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getShowToAir()
    }, [])

    return(

        <div className="main-page-calendar">
            <h1>Prochains épisodes</h1>
            <div className="list-days">
                {
                    showsToAir.length !== 0 &&
                    daysOfWeek.map((day) => {
                        return(
                            <DayOfWeek key={day.name} date={day} shows={showsToAir} />
                        )
                    })
                }
            </div>
        </div>

    )

}