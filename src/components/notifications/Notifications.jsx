import './notifications.scss'
import { BellFill } from 'react-bootstrap-icons'
import axios from 'axios'
import { api_key } from '../../config/api_key'
import { useState, useEffect } from 'react'

import { db } from '../../config/firebase'
import { getDocs, collection, query, where } from 'firebase/firestore'
import { auth } from '../../config/firebase'
import NotifsDiv from './NotifsDiv'

export default function Notifications() {

    const [showsToAir, setShowsToAir] = useState([])
    const [listDisplay, setListDisplay] = useState(false)

    const followedShowsCollection = collection(db, "followed_shows")

    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

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
                    const showIsValid = showNew.data.next_episode_to_air.air_date == tomorrow.toISOString().substring(0, 10) || showNew.data.next_episode_to_air.air_date == today.toISOString().substring(0, 10)
                    if(showNew.data.next_episode_to_air !== null && showIsValid) {
                        shows = shows.concat(showNew.data)
                    }
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
                console.error("User not signed in")
              // No user is signed in.
            }
        });
    }, [])

    useEffect(() => {
        console.log(listDisplay)
    }, [listDisplay])

    return(

        <div>
            <div className='main-notifications'>
                <div className='bell' onClick={() => setListDisplay(!listDisplay)}>
                    <BellFill />
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