import { NavLink } from "react-router-dom"

function Navbar() {
    
  return (
    <div className="flex justify-between gap-2.5 border-b-2 border-(--secondary) px-(--paddingX) py-(--paddingY)">
        <h2 className="text-lg">Blog</h2>
        <div className="flex gap-2.5">
            <div className="hover:bg-(--info) px-(--paddingX) py-(paddingY) rounded-(--radius)">
                <NavLink to="/signup">Sign up</NavLink>
            </div>
            <div className="hover:bg-(--info) px-(--paddingX) py-(paddingY) rounded-(--radius)">
                <NavLink to="/login">Log in</NavLink>
            </div>
            <div className="hover:bg-(--info) px-(--paddingX) py-(paddingY) rounded-(--radius)">
                <NavLink to="/">Write Blog</NavLink>
            </div>
        </div>
    </div>
  )
}

export default Navbar