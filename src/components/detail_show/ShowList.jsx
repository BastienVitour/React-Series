import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@material-ui/icons";
import ShowItem from "./ShowItem";
import './showList.scss'
import { useEffect, useRef, useState } from "react";


const ShowList = ({ season }) => {

    const [slideNumber, setSlideNumber] = useState(0);
    const listRef = useRef();

    const handleClick = (direction) => {
        let distance = listRef.current.getBoundingClientRect().x - 50;
        if (direction === "left" && slideNumber > 0) {
            setSlideNumber(slideNumber - 1);
            listRef.current.style.transform = `translateX(${460 + distance}px)`;
        }
        if (direction === "right" && slideNumber < 5) {
            setSlideNumber(slideNumber + 1);
            listRef.current.style.transform = `translateX(${-460 + distance}px)`;
        }
    }

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