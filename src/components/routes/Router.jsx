import { Route, Routes } from "react-router-dom"

import Signup from "../signup/Signup"
import Login from "../login/Login"
import Calendar from "../calendar/Calendar"
import Profile from "../profile/Profile"
import Show from "../detail_show/DetailShow";
import Homepage from "../homepage/Homepage"
import SearchPage from "../search/Search"

export default function Router() {

    return(

        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/show/:id" element={<Show />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path='*' element={<Homepage />} />
        </Routes>

    )

}
