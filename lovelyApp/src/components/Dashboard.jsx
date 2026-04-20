import { useStore } from "../services/store"

function Dashboard(){
    const { user, connections } = useStore()

    console.log(connections)

    return(
        <>
            <div className="center">
                <div className="width">
                    <div className="dashboardBox">
                        <div className="dashboardWelcome">
                            welcome, {user.user_metadata.display_name}
                        </div>
                        <div className="dashboardConnections">
                            {connections.length == 0 ? 
                            <div className="connectionCreateDiv">
                                <button className="connectionCreateButton">create a connection</button>
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