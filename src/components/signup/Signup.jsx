import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { auth } from "../../config/firebase"
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"
import '../../formStyle.scss'
import Background from "./Background"

export default function Inscription() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    

    const signUp = async () => {
        if(username !== "" && email !== "" && password !== "" && confirmPassword !== "") {
            if(password === confirmPassword) {
                try {
                    await createUserWithEmailAndPassword(auth, email, password)
                    .then((result) => {
                        updateProfile(result.user, {displayName: username})
                    })
                }
                catch(error) {
                    console.error(error)
                    setError("Erreur d'inscription")
                }
            }
            else {
                setError("Les mots de passe ne sont pas identiques")
            }
        }
        else {
            setError("Tous les champs doivent être remplis")
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
        }
        catch(error) {
            console.error(error)
            setError("Erreur dans la déconnexion")
        }
    }


    useEffect(() => {
        console.log(auth?.currentUser?.displayName)
    }, [email])

    return(

        <div className="main-form">
            <h1>Inscription</h1>
            <div className="form">
                {error !== "" && 
                    <p className="error-message">{error}</p>
                }
                <input className="input" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <input className="input" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input className="input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <input className="input" type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                <button className="submit" onClick={signUp}>S'inscrire</button>
                <Link to={'/login'} className="link">Se connecter</Link>
            </div>
            
            <button onClick={logout}>Se déconnecter</button>
            
            <Background />
            
        </div>

    )

}