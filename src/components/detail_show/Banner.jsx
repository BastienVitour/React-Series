import "./Banner.scss";

export default function Banner({show}){

    return (
    <div className="banniere">
        {show !== undefined && 
        <div>
           
            <img src={'https://image.tmdb.org/t/p/original'+show.backdrop_path} className="banner" alt="Show poster"/>
            <h1>{show.name}</h1>
            
        </div>
        }
    </div>
    );
}