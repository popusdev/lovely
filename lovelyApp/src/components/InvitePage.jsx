import { useParams, useNavigate, Navigate } from "react-router-dom"
import { useStore } from "../services/store";
import { supabase } from "../services/supabaseClient";
import { useEffect, useState } from "react";

function InvitePage(){
    const token = useParams()
    const { user, loading } = useStore()
    const navigate = useNavigate()
    
    const [ invite, setInvite ] = useState(null)
    const [ msg, setMsg ] = useState({text: text, color: color})
    const [ processing, setProcessing ] = useState(null)

    useEffect(() => {
        const FetchInvite = async () => {
            const { data, error } = await supabase
                .from("invites")
                .select("*")
                .eq("token", token)
                .single()

            if(error){
                setMsg({text: "invitation not found", color: "red"})
                return
            }
            setInvite(data)
        }
        FetchInvite()
    }, [token])

    if (!user) return <Navigate to="/" state={{ inviteToken: token }} />

    if (invite.status === "accepted") {
        setMsg({text: "the invitation has already been used", color: "red"})
        return
    }

    if (invite.sender === user.id) {
        setMsg({text: "you can't invite yourself", color: "red"})
        return
    }

    const handleAccept = async () => {
    setProcessing(true)
    setMsg({text: "", color: ""})

    await supabase
      .from("invites")
      .update({ status: "accepted" })
      .eq("token", token);

    const { data, error } = await supabase
      .from("connections")
      .insert({
        user1: invite.sender,
        user2: user.id,
        status: "active",
      })
      .select()
      .single();

      if(error){
        setMsg({text: "creating connection failed", color: "red"})
        setProcessing(false)
        return
      }
    }

    return(
        <>
            {msg ? <div className="message" style={{backgroundColor: msg.color}}>{msg.text}</div> : ""}
            <div className="center">
                
            </div>
        </>
    )
}

export default InvitePage