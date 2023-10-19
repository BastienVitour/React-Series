import { useEffect, useState } from "react"
import { Search, ArrowRightSquareFill, ArrowLeftSquareFill } from "react-bootstrap-icons"
import axios from "axios"
import { api_key } from "../../config/api_key"
import Tv from "../homepage/Tv"
import '../homepage/homepage.scss'
import './search.scss'
import { useLocation } from "react-router-dom"
import CustomInput from "../formComponents/CustomInput"
import CustomButton from "../formComponents/CustomButton"

export default function SearchPage() {

    let location= useLocation()

    const [search, setSearch] = useState("")
    const [shows, setShows] = useState([])
    const [filteredShows, setFilteredShows] = useState([])
    const [genres, setGenres] = useState([])
    const [selectedGenre, setSelectedGenre] = useState("")
    const [page, setPage] = useState(1)
    const [maxPages, setMaxPages] = useState(0)

    const searchShows = async () => {
        await axios.get(`https://api.themoviedb.org/3/search/tv?query=${search}?&include_adult=false&language=en-US&page=${page}&api_key=${api_key}`)
        .then((res) => {
            console.log(res.data)
            setShows(res.data.results)
            setFilteredShows(res.data.results)
            setMaxPages(res.data.total_pages)
        })
        .catch((error) => console.error(error))
    }

    const getGenres = async () => {
        await axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${api_key}`)
        .then((res) => {
            setGenres(res.data.genres)
        })
        .catch((error) => console.error(error))
    }

    const changePage = (direction) => {
        if(direction == "prev" && page > 1) {
            setPage(page - 1)
        }
        else if (direction == "next" && page < maxPages) {
            setPage(page + 1)
        }
    }

    const filterGenre = (genre) => {
        if(genre !== 0) {
            setFilteredShows(shows.filter((show) => {
                return (show.genre_ids.includes(genre))
            }))
        }
        else {
            searchShows()
        }
    }

    useEffect(() => {
        // console.log("on search page")
        // const urlParams = new URLSearchParams(location.search)
        // if(urlParams.has("search")) {
        //     console.log(urlParams.get('search'))
        //     setSearch(urlParams.get('search'))
        //     searchShows(urlParams.get('search'))
        //     //getMovies(urlParams.get('page'))
        // }
        getGenres()
    }, [])

    useEffect(() => {
        if(search !== "") {
            searchShows()
        }
    }, [page])

    return(

        <div className="main-search-page">
            <CustomInput placeholder={'Rechercher une série'} type={'text'} functionToLaunch={setSearch}  />
            <CustomButton textContent={'Rechercher'} functionToLaunch={searchShows} />

            <div className="list-genres">
                <CustomButton textContent={'All'} functionToLaunch={() => filterGenre(0)} />
                {
                    genres.length > 0 &&
                    genres.map((genre) => {
                        return(
                            <CustomButton key={genre.id} className='genre-button' textContent={genre.name} functionToLaunch={() => filterGenre(genre.id)} />
                        )
                    })
                }
            </div>

            <div className="search-results">
                {
                    shows.length > 0 ?
                    <div className="good-results">
                    <div className="homepagetv">
                        {
                            filteredShows.map((show) => {
                                return(
                                    <Tv tv={show} key={show.id} />
                                )
                            })
                        }
                    </div>
                    <div className="pagination">
                        <ArrowLeftSquareFill onClick={() => changePage("prev")} className="pagination-arrow" />
                        <ArrowRightSquareFill onClick={() => changePage("next")} className="pagination-arrow" />
                    </div>
                    </div>
                    :
                    <h3>Aucun résultat</h3>
                }
            </div>
        </div>

    )

}