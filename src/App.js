import { Routes, Route } from "react-router-dom"
import Home from "./routes/Home"
import ErrorPage from "./routes/ErrorPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default App