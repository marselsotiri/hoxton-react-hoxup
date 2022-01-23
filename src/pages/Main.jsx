import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import FormMessage from "../components/FormMessage"
import MainMessages from "../components/MainMessages"
import ModalNewChat from "../components/ModalNewChat"
import Search from "../components/Search"
import SideChat from "../components/SideChat"
import SideHeader from "../components/SideHeader"

function Main({ currentUser, logOut, users, modal, setModal }) {
    const [conversations, setConversations] = useState([])
    const [currentConversation, setcurrentConversation] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    function createMessage(text) {
        // create a message on the server ✅

        fetch('http://localhost:4000/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: currentUser.id,
                messageText: text,
                conversationId: Number(params.conversationId)
            })
        })
            .then(resp => resp.json())
            .then(newMessage => {
                const currentConversationCopy = JSON.parse(
                    JSON.stringify(currentConversation)
                )
                currentConversationCopy.push(newMessage)
                setcurrentConversation(currentConversationCopy)
            })

        // update the conversation state
    }

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

    const usersIHaveNotTalkedToYet = users.filter(user => {
        // when do I want to keep this user?

        // don't show the currently logged in user
        if (currentUser && user.id === currentUser.id) return false

        // don't show any users in conversations
        // Is this user's id in the conversations?
        // Is it either in userId or participantId
        for (const conversation of conversations) {
            if (conversation.userId === user.id) return false
            if (conversation.participantId === user.id) return false
        }
        // at this point we know this user's id is not anywhere in the conversations
        // so we want to keep it
        return true
    })

    function createConversation(participantId) {
        fetch('http://localhost:4000/conversations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: currentUser.id,
                participantId: participantId
            })
        })
            .then(resp => resp.json())
            .then(newConversation => {
                setConversations([...conversations, newConversation])
                setModal('')
            })
    }

    if (currentUser === null) return <h1>Not signed in...</h1>


    return <div className="main-wrapper">
        {/* <!-- Side Panel --> */}
        <aside>
            {/* <!-- Side Header --> */}

            <SideHeader currentUser={currentUser} logOut={logOut} />

            {/* <!-- Search form --> */}

            <Search />

            {/* <!-- Side Chat --> */}

            <SideChat conversations={conversations} users={users} currentUser={currentUser} setModal={setModal} />

        </aside>

        {/* <!-- Main Chat Section --> */}

        {params.conversationId ? (
            <main className="conversation">
                {/* <!-- Chat header --> */}
                <header className="panel"></header>

                <MainMessages currentConversation={currentConversation} currentUser={currentUser} />

                {/* <!-- Message Box --> */}
                <footer>

                    <FormMessage createMessage={createMessage} />

                </footer>
            </main>
        ) : null
        }
        {modal === 'start-chat' ? (
            <ModalNewChat setModal={setModal} usersIHaveNotTalkedToYet={usersIHaveNotTalkedToYet} createConversation={createConversation} />
        ) : null}
    </div>

}

export default Main