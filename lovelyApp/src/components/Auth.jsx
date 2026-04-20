import { supabase } from "../services/supabaseClient"
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useStore } from "../services/store"

function Auth(){

    const [ page, setPage ] = useState("signup")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ signUpEmail, setSignUpEmail ] = useState("")
    const [ signUpPassword, setSignUpPassword ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const [ rememberMe, setRememberMe ] = useState(false)
    const [ msg, setMsg ] = useState({ text: "", color: ""})
    const navigate = useNavigate()
    const username = signUpEmail.split("@")[0]

    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMsg({text: "", color: ""})

        const { data, error } = await supabase.auth.signUp({
            email: signUpEmail,
            password: signUpPassword,
            options : {
                data : {
                    display_name : username
                }
            }
        })

        if(error){
            setMsg({text: `${error.message}`, color: "red"})
        }else{
            setMsg({text: "account created", color: "green"})
        }

        setLoading(false)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMsg({text: "", color: ""})

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if(error){
            setMsg({text: `${error.message}`, color: "red"})
        }else{
            setMsg({text: "logged in!", color: "green"})
        }

        navigate("/dashboard")
        setLoading(false)
    }

    return (
        <>
            {msg ? <div className="message" style={{backgroundColor: msg.color}}>{msg.text}</div> : ""}
            <div className="center">
                <div className="authBox">
                    <div className="row">
                        <div onClick={() => {setPage("signup")}} className={`signUpButton ${page == "signup" ? "activeButton" : ""}`}>
                            Sign up
                        </div>
                        <div onClick={() => {setPage("login")}} className={`logInButton ${page == "login" ? "activeButton" : ""}`}>
                            Log in
                        </div>
                    </div>
                    {page == "signup" ? 
                    <div className="signUpPage">
                        <div className="width">
                            <div className="text">email</div>
                            <input 
                            type="email"
                            className="authInput"  
                            value={signUpEmail}
                            onChange={(e) => setSignUpEmail(e.target.value)}
                            />
                        </div>
                        <div className="width">
                            <div className="text">password</div>
                            <input 
                            type="password"
                            className="authInput" 
                            value={signUpPassword}
                            onChange={(e) => setSignUpPassword(e.target.value)}
                            />
                        </div>
                        <button onClick={handleRegister} className="signUpCommit">{loading ? "signing up..." : "sign up"}</button>
                    </div>
                    : <div className="signUpPage">
                        <div className="width">
                            <div className="text">email</div>
                            <input 
                            type="email"
                            className="authInput"  
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="width">
                            <div className="text">password</div>
                            <input 
                            type="password"
                            className="authInput" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="row">
                            <input 
                            id="rememberButton"
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor="rememberButton">Remember me?</label>
                        </div>
                        <button onClick={handleLogin} className="signUpCommit">{loading ? "logining in..." : "log in"}</button>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default Auth