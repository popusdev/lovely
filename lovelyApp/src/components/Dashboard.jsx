import { useStore } from "../services/store"

function Dashboard(){
    const { user } = useStore()

    console.log(user)

    return(
        <>
            {user.email}
        </>
    )
}

export default Dashboard