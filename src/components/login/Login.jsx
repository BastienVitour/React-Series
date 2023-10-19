import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { auth } from "../../config/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import '../../formStyle.scss'
import Background from "../signup/Background"

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

        <div className="main-form">
            <h1>Connexion</h1>
            <div className="form">
                {error !== "" && 
                    <p style={{color: 'red'}}>{error}</p>
                }
                <input className="input" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input className="input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <button className="submit" onClick={login}>Connexion</button>
                <Link to={'/signup'} className="link">S'inscrire</Link>
            </div>

            <Background />

        </div>

    )

}