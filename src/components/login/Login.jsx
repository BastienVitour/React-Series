import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { auth } from "../../config/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import './login.scss'

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const login = async () => {
        if(email !== "" && password !== "") {
            try {
                await signInWithEmailAndPassword(auth, email, password)
            }
            catch(error) {
                console.error(error)
                setError("Erreur dans la connexion")
            }
        }
        else {
            setError("Tous les champs doivent être remplis")
        }
    }

    useEffect(() => {
        console.log(auth?.currentUser?.email)
    }, [email])

    return(

        <div className="main-login-page">
            <h1>Connexion</h1>
            <div className="login-form">
                {error !== "" && 
                    <p style={{color: 'red'}}>{error}</p>
                }
                <input className="login-input" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input className="login-input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <button className="login-submit" onClick={login}>Connexion</button>
                <Link to={'/signup'} className="signup-link">Se connecter</Link>
            </div>
        </div>

    )

}