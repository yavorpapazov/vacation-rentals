import { Routes, Route } from "react-router-dom"
import Layout from "./routes/Layout"
import Home from "./routes/Home"
import SingleBnb from "./components/SingleBnb"
import Login from "./routes/Login"
import ErrorPage from "./routes/ErrorPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/bnbs/:id" element={<SingleBnb />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default App