function SideChat({ conversations, currentUser, users }) {
  return <ul>
    {/* <!-- This first item should always be present --> */}

    <li>
      <button className="chat-button">
        <div><h3>+ Start a new Chat</h3></div>
      </button>
    </li>
    {conversations.map(conversation => {

      const talkingToId =
        currentUser.id === conversation.userId
          ? conversation.participantId
          : conversation.userId

      const talkingToUser = users.find(user => user.id === talkingToId)


      return <li>
        <button className="chat-button">
          <img
            className="avatar"
            height="50"
            width="50"
            alt=""
            src={talkingToUser.avatar}
          />
          <div>
            <h3>{talkingToUser.firstName} {talkingToUser.lastName}</h3>
            <p>Last message</p>
          </div>
        </button>
      </li>
    })
    }
  </ul>

}

export default SideChat