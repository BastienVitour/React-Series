import { useEffect, useState } from "react"
import { auth } from "../../config/firebase";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider, verifyBeforeUpdateEmail } from "firebase/auth";
import { db } from "../../config/firebase";
import { collection, updateDoc, getDocs, query, where, doc, runTransaction } from "firebase/firestore";

import './profile.scss'
import '../../formStyle.scss'
import CustomInput from "../formComponents/CustomInput";
import CustomButton from "../formComponents/CustomButton";
import { useNavigate } from "react-router-dom";

export default function Profile() {

    const [user, setUser] = useState()
    const [passwordForPwd, setPasswordForPwd] = useState("")
    const [newPasswordForPwd, setNewPasswordForPwd] = useState("")
    const [confirmNewPasswordForPwd, setConfirmNewPasswordForPwd] = useState("")

    const [passwordForEmail, setPasswordForEmail] = useState("")
    const [newEmail, setNewEmail] = useState("")

    const [daysForNotif, setDaysForNotif] = useState("")
    const [document, setDocument] = useState({})
    const notifParamsCollection = collection(db, "notification_parameters")

    const navigate = useNavigate()

    const resetPassword = async () => {
        if(passwordForPwd !== "" && newPasswordForPwd !== "" && confirmNewPasswordForPwd !== "") {
            if(newPasswordForPwd === confirmNewPasswordForPwd) {
                try {
                    const credentials = EmailAuthProvider.credential(
                        auth.currentUser.email,
                        passwordForPwd
                    )
                    await reauthenticateWithCredential(auth.currentUser, credentials)
                    updatePassword(auth.currentUser, newPasswordForPwd)
                }
                catch(error) {
                    console.error(error)
                }
            }
        }
    }

    const resetEmail = async () => {
        if(passwordForEmail !== "" && newEmail) {
            
            try {
                const credentials = EmailAuthProvider.credential(
                    auth.currentUser.email,
                    passwordForEmail
                )
                reauthenticateWithCredential(auth.currentUser, credentials)
                .then(() => {
                    verifyBeforeUpdateEmail(auth.currentUser, newEmail)
                    alert("un mail a été envoyé")
                    alert("Vous allez devoir vous reconnecter")
                    navigate("/login")
                })
            }
            catch(error) {
                console.error(error)
            }
            
        }
    }

    const updateNotifParams = async () => {
        try {
            let docToUpdate = doc(db, "notification_parameters", document.id)
            await updateDoc(docToUpdate, {days: daysForNotif})
            window.location.reload()
        }
        catch(error) {
            console.error(error)
        }
    }

    const getNotifParams = async () => {
        const q = query(notifParamsCollection, where("id_user", "==", auth.currentUser.uid))
        const notifParams = await getDocs(q)
        const data = notifParams.docs.map((doc) => ({...doc.data(), id: doc.id}))[0]
        setDocument(data)
        setDaysForNotif(data.days)
    }

    useEffect(() => {
        auth.onAuthStateChanged(function(user) {
            if (user) {
                setUser(auth.currentUser)
                getNotifParams()
              // User is signed in.
            } else {
                navigate("/login")
              // No user is signed in.
            }
        });
    }, [])

    return(

        <div className="main-profile-page">
            <h1>Bonjour, {user && user.displayName}</h1>

            <div className="main-form profile-form">

                <h2>Modifier le mot de passe</h2>
                <div className="form-log-req-pro password-form">
                    <CustomInput type={'password'} placeholder={'Mot de passe actuel'} functionToLaunch={setPasswordForPwd} />
                    <CustomInput type={'password'} placeholder={'Nouveau mot de passe'} functionToLaunch={setNewPasswordForPwd} />
                    <CustomInput type={'password'} placeholder={'Confirmer le nouveau mot de passe'} functionToLaunch={setConfirmNewPasswordForPwd} />
                    
                    <CustomButton textContent={'Réinitialiser le mot de passe'} functionToLaunch={resetPassword} />
                </div>

                <h2>Modifier l'email</h2>

                <div className="form-log-req-pro email-form">
                    <CustomInput type={'password'} placeholder={'Mot de passe'} functionToLaunch={setPasswordForEmail} />
                    <CustomInput type={'email'} placeholder={'Nouvel email'} functionToLaunch={setNewEmail} />
                    
                    <CustomButton textContent={"Modifier l'email"} functionToLaunch={resetEmail} />
                </div>

                <h2>Modifier les préférences de notification</h2>

                <p>Combien de jours avant la sortie d'un épisode voulez-vous recevoir une notification ?</p>
                <select onChange={(e) => setDaysForNotif(e.target.value)} value={daysForNotif} className="notif-select">
                    <option value="0">Aucune notification</option>
                    <option value="1">1 jour</option>
                    <option value="2">2 jours</option>
                    <option value="3">3 jours</option>
                    <option value="6">Une semaine</option>
                </select>
                <CustomButton textContent={'Valider'} functionToLaunch={updateNotifParams} />

            </div>
        </div>

    )

}