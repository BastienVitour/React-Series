import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth, db } from "../../config/firebase"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { addDoc, collection } from "firebase/firestore"
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

    const notifParamsCollection = collection(db, "notification_parameters")

    const navigate = useNavigate()

    const signUp = async () => {
        if(username !== "" && email !== "" && password !== "" && confirmPassword !== "") {
            if(password === confirmPassword) {
                try {
                    await createUserWithEmailAndPassword(auth, email, password)
                    .then(async (result) => {
                        updateProfile(result.user, {displayName: username})
                        await addDoc(notifParamsCollection, {days: "1", id_user: result.user.uid})
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