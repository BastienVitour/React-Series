import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../../config/firebase"
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"
import '../../formStyle.scss'
import Background from "./Background"
import CustomInput from "../formComponents/CustomInput"
import CustomButton from "../formComponents/CustomButton"

export default function Inscription() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const signUp = async () => {
        if(username !== "" && email !== "" && password !== "" && confirmPassword !== "") {
            if(password === confirmPassword) {
                try {
                    await createUserWithEmailAndPassword(auth, email, password)
                    .then((result) => {
                        updateProfile(result.user, {displayName: username})
                        navigate('/')
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
            <div className="form-log-req-pro">
                {error !== "" && 
                    <p className="error-message">{error}</p>
                }
                <CustomInput placeholder={'Pseudo'} type={'text'} functionToLaunch={setUsername} />
                <CustomInput placeholder={'Email'} type={'email'} functionToLaunch={setEmail} />
                <CustomInput placeholder={'Mot de passe'} type={'password'} functionToLaunch={setPassword} />
                <CustomInput placeholder={'Confirmer mot de passe'} type={'password'} functionToLaunch={setConfirmPassword} />
                <CustomButton textContent={"S'inscrire"} functionToLaunch={signUp} />
                <Link to={'/login'} className="link">Se connecter</Link>
            </div>
            
            <Background />
            
        </div>

    )

}