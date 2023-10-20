import './notifications.scss'
import { BellFill } from 'react-bootstrap-icons'
import axios from 'axios'
import { api_key } from '../../config/api_key'
import { useState, useEffect } from 'react'

import { db } from '../../config/firebase'
import { getDocs, collection, query, where } from 'firebase/firestore'
import { auth } from '../../config/firebase'
import NotifsDiv from './NotifsDiv'

export default function Notifications({ divDisplay }) {

    const [showsToAir, setShowsToAir] = useState([])
    const [listDisplay, setListDisplay] = useState(divDisplay)

    const followedShowsCollection = collection(db, "followed_shows")
    const notifParamsCollection = collection(db, "notification_parameters")

    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const twoDays = new Date()
    tomorrow.setDate(tomorrow.getDate() + 2)
    const threeDays = new Date()
    tomorrow.setDate(tomorrow.getDate() + 3)
    const nextWeek = new Date()
    tomorrow.setDate(tomorrow.getDate() + 6)

    const getNotificationParams = async () => {
        const q = query(notifParamsCollection, where("id_user", "==", auth?.currentUser?.uid))
        const notifParams = await getDocs(q)
        const data = notifParams.docs.map((doc) => ({...doc.data(), id: doc.id}))[0]
        // console.error(data.days)
        return data.days
    }

    const getFollowedShows = async () => {
        try{
            const daysForNotif = getNotificationParams().then(async (days) => {
                if(days > 0) {
                    let shows = []
                    const q = query(followedShowsCollection, where("id_user", "==", auth?.currentUser?.uid))
                    const followedShows = await getDocs(q)
                    const data = followedShows.docs.map((doc) => ({...doc.data(), id: doc.id}))
                    if(data.length !== 0) {
                        for (const show of data) {
                            const showNew = await axios.get(`https://api.themoviedb.org/3/tv/${show.id_show}?api_key=${api_key}`)
                            let showIsValid = false;
                            let diffTime
                            let diffDays
                            if(showNew.data.next_episode_to_air !== null) {
                                diffTime = new Date(showNew.data.next_episode_to_air.air_date) - new Date()
                                diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                                showIsValid = diffDays <= days
                                if(showIsValid) {
                                    shows = shows.concat(showNew.data)
                                }
                            }
                        }
                        setShowsToAir(shows)
                    }
                }
            })
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
    }, [])

    useEffect(() => {
        if(divDisplay) {
            setListDisplay(true)
        }
        else {
            setListDisplay(false)
        }
    }, [divDisplay])

    return(

        <div>
            <div className='main-notifications'>
                <div className='bell' onClick={() => setListDisplay(!listDisplay)}>
                    {/* <BellFill /> */}
                    <div className='notif-number'>
                        {
                            showsToAir.length > 0 &&
                            <p>{showsToAir.length}</p>
                        }
                    </div>
                </div>
            </div>
            {
                showsToAir.length > 0 &&
                <NotifsDiv listShows={showsToAir} display={listDisplay} />
            }
        </div>
        
    )

}