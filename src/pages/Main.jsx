import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import FormMessage from "../components/FormMessage"
import MainMessages from "../components/MainMessages"
import Search from "../components/Search"
import SideChat from "../components/SideChat"
import SideHeader from "../components/SideHeader"

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
            fetch(`http://localhost:4000/messages?conversationId=${params.conversationId}`)
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

            <SideHeader currentUser={currentUser} logOut={logOut} />

            {/* <!-- Search form --> */}

            <Search />

            {/* <!-- Side Chat --> */}

            <SideChat conversations={conversations} users={users} currentUser={currentUser} />

        </aside>

        {/* <!-- Main Chat Section --> */}

        {params.conversationId ? (
            <main className="conversation">
                {/* <!-- Chat header --> */}
                <header className="panel"></header>

                <MainMessages currentConversation={currentConversation} currentUser={currentUser} />

                {/* <!-- Message Box --> */}
                <footer>

                    <FormMessage />

                </footer>
            </main>
        ) : null
        }
    </div>

}

export default Main