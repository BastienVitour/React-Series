import Banner from "./Banner";
import "./DetailShow.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api_key } from "../../config/api_key";
import ShowList from "./ShowList";
import Comment from './comments/Comment';
import CommentForm from './comments/CommentForm';
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import {db} from "../../config/firebase";

export default function Show(){

    const { id } = useParams();

    const [show, setShow] = useState({});
    const [seasons, setSeasons] = useState([]);
    const [credits, setCredits] = useState([]);
    const [comments, setComments] = useState([]);
    const commentsCollection = collection(db, 'comments');

    const getShow = async () => {
        await axios.get(`https://api.themoviedb.org/3/tv/${id}?language=en-US&api_key=${api_key}`)
        .then(async (response) => {
            let seasons = []
            for (const season of response.data.seasons) {
                if(season.season_number !== 0) {
                    const toAdd = await axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${season.season_number}?language=en-US&api_key=${api_key}`)
                    seasons = seasons.concat(toAdd.data)
                }
            }
            const credit = await axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?language=en-US&api_key=${api_key}`)
            setCredits(credit.data.cast)
            setSeasons(seasons);
            console.log(response.data);
            setShow(response.data);
        })
        .catch((error) => console.error(error));
    }
    
    const getCredits = async () => {
        await axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?language=en-US&api_key=${api_key}`)
        .then(async (response) => {
            setSeasons(seasons);
            setShow(response.data);
        })
    }

    const getComments = async () => {
        const q = query(commentsCollection, where("id_show", "==", id), orderBy("timestamp", "desc"));
        const commentaire = await getDocs(q);
        const data = commentaire.docs.map((doc) => ({...doc.data(), id: doc.id}))
        setComments(data);
        console.log(data);
        }

    useEffect(() => {
        getShow()
        getCredits()
        getComments()
    }, []);

    return (

    <div className="container">

        <Banner show={show} cast={credits}/>

        

        {(show.next_episode_to_air !== null && show.next_episode_to_air !== undefined) &&
            <div className="NextEp">
                
                <h1 className="TitreNextEp">Next Episode</h1>

                <div className="cardNextEp">

                    <img src={'https://image.tmdb.org/t/p/original'+show.next_episode_to_air.still_path} className="ImgNextEp" alt="Show poster"/>

                    <div className="textNextEp">
                        <h2>{show.next_episode_to_air.name}</h2>
                        <p>{show.next_episode_to_air.overview}</p>
                    </div>
                </div>

            </div>
        }
        
        {seasons.map((season) => {
            return(
                <div className="season">

                    <h3>{season.name}</h3>

                    <div className="episodes">
                        <ShowList season={season} />
                    </div>
                </div>
            )
        })}

        <CommentForm idShow={id} getComments={getComments} />
        <div className="comments-div">
            {comments.length > 0 &&
            comments.map((comment) => {
                console.log(comment)
                return(
                    <Comment
                        key={comment.id}
                        comment={comment}
                    />
                )
            })}
        </div>

    </div>

    );
}

