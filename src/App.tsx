import Signup from "./pages/Signup"
import Login from "./pages/Login"
import { Route, Routes } from "react-router-dom"
import Layout from "./pages/Layout"
import BlogListing from "./pages/BlogListing"
import { Toaster } from "sonner"
import { UserContextMyProvider } from "./context/userContext"
import ProtectedRoute from "./pages/ProtectedRoute"
import NewPost from "./pages/NewPost"
import BlogPage from "./pages/BlogPage"


function App() {
  console.log("check branch")
  return (
    <>
    <UserContextMyProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<BlogListing />} />
          <Route path="/blog/:blogId" element={<BlogPage />} />
        </Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/create-post" element={<NewPost />} />
        </Route>
      </Routes>
      <Toaster position="top-right"/>
    </UserContextMyProvider>
    </>
  )
}

export default App