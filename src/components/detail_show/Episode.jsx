
export default function Episode(show) {
    return (
    <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
        {show !== undefined && 
            <div class="carousel-inner">
                <div class="carousel-item">
                    {/* {tv.map((tv) => (
                        <Tv tv={tv} key={tv.id} />
                    ))} */}
                    <img src={'https://image.tmdb.org/t/p/original'+show.backdrop_path} alt="Show backdrop"/>
                    <img src={'https://image.tmdb.org/t/p/original'+show.backdrop_path} alt="Show backdrop"/>
                    <img src={'https://image.tmdb.org/t/p/original'+show.backdrop_path} alt="Show backdrop"/>
                    <img src={'https://image.tmdb.org/t/p/original'+show.backdrop_path} alt="Show backdrop"/>
                    <img src={'https://image.tmdb.org/t/p/original'+show.backdrop_path} alt="Show backdrop"/>
                </div>
                <div class="carousel-item">
                    <img src={'https://image.tmdb.org/t/p/original'+show.backdrop_path} alt="Show backdrop"/>
                    <img src={'https://image.tmdb.org/t/p/original'+show.backdrop_path} alt="Show backdrop"/>
                    <img src={'https://image.tmdb.org/t/p/original'+show.backdrop_path} alt="Show backdrop"/>
                    <img src={'https://image.tmdb.org/t/p/original'+show.backdrop_path} alt="Show backdrop"/>
                    <img src={'https://image.tmdb.org/t/p/original'+show.backdrop_path} alt="Show backdrop"/>
                </div>
            
            </div>
        }
    </div>
    );
}
