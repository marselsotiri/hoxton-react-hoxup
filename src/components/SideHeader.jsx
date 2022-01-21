function SideHeader({ currentUser, logOut }) {
    return <header className="panel">
        <img
            className="avatar"
            width="50"
            height="50"
            src={currentUser.avatar}
            alt={`${currentUser.firstName} ${currentUser.lastName}`}
        />
        <h3>{currentUser.firstName}</h3>
        <button onClick={() => logOut()}>LOG OUT</button>
    </header>
}
export default SideHeader