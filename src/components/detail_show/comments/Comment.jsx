import "./Comment.scss";

export default function Comment({ comment }){

  return (
      <div className="commentform">
        {comment.username}
        <br />
        {comment.comment}
      </div>
  )
}