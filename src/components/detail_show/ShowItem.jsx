import './episode.scss'

const ShowItem = ({ episode, }) => {
    return (
        <div className="CardVignette">
            <div className="vignette">
                <img src={'https://image.tmdb.org/t/p/w500'+episode.still_path} className="imgEp" alt="Show poster" />
                <span>S{episode.season_number}:E{episode.episode_number}</span>
            </div>
            <p className="single-liner">{episode.name}</p>
            <p className="single-liner">{episode.overview}</p>
        </div>
    )
}
export default ShowItem