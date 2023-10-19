import { Route, Routes } from "react-router-dom"

import Signup from "../signup/Signup"
import Login from "../login/Login"
import Calendar from "../calendar/Calendar"
import Profile from "../profile/Profile"
// import Notifications from "../notifications/Notifications"
import Show from "../detail_show/DetailShow";

export default function Router() {

    return(

        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="/notifications" element={<Notifications />} /> */}
            <Route path="/show/:id" element={<Show />} />
        </Routes>

    )

}