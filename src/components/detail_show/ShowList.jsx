import ShowItem from "./ShowItem";
import './showList.scss'
import { useRef } from "react";

const ShowList = ({ season }) => {

    const listRef = useRef();

    return (
        <div>
            <div className="show-container" ref={listRef}>
                { (season !== null && season !== undefined) &&
                    season.episodes.map((episode) => {
                        return(
                            <ShowItem episode={episode} />
                        )
                    })
                }
            </div>
        </div>
    )}

    export default ShowList