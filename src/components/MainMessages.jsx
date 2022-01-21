function MainMessages({ currentConversation, currentUser }) {
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