import React from 'react';
import "../../../public/heart.svg";
import { useState } from 'react';
import { HeartFill} from 'react-bootstrap-icons'
import cn from 'classnames';


const LikeButton = () => {
  const [liked, setLiked] = useState(null);
  const [clicked, setClicked] = useState(false);

  return (
    <button
      onClick={() => {
        setLiked(!liked);
        setClicked(true);
      }}
      onAnimationEnd={() => setClicked(false)}
      className={cn("like-button-wrapper", {
        liked,
        clicked,
      })}
    >
      <div className="like-button">
        <HeartFill />
        <span>Like</span>
        <span className={cn("suffix", { liked })}>d</span>
      </div>
    </button>
  );
};

export default LikeButton;
