import { useLocation, Link } from 'react-router-dom'
import './navbar.scss'
import { HouseDoorFill, CalendarEventFill, Search, PersonCircle } from 'react-bootstrap-icons'
import { useEffect, useState } from 'react'
import { auth } from "../../config/firebase"
import { signOut } from "firebase/auth"

export default function Navbar() {

    let location = useLocation()

    const [logged, setLogged] = useState()

    const logout = async () => {
        try {
            await signOut(auth)
        }
        catch(error) {
            console.error(error)
        }
    }

    useEffect(() => {
        auth.onAuthStateChanged(function(user) {
            if(user) {
                setLogged(true)
              // User is signed in.
            } else {
                console.error("User not signed in")
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
            </div>
            
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