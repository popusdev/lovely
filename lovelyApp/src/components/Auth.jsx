import { supabase } from "../services/supabaseClient"
import { useState } from "react"

function Auth(){
    const [ page, setPage ] = useState("signup")

    return (
        <>
            <div className="center">
                <div className="authBox">
                    <div onClick={() => {setPage("signup")}} className={`signUpButton ${page == "signup" ? "activeButton" : ""}`}>
                        Sign up
                    </div>
                    <div onClick={() => {setPage("login")}} className={`logInButton ${page == "login" ? "activeButton" : ""}`}>
                        Log in
                    </div>
                </div>
            </div>
        </>
    )
}

export default Auth