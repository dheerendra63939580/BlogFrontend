import Signup from "./pages/Signup"
import Login from "./pages/Login"
import { Route, Routes } from "react-router-dom"
import Layout from "./pages/Layout"
import BlogListing from "./pages/BlogListing"
import { Toaster } from "sonner"

function App() {
  console.log("check branch")
  return (
    <>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<BlogListing />} />
      </Route>
    </Routes>
    <Toaster position="top-right"/>
    </>
  )
}

export default App