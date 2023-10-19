import React from 'react';

class Comment extends React.Component {
  render() {
    const { author, text, date } = this.props;

    return (
      <div className="comment">
        <div className="comment-author">{author}</div>
        <div className="comment-text">{text}</div>
        <div className="comment-date">{date}</div>
      </div>
    );
  }
}

export default Comment;