import { Route, Routes } from "react-router-dom"

import Signup from "../signup/Signup"
import Login from "../login/Login"
import Calendar from "../calendar/Calendar"

export default function Router() {

    return(

        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/calendar" element={<Calendar />} />
        </Routes>

    )

}