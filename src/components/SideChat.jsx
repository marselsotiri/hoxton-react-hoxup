import { useNavigate } from "react-router-dom";

function SideChat({
  conversationsToDisplay,
  currentUser,
  users,
  setModal,
  search,
}) {
  const navigate = useNavigate();

  return (
    <ul>
      {/* <!-- This first item should always be present --> */}

      <li>
        <button
          className="chat-button"
          onClick={() => {
            // display a "start-chat" modal ✅
            setModal("start-chat");
          }}
        >
          <div>
            <h3>+ Start a new Chat</h3>
          </div>
        </button>
      </li>

      {conversationsToDisplay.map((conversation) => {
        const talkingToId =
          currentUser.id === conversation.userId
            ? conversation.participantId
            : conversation.userId;

        const talkingToUser = users.find((user) => user.id === talkingToId);
        if (
          !talkingToUser.firstName.toLowerCase().includes(search.toLowerCase()) &&
          !talkingToUser.lastName.toLowerCase().includes(search.toLowerCase())
        )
          return null;

        return (
          <li key={talkingToUser.id}>
            <button
              className="chat-button"
              onClick={() => {
                navigate(`/logged-in/${conversation.id}`);
              }}
            >
              <img
                className="avatar"
                height="50"
                width="50"
                alt={talkingToUser.firstName}
                src={talkingToUser.avatar}
              />
              <div>
                <h3>
                  {talkingToUser.firstName} {talkingToUser.lastName}
                </h3>
                <p>Last message</p>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default SideChat;
