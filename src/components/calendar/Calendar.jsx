import { useEffect, useState } from 'react'
import DayOfWeek from './DayOfWeek'
import './calendar.scss'
import axios from 'axios'
import { api_key } from '../../config/api_key'

import { db } from '../../config/firebase'
import { getDocs, collection, query, where } from 'firebase/firestore'
import { auth } from '../../config/firebase'

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

    const followedShowsCollection = collection(db, "followed_shows")

    const getFollowedShows = async () => {
        try{
            let shows = []
            const q = query(followedShowsCollection, where("id_user", "==", auth?.currentUser?.uid))
            const followedShows = await getDocs(q)
            const data = followedShows.docs.map((doc) => ({...doc.data(), id: doc.id}))
            console.log(data)
            if(data.length !== 0) {
                for (const show of data) {
                    const showNew = await axios.get(`https://api.themoviedb.org/3/tv/${show.id_show}?api_key=${api_key}`)
                    shows = shows.concat(showNew.data)
                }
                setShowsToAir(shows)
            }
            
        }
        catch(error) {
            console.error(error)
        }
    }

    const getShowsToAir = async () => {
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
        auth.onAuthStateChanged(function(user) {
            if (user) {
                getFollowedShows()
              // User is signed in.
            } else {
                console.error("User not signed in")
              // No user is signed in.
            }
        });
        
        //getShowsToAir()
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