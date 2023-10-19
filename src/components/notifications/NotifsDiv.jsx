export default function NotifsDiv({ listShows, display }) {

    return(

        <div className="notifs-div" style={{display: display ? 'block' : 'none' }}>
            { 
                listShows.map((show) => {
                    if((show.next_episode_to_air.air_date == new Date().toISOString().substring(0, 10))) {
                        return(
                            <div className="show-notif">
                                <span>Un épisode de {show.name} sort aujourd'hui !</span>
                                <hr />
                            </div>
                        )
                    }
                })
            }
            {
                listShows.map((show) => {
                    if((show.next_episode_to_air.air_date != new Date().toISOString().substring(0, 10))) {
                        return(
                            <div className="show-notif">
                                <span>Un épisode de {show.name} sort demain !</span>
                                <hr />
                            </div>
                        )
                    }
                })
            }
        </div>

    )

}