export default function NotifsDiv({ listShows, display }) {

    return(

        <div className="notifs-div" style={{display: display ? 'block' : 'none' }}>
            { 
                listShows.map((show) => {
                    let diffTime = new Date(show.next_episode_to_air.air_date) - new Date()
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                    if(diffDays == 0 || diffDays == -0) {
                        return(
                            <div className="show-notif" key={show.id}>
                                <span>Un épisode de {show.name} sort aujourd'hui !</span>
                                <hr />
                            </div>
                        )
                    }
                })
            }
            {
                listShows.map((show) => {
                    let diffTime = new Date(show.next_episode_to_air.air_date) - new Date()
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                    if(diffDays == 1) {
                        return(
                            <div className="show-notif" key={show.id}>
                                <span>Un épisode de {show.name} sort demain !</span>
                                <hr />
                            </div>
                        )
                    }
                })
            }
            {
                listShows.map((show) => {
                    let diffTime = new Date(show.next_episode_to_air.air_date) - new Date()
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                    if(diffDays > 1) {
                        return(
                            <div className="show-notif" key={show.id}>
                                <span>Un épisode de {show.name} sort dans {diffDays} jours !</span>
                                <hr />
                            </div>
                        )
                    }
                })
            }
        </div>

    )

}