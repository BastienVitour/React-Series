import { useEffect, useState } from "react"
import { auth } from "../../config/firebase";
import { updatePassword, updateEmail, reauthenticateWithCredential, EmailAuthProvider, verifyBeforeUpdateEmail } from "firebase/auth";

import './profile.scss'
import '../../formStyle.scss'

export default function Profile() {

    const [user, setUser] = useState()
    const [passwordForPwd, setPasswordForPwd] = useState("")
    const [newPasswordForPwd, setNewPasswordForPwd] = useState("")
    const [confirmNewPasswordForPwd, setConfirmNewPasswordForPwd] = useState("")

    const [passwordForEmail, setPasswordForEmail] = useState("")
    const [newEmail, setNewEmail] = useState("")

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
                })
            }
            catch(error) {
                console.error(error)
            }
            
        }
    }

    useEffect(() => {
        auth.onAuthStateChanged(function(user) {
            if (user) {
                setUser(auth.currentUser)
              // User is signed in.
            } else {
                console.error("User not signed in")
              // No user is signed in.
            }
        });
    })

    return(

        <div className="main-profile-page">
            <h1>Bonjour, {user && user.displayName}</h1>

            <div className="main-form profile-form">

                <h2>Modifier mon mot de passe</h2>
                <div className="form password-form">
                    <input className="input" type="password" placeholder="Mot de passe actuel" onChange={(e) => setPasswordForPwd(e.target.value)} />
                    <input className="input" type="password" placeholder="Nouveau mot de passe" onChange={(e) => setNewPasswordForPwd(e.target.value)} />
                    <input className="input" type="password" placeholder="Confirmer le nouveau mot de passe" onChange={(e) => setConfirmNewPasswordForPwd(e.target.value)} />

                    <button className="submit" onClick={resetPassword}>Réinitialiser le mot de passe</button>
                </div>

                <h2>Modifier mon email</h2>

                <div className="form email-form">
                    <input className="input" type="password" placeholder="Mot de passe" onChange={(e) => setPasswordForEmail(e.target.value)} />
                    <input className="input" type="email" placeholder="Nouvel email" onChange={(e) => setNewEmail(e.target.value)} />

                    <button className="submit" onClick={resetEmail}>Réinitialiser l'email</button>
                </div>
            </div>

            

            

        </div>

    )

}