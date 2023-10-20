import { useEffect, useState } from "react"
import { auth } from "../../config/firebase";
import { updatePassword, updateEmail, reauthenticateWithCredential, EmailAuthProvider, verifyBeforeUpdateEmail } from "firebase/auth";

import './profile.scss'
import '../../formStyle.scss'
import CustomInput from "../formComponents/CustomInput";
import CustomButton from "../formComponents/CustomButton";

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
                <div className="form-log-req-pro password-form">
                    <CustomInput type={'password'} placeholder={'Mot de passe actuel'} functionToLaunch={setPasswordForPwd} />
                    <CustomInput type={'password'} placeholder={'Nouveau mot de passe'} functionToLaunch={setNewPasswordForPwd} />
                    <CustomInput type={'password'} placeholder={'Confirmer le nouveau mot de passe'} functionToLaunch={setConfirmNewPasswordForPwd} />
                    
                    <CustomButton textContent={'Réinitialiser le mot de passe'} functionToLaunch={resetPassword} />
                </div>

                <h2>Modifier mon email</h2>

                <div className="form-log-req-pro email-form">
                    <CustomInput type={'password'} placeholder={'Mot de passe'} functionToLaunch={setPasswordForEmail} />
                    <CustomInput type={'email'} placeholder={'Nouvel email'} functionToLaunch={setNewEmail} />
                    
                    <CustomButton textContent={"Modifier l'email"} functionToLaunch={resetEmail} />
                </div>
            </div>

            

            

        </div>

    )

}