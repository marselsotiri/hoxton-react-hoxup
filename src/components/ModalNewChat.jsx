function ModalNewChat({ setModal, usersIHaveNotTalkedToYet, createConversation }) {
    return <div className='modal-wrapper'>
        <div className='modal'>
            <button className='close-modal' onClick={() => setModal('')}>
                X
            </button>
            <h1>Start chat</h1>
            {/* 
  this modal should display all users
  I have no conversations with yet ✅
*/}
            {usersIHaveNotTalkedToYet.length > 0 ? (
                <ul>
                    {usersIHaveNotTalkedToYet.map(user => (
                        <li key={user.id}>
                            <button
                                className='chat-button'
                                onClick={() => {
                                    // clicking on one of those users
                                    // should start a conversation with them
                                    // how do we start a conversation?
                                    // - create a conversation on the server
                                    // - update conversations state
                                    createConversation(user.id)
                                }}
                            >
                                <img
                                    className='avatar'
                                    height='50'
                                    width='50'
                                    alt=''
                                    src={user.avatar}
                                />
                                <div>
                                    <h3>
                                        {user.firstName} {user.lastName}
                                    </h3>
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No new person to talk to</p>
            )}
        </div>
    </div>
}

export default ModalNewChat