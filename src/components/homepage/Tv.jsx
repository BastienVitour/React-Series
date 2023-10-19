import React from 'react';
import './homepage.scss';
import Background from '../signup/Background';

export default function Tv({tv, featured}) {
  return (
    <>
{
 featured ? (
 <>

  <div className="featured" >
     <a href={"/show/"+tv.id} className="tv-link" aria-label={`View details for ${tv.name}`}>
      <img  src={'https://image.tmdb.org/t/p/original'+tv.backdrop_path} alt='TV POSTER MAXITEST' />
     </a>
     <div className='text-featured'>
      <h1 >{tv.name} </h1>
      <p>{tv.overview}</p>
     </div>
  </div>

 </>
 )
: ( <div className="single-tv">
     <a href={"/show/"+tv.id} className="tv-link" aria-label={`View details for ${tv.name}`}>
         <img src={'https://image.tmdb.org/t/p/w500'+tv.poster_path} alt="TV poster" />&nbsp;
           <div>
            <p className='single-line'>{tv.name} - {tv.vote_average} ⭐️</p>
            </div>
     </a>
 </div>
 )
}
    </>
  )

}
