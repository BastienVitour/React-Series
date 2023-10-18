import { useState, useEffect } from "react"
import axios from "axios"
import { api_key } from "../../config/api_key"

export default function Background() {

    const [showsBg, setShowsBg] = useState([])

    const getShowBackground = async () => {
        try {
            let results = []
            for (let i = 1; i < 7; i++) {
                const response = await axios.get(`https://api.themoviedb.org/3/tv/popular?language=en-US&page=${i}&api_key=${api_key}`)
                results = results.concat(response.data.results)
            }
            setShowsBg(results)
            console.log(results[0])
        }
        catch(error) {
            console.error(error)
        }
       
    }

    useEffect(() => {
        getShowBackground()
    }, [])

    return(

        <div className="background">
            {
                showsBg.length !== 0 &&
                showsBg.map((show) => {
                    if(show.poster_path !== null) {
                        return (
                            <img src={'https://image.tmdb.org/t/p/original'+show.poster_path} alt="Show poster" width="125px" key={show.id} />
                        )
                    }
                })
            }
        </div>

    )

}