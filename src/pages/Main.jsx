import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import MainMessages from "../components/MainMessages"
import SideChat from "../components/SideChat"

function Main() {
    const [conversation, setConversation] = useState([])
    const params = useParams()
    const navigate = useNavigate

    useEffect(() => {
        if (params.conversationId) {
            fetch("http://localhost:4000/conversations")
                .then(resp => resp.json())
                .then(conversationFromServer => setConversation(conversationFromServer))
        }
    }, [])

    return <div className="main-wrapper">
        {/* <!-- Side Panel --> */}
        <aside>
            {/* <!-- Side Header --> */}
            <header className="panel">
                <img
                    className="avatar"
                    width="50"
                    height="50"
                    src="https://robohash.org/2"
                    alt=""
                />
                <h3>Tin Man</h3>
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

            <SideChat />

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