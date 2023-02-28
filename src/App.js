import { Routes, Route } from "react-router-dom"
import Layout from "./routes/Layout"
import Home from "./routes/Home"
import Login from "./routes/Login"
import ErrorPage from "./routes/ErrorPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} children={[
        <Route path="/" element={<Home />} />,
        <Route path="/login" element={<Login />} />,
        <Route path="*" element={<ErrorPage />} />
      ]} />
    </Routes>
  )
}

export default App