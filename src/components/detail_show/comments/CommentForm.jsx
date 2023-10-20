import { useState } from "react";
import "./CommentForm.scss";
import { db, auth } from "../../../config/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function CommentForm({idShow, getComments }) {
    const [comment, setComment] = useState("");
    const commentsCollection = collection(db, 'comments');

    const sendComment = async () => {

        if(auth.currentUser.displayName !== null && auth.currentUser.displayName !== undefined) {
            try{
                await addDoc(commentsCollection, { comment: comment, id_show: idShow, username: auth.currentUser.displayName, timestamp: new Date()})
                getComments()
            }
            catch(err) {
                console.error(err)
            }
        }
    }

    return (
        <div className="divComment">
            <textarea className="texteComment" cols="30" rows="10" placeholder="Mettez un commentaire" onChange={(e) => setComment(e.target.value)}></textarea>
            <button onClick={sendComment} className="btnComment" >Submit</button>
        </div>
    )
}