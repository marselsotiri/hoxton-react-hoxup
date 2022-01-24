import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [users, setUsers] = useState([])
  const [modal, setModal] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then(resp => resp.json())
      .then(userFromServer => setUsers(userFromServer))
  }, [])

  function logIn(user){
    setCurrentUser(user)
    navigate('/logged-in')
  }

  function logOut() {
    setCurrentUser(null)
  }

  return <Routes>

    <Route index element={<Navigate replace to="/login" />} />

    <Route path="/login" element={<Login users={users} setUsers={setUsers} logIn={logIn} modal={modal} setModal={setModal} />} />

    <Route path="/logged-in" element={<Main users={users} currentUser={currentUser} logOut={logOut} modal={modal} setModal={setModal} />} />

    <Route path="/logged-in/:conversationId" element={<Main users={users} currentUser={currentUser} logOut={logOut} modal={modal} setModal={setModal} />} />

    {/* <Route path="*" element={<NotFound />} /> */}

  </Routes>

}
