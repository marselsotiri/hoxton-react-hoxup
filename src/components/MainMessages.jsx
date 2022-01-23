function MainMessages({ currentConversation, currentUser }) {

    if (currentConversation === null) return <h1>Loading...</h1>

    return <ul className="conversation__messages">
        {currentConversation.map(message => {
            return <li key={message.id} className={message.userId === currentUser.id ? 'outgoing' : null} >
                <p>
                    {message.messageText}
                </p>
            </li>
        })
        }

    </ul>

}

export default MainMessages