import { supabase } from "../services/supabaseClient";
import { useStore } from "../services/store";
import { useState } from "react";
import CreateConnection from "./CreateConnection";
import { Navigate, useNavigate } from "react-router-dom";

function Dashboard(){
    const { user, connections } = useStore()
    const navigate = useNavigate()

    console.log(connections)

    return(
        <>
            <div className="center">
                <div className="width">
                    <div className="dashboardBox">
                        <div className="dashboardWelcome">
                            welcome, {user?.user_metadata?.display_name}
                        </div>
                        <div className="dashboardConnections">
                            {connections.length == 0 ? 
                            <div className="connectionCreateDiv">
                                <button className="connectionCreateButton" onClick={() => navigate("/createconnection")}>create a connection</button>
                            </div>
                            : 
                            <div className="connectionEx">

                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard