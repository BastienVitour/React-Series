import { useEffect } from "react";
import "./Banner.scss";

export default function Banner({show, cast}){

    // useEffect(() => {
    //     console.log(cast)
    // }, [])

    return (
    <div className="banniere">
        {show !== undefined && 
        <div>
            <div className="gradient">
                <img src={'https://image.tmdb.org/t/p/original'+show.backdrop_path} className="banner" alt="Show poster"/>
            </div>

            <h1>{show.name}</h1>
            <p className="descShow">{show.overview}</p>
            <span>{/* {
            cast !== undefined &&
            console.log(cast)
            } */}
            {
            cast.length > 0 &&
            cast.map((credit) => {
                return(
                    
                <div className="zoneActeur">

                    <img src={'https://image.tmdb.org/t/p/original'+credit.profile_path} className="profilActeur" alt="Show poster"/>

                    <p className="casters">{credit.name}</p>

                </div>

                )
            })}</span>
            
            
        </div>
        }
    </div>
    );
}