import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [user, setUser] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then(resp => resp.json())
      .then(userFromServer => setUser(userFromServer))
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

    <Route path="/login" element={<Login user={user} logIn={logIn}/>} />

    <Route path="/logged-in" element={<Main users={user} currentUser={currentUser} logOut={logOut} />} />

    <Route path="/logged-in/:conversationId" element={<Main users={user} currentUser={currentUser} logOut={logOut} />} />

    {/* <Route path="*" element={<NotFound />} /> */}

  </Routes>

}
