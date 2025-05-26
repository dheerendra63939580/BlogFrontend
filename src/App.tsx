"use client";
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
import { ErrorBoundary } from "react-error-boundary";

function App() {
  console.log("check branch")
  return (
    <>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
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
            <Route path="/update-blog/:blogId" element={<NewPost />} />
          </Route>
        </Routes>
        <Toaster position="top-right"/>
      </UserContextMyProvider>
    </ErrorBoundary>
    </>
  )
}

export default App