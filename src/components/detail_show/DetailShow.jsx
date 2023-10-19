import Banner from "./Banner";
import "./DetailShow.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api_key } from "../../config/api_key";
import ShowList from "./ShowList";

export default function Show(){

    const { id } = useParams();

    const [show, setShow] = useState({});
    const [seasons, setSeasons] = useState([]);

    const getShow = async () => {
        await axios.get(`https://api.themoviedb.org/3/tv/${id}?language=en-US&api_key=${api_key}`)
        .then(async (response) => {
            let seasons = []
            for (const season of response.data.seasons) {
                const toAdd = await axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${season.season_number}?language=en-US&api_key=${api_key}`)
                seasons = seasons.concat(toAdd.data)
            }
            setSeasons(seasons)
            setShow(response.data);
        })
        .catch((error) => console.error(error));
    }

    useEffect(() => {
        getShow()
    }, []);

    return (

    
    <div className="container">

        <Banner show={show}/>

        <h1>Next Episode</h1>

        {show.next_episode_to_air !== null &&  <img src={'https://image.tmdb.org/t/p/original'+show.backdrop_path} className="NextEp" alt="Show poster"/>}

        
        {seasons.map((season) => {
                return(
                    <div className="season">

                        <h3>{season.name}</h3>

                        <div className="episodes">
                            <ShowList season={season} />

                            {/* {season.episodes.map((episode) => {
                                console.log(episode);
                                if(episode.runtime !== null) {
                                    return(
                                    
                                    <div className="episode">
                                        {show.episode !== null &&  <img src={'https://image.tmdb.org/t/p/original'+show.backdrop_path} className="imgEp" alt="Show poster"/>}
                                        <span>{episode.name}</span>
                                        <span>{episode.overview}</span>
                                    </div>
                                )
                                }
                            })} */}
                        </div>
                    </div>
                )
            })}


    </div>

    );
}

