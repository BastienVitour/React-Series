import { useLocation, Link, useNavigate } from 'react-router-dom'
import './navbar.scss'
import { HouseDoorFill, CalendarEventFill, Search, PersonCircle, Bell, BellFill } from 'react-bootstrap-icons'
import { useEffect, useState } from 'react'
import { auth } from "../../config/firebase"
import { signOut } from "firebase/auth"
import CustomInput from "../formComponents/CustomInput"
import CustomButton from "../formComponents/CustomButton"
import axios from 'axios'
import { api_key } from '../../config/api_key'
import Notifications from '../notifications/Notifications'

export default function Navbar() {

    let location = useLocation()
    const navigate = useNavigate()

    const [logged, setLogged] = useState()
    const [search, setSearch] = useState("")

    const [displayNotifs, setDisplayNotifs] = useState(false)

    const logout = async () => {
        try {
            await signOut(auth)
        }
        catch(error) {
            console.error(error)
        }
    }

    const searchShows = async () => {
        // await axios.get(`https://api.themoviedb.org/3/search/tv?query=${search}?&include_adult=false&language=en-US&page=1&api_key=${api_key}`)
        // .then((res) => {
            navigate(`/search?search=${search}`)
            
        // })
        // .catch((error) => console.error(error))
    }

    useEffect(() => {
        auth.onAuthStateChanged(function(user) {
            if(user) {
                setLogged(true)
              // User is signed in.
            } else {
                setLogged(false)
              // No user is signed in.
            }
        });
    }, [])

    return(

        <div className="navbar">
            <div className='left-links'>
                <Link to={"/"} className={location.pathname=='/' ? "active navlink" : "navlink"}>
                    <HouseDoorFill />
                    <span className='nav-title'>Accueil</span>
                </Link>
                {
                    logged &&
                    <div className='links-if-logged'>
                    <Link to={"/search"} className={location.pathname=='/search' ? "active navlink" : "navlink"}>
                        <Search />
                        <span className='nav-title'>Recherche</span>
                    </Link>
                    <Link to={"/calendar"} className={location.pathname=='/calendar' ? "active navlink" : "navlink"}>
                        <CalendarEventFill />
                        <span className='nav-title'>Calendrier</span>
                    </Link>
                    <Link to={"/profile"} className={location.pathname=='/profile' ? "active navlink" : "navlink"}>
                        <PersonCircle />
                        <span className='nav-title'>Profil</span>
                    </Link>
                    <Link className={displayNotifs ? "active navlink" : "navlink"} onClick={() => setDisplayNotifs(!displayNotifs)}>
                        {
                            displayNotifs ? <BellFill /> : <Bell />
                        }
                        <span className='nav-title'>Notifications</span>
                        <Notifications divDisplay={displayNotifs} />
                    </Link>
                    </div>
                }
                
            </div>

            {/* <div className='search-bar'>
                <CustomInput placeholder={'Rechercher une série'} type={'text'} functionToLaunch={setSearch}  />
                <CustomButton textContent={'Rechercher'} functionToLaunch={searchShows} />
            </div> */}
            
            {
                logged ?
                <Link to={"/login"} className={location.pathname=='/login' ? "active navlink" : "navlink"} onClick={logout}>
                    <span className='nav-title'>Déconnexion</span>
                </Link>
                :
                <div className='right-links'>
                    <Link to={"/login"} className={location.pathname=='/login' ? "active navlink" : "navlink"}>
                        <span className='nav-title'>Connexion</span>
                    </Link>
                    <Link to={"/signup"} className={location.pathname=='/register' ? "active navlink" : "navlink"}>
                        <span className='nav-title'>Inscription</span>
                </Link>
                </div>
            }
            
        </div>

    )

}