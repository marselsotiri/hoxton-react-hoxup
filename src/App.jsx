import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";

export default function App() {
  return <Routes>

    <Route index element={<Navigate replace to="/login" />} />

    <Route path="/login" element={<Login /> } />

    <Route path="/logged-in" element={<Main /> } />

    <Route path="/logged-in/:conversationId" element={<Main /> } />

    {/* <Route path="*" element={<NotFound />} /> */}

  </Routes>

}
