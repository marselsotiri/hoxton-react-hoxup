import { useEffect, useState } from "react"

function Login() {

    const [user, setUser]=useState([])

    useEffect(() => {
        fetch("http://localhost:4000/users")
        .then(resp => resp.json())
        .then(userFromServer => setUser(userFromServer))
    }, [])

    return <div className="main-wrapper login">
        <section className="login-section">
            <h2>Choose your user!</h2>
            <ul>
                {user.map(user => <li key={user.id}>
                    <button className="user-selection">
                        <img
                            className="avatar"
                            width="50"
                            height="50"
                            src = {`https://robohash.org/${user.id}`}
                            alt=""
                        />
                        <h3>{user.firstName} {user.lastName}</h3>
                    </button>
                </li>
)}
                
                <li>
                    <button className="user-selection"><h3>+ Add a new user</h3></button>
                </li>
            </ul>
        </section>
    </div>

}
export default Login