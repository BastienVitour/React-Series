import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'

export default function DayOfWeek({ date, shows }) {

    const [showsToAir, setShowsToAir] = useState([])

    useEffect(() => {
        shows.map((show) => {
            if(show.next_episode_to_air !== null) {
                if(new Date(show.next_episode_to_air.air_date).toLocaleDateString() === date.date.toLocaleDateString()) {
                    setShowsToAir(showsToAir => [...showsToAir, show])
                }
            }
        })
    }, [])

    return(

        <div className={(new Date().getDay() === date.date.getDay() ? "current-day" : "") + " day-div"}>
            <h3>{date.name} ({date.date.toLocaleDateString().substring(0, 5)})</h3>
            <hr />
            {
                showsToAir.map((show) => {
                    return(
                        <div className="show-next-episode" key={show.id}>
                            <h4>{show.name}</h4>
                            <Link to={'/show/'+show.id}>
                                <img src={'https://image.tmdb.org/t/p/w500'+show.backdrop_path} alt="Poster of the show" width="125px" />
                            </Link>
                            <p>{show.next_episode_to_air.name}</p>
                            <hr />
                        </div>
                    )
                })
            }
        </div>

    )

}