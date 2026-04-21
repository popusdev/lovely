import { supabase } from "../services/supabaseClient";
import { useStore } from "../services/store";
import { useState } from "react";
import CreateConnection from "./CreateConnection";
import { Navigate, useNavigate } from "react-router-dom";

function Dashboard(){
    const { user, connections, invites } = useStore()
    const navigate = useNavigate()

    console.log(connections, invites)

    return(
        <>
            <div className="center">
                <div className="width">
                    <div className="dashboardBox">
                        <div className="dashboardWelcome">
                            welcome, {user?.user_metadata?.display_name}
                        </div>
                        <div className="dashboardConnections">
                            {invites.length == 0 ? 
                            <div className="connectionCreateDiv">
                                <button className="connectionCreateButton" onClick={() => navigate("/createconnection")}>create a connection</button>
                            </div>
                            : 
                            <div className="connectionCreateDiv">
                                {invites.map((invite) => (
                                <div key={invite.id} className="connectionNavigate" onClick={() => {
                                                                                                if (invite.status !== "accepted") return;
                                                                                                    navigate(`/connection/${invite.id}`);
                                                                                                }}>
                                    <div className="connectionStatus">
                                    status: {invite.status}
                                    </div>
                                    <div className="connectionName">
                                    {invite.receiver_email}
                                    </div>
                                </div>
                                ))}
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard