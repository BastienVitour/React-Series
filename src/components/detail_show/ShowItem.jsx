import './episode.scss'

const ShowItem = ({ episode, }) => {
    return (
        <div>
            <div className="vignette">
                <img src={'https://image.tmdb.org/t/p/w500'+episode.still_path} className="imgEp" alt="Show poster" />
                <span>Episode: {episode.episode_number}</span>
            </div>
            <p className="single-liner">{episode.name}</p>
        </div>
    )
}
export default ShowItem