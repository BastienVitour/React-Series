import "./Banner.scss";
export default function Banner({show}){

    return (
    <div>
        {show !== undefined && 
        <div className="banniere">
            <h1>{show.name}</h1>
            <img src={'https://image.tmdb.org/t/p/original'+show.backdrop_path} className="banner" alt="Show poster"/>
            
        </div>
        }
    </div>
    );
}