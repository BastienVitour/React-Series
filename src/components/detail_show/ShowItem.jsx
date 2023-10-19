import './episode.scss'

const ShowItem = ({ episode }) => {
    return (
            // <div className="item-container">
                <img src={'https://image.tmdb.org/t/p/original'+episode.still_path} className="imgEp" alt="Show poster" />
            // </div>
    )
}
export default ShowItem