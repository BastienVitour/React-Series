import { useEffect, useState } from 'react'
import DayOfWeek from './DayOfWeek'
import './calendar.scss'
import axios from 'axios'
import { api_key } from '../../config/api_key'

import { db } from '../../config/firebase'
import { getDocs, collection, query, where } from 'firebase/firestore'
import { auth } from '../../config/firebase'
import { useNavigate } from 'react-router-dom'

export default function Calendar() {

    const navigate = useNavigate()

    const currentDate = new Date()
    const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
    const dates = [currentDate]
    for (let i = 1; i < 7; i++) {
        let dateToAdd = new Date()
        dates.push(new Date(dateToAdd.setDate(currentDate.getDate() + i)))
    }

    const daysOfWeek = []
    for (const date of dates) {
        daysOfWeek.push({
            "name": days[date.getDay()],
            "date": date
        })
    }

    const [showsToAir, setShowsToAir] = useState([])

    const followedShowsCollection = collection(db, "followed_shows")

    const getFollowedShows = async () => {
        try{
            let shows = []
            const q = query(followedShowsCollection, where("id_user", "==", auth?.currentUser?.uid))
            const followedShows = await getDocs(q)
            const data = followedShows.docs.map((doc) => ({...doc.data(), id: doc.id}))
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

    useEffect(() => {
        auth.onAuthStateChanged(function(user) {
            if (user) {
                getFollowedShows()
              // User is signed in.
            } else {
                navigate('/login')
              // No user is signed in.
            }
        });
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