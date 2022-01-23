
function Login({ users, logIn }) {

    return <div className="main-wrapper login">
        <section className="login-section">
            <h2>Choose your user!</h2>
            <ul>
                {users.map(user => <li key={user.id}>
                    <button className="user-selection" onClick={() => logIn(user)}>
                        <img
                            className="avatar"
                            width="50"
                            height="50"
                            src={user.avatar}
                            alt={`${user.firstName} ${user.lastName}`}
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