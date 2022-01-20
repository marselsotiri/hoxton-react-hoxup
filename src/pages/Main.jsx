import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import MainMessages from "../components/MainMessages"
import SideChat from "../components/SideChat"

function Main({ currentUser, logOut, users }) {
    const [currentConversation, setcurrentConversation] = useState([])
    const [conversations, setConversations] = useState([])
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (currentUser === null) navigate('/')
    }, [currentUser, navigate])

    useEffect(() => {
        if (params.conversationId) {
            fetch(`http://localhost:4000/conversations/${params.conversationId}?_embed=messages`)
                .then(resp => resp.json())
                .then(conversationFromServer => setcurrentConversation(conversationFromServer))
        }
    }, [params.conversationId])

    useEffect(() => {
        if (currentUser === null) return

        fetch(`http://localhost:4000/conversations?userId=${currentUser.id}`)
            .then(resp => resp.json())
            .then(conversations => setConversations(conversations))
    }, [currentUser])

    if (currentUser === null) return <h1>Not signed in...</h1>


    return <div className="main-wrapper">
        {/* <!-- Side Panel --> */}
        <aside>
            {/* <!-- Side Header --> */}
            <header className="panel">
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

            {/* <!-- Search form --> */}
            <form className="aside__search-container">
                <input
                    type="search"
                    name="messagesSearch"
                    placeholder="Search chats"
                    value=""
                />
            </form>

            <SideChat conversations={conversations} users={users} currentUser={currentUser} />

        </aside>

        {/* <!-- Main Chat Section --> */}

        {params.conversationId ? (
            <main className="conversation">
                {/* <!-- Chat header --> */}
                <header className="panel"></header>

                <MainMessages />

                {/* <!-- Message Box --> */}
                <footer>
                    <form className="panel conversation__message-box">
                        <input
                            type="text"
                            placeholder="Type a message"
                            // @ts-ignore
                            rows="1"
                            value=""
                        /><button type="submit">
                            {/* <!-- This is the send button --> */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"
                                ></path>
                            </svg>
                        </button>
                    </form>
                </footer>
            </main>
        ) : null
        }
    </div>

}

export default Main