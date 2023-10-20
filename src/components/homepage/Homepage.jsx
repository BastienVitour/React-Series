import axios from "axios"
import { useState, useEffect } from "react"
import Tv from "./Tv";
import './homepage.scss';

import { useLocation, Link } from "react-router-dom";
import { addDoc, collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';
import { api_key } from '../../config/api_key';
import { db, auth } from '../../config/firebase';


export default function Homepage() {

  const [tv, setTv] = useState([])
  const [tvRandom, setTvRandom] = useState({})
  //const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const location = useLocation()
  const baseUrl = "https://api.themoviedb.org/3"


  const followedShowsCollection = collection(db, 'followed_shows');

  const [followedShows, setFollowedShows] = useState([])

  // RECUPERER UNE seule serie à afficher


  const getRandomTvShow = () => {
  if (tv.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * tv.length);
console.log(tv[randomIndex])
  setTvRandom(tv[randomIndex]);
  }

 // RECUPERE TOUTES LES SERIES tv POPULAIRE
  const getTv = async () => { // this function gets the TV informations from the API and set the state TV
    await axios.get(`${baseUrl}/tv/popular?language=en-US&page=1&api_key=${api_key}`)
    .then((res) => {
        setTv(res.data.results)
    })
    .catch((error) => console.error(error))
  }

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
            setFollowedShows(shows)
        }

    }
    catch(error) {
        console.error(error)
    }
}

  useEffect(() => { //
    getTv()
    getFollowedShows()
  }, [])

  useEffect(() => {
    getRandomTvShow()
  }, [tv])



  return (
    <>
      <Tv tv={tvRandom} featured={true}/>

    <div className="homepagetv">
    {tv.map((tv) => ( // this component maps the state TV and return the TV component
      <Tv tv={tv} key={tv.id} />
    ))}
    </div>

    <h2>My TV Shows</h2>
    <div className="homepagetv">
    {followedShows.map((tv) => ( // this component maps the state TV and return the TV component
      <Tv tv={tv} key={tv.id} />
    ))}
    </div>
    </>
  )


}
