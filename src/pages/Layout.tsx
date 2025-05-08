import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

function Layout() {

  return (
    <div className="p-4">
        <Navbar />
        <Outlet />
    </div>
  )
}

export default Layout