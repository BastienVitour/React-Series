import { Route, Routes } from "react-router-dom"

import Signup from "../signup/Signup"
import Login from "../login/Login"

export default function Router() {

    return(

        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
        </Routes>

    )

}