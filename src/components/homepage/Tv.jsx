import React, { useEffect, useState } from 'react';
import './homepage.scss';
import Background from '../signup/Background';
// import {LikeButton} from '../../components/followed_series';
// import { ReactComponent as Heart } from '../../public/heart.svg';
import { HeartFill } from 'react-bootstrap-icons';
import { db, auth } from '../../config/firebase';
import { addDoc, collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';
import axios from 'axios';
import { api_key } from '../../config/api_key';



export default function Tv({tv, featured}) {

  const followedShowsCollection = collection(db, 'followed_shows');

  const [liked, setLiked] = useState(null);

  const [document, setDocument] = useState({})
  const [followedShows, setFollowedShows] = useState([])


  const likeTvShow = async(id_show) => {
    console.log(id_show)
    let userId = auth?.currentUser?.uid;
    if (userId !== null) {
      if (liked){
        let docToDelete = doc (db, 'followed_shows', document.id);
        await deleteDoc(docToDelete)
        setLiked(false)

    }
    else {
      await addDoc(followedShowsCollection, {
        id_user: userId,
        id_show: id_show
      })
      setLiked(true)
    }
    }
  }

  const getlikeTvShows = async() => {
    try {
      const q = query(followedShowsCollection, where("id_user", "==", auth?.currentUser?.uid), where("id_show", "==", tv.id))
      const followedShows = await getDocs(q)
      const data = followedShows.docs.map((doc) => ({...doc.data(), id: doc.id}))
      setDocument(data[0])
      console.log(data)
      if (data.length !== 0) {
        setLiked(true)
      }
      else {
        setLiked(false)
      }
    }
    catch(error) {
      console.error(error)
    }
  }

  useEffect(() => {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        getlikeTvShows()
        // User is signed in.
      } else {
          console.error("User not signed in")
        // No user is signed in.
      }
  });

  }, [])



  return (
    <>
{
 featured ? (
 <>

  <div className="featured" >
     <a href={"/show/"+tv.id} className="tv-link" aria-label={`View details for ${tv.name}`}>
      <img  src={'https://image.tmdb.org/t/p/original'+tv.backdrop_path} alt='TV POSTER MAXITEST' />
     </a>
     <div className='text-featured'>
      <h1 >{tv.name} </h1>
      <p>{tv.overview}</p>
     </div>
  </div>

 </>
 )
: ( <div className="single-tv">
     <a href={"/show/"+tv.id} className="tv-link" aria-label={`View details for ${tv.name}`}>
      <img src={'https://image.tmdb.org/t/p/w500'+tv.poster_path} alt="TV poster" />
     </a>
        <p>{tv.name} - {tv.vote_average} ⭐️</p>
      {/* </div> */}
      {
        liked !== null &&
        <div className={liked ? "liked" : ""}>
          <p><HeartFill onClick={() => likeTvShow(tv.id)} /> </p>
        </div>
      }
      {/* <div className='single-line'> */}

 </div>

 )
}

    </>
  )

}
