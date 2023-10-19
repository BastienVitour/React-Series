import './episode.scss'

const ShowItem = ({ episode }) => {
    return (
        <div>
            <img src={'https://image.tmdb.org/t/p/w500'+episode.still_path} className="imgEp" alt="Show poster" />
            <p className="single-line">{episode.name}</p>
        </div>
    )
}
export default ShowItem