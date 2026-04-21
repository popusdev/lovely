import { supabase } from "../services/supabaseClient";
import { useStore } from "../services/store";
import { useEffect, useState } from "react";
import CustomSelect from "./CustomSelect";

function CreateConnection(){
    const [ email, setEmail ] = useState("")
    const [ selected, setSelected ] = useState("")
    const [ msg, setMsg ] = useState({text: "", color: ""})
    const { user, loading } = useStore()

    const handleCreating = async () => {
        if (!user) return;
        setMsg({text: "", color: ""})
        
        const { data, error } = await supabase
            .from("invites")
            .insert({
                sender: user.id,
                receiver_email: email,
            })
            .select("token")
            .single();

            if(error){
                setMsg({text: "error", color: "red"})
                console.log(error)
                return
            }

            const link = `http://localhost:5173/invite/${data.token}`;
            setMsg({text: link, color: "green"})
    }

    return(
        <>
            {msg.text ? <div className="message" style={{backgroundColor: msg.color}}>{msg.text}</div> : ""}
            <div className="center">
                <div className="createBox">
                    <div className="createHeader">create connection</div>
                    <div className="space">
                        <div className="text">receiver's email</div>
                        <input
                        className="createInput"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />

                        <CustomSelect value={selected} onChange={setSelected}/>

                        <button className="createCommit" onClick={handleCreating}>create connection</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateConnection