import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

function Layout() {

  return (
    <div className="p-4 overflow-x-hidden min-h-screen dark:bg-black dark:text-white">
        <Navbar />
        <Outlet />
    </div>
  )
}

export default Layout