import { NavLink, useNavigate } from "react-router-dom"
import { useUserContext } from "../context/UserContext"
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api";
import { UserEndPoint } from "../constant";
import type { PrfileResponse } from "../types/types";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from 'usehooks-ts'
import defaultProfile from "../assets/defaultProfile.png"
import ThemeSwitcher from "./ThemeSwitcher";

function Navbar() {
  const navigate = useNavigate()
  const outsideRef = useRef(null)
  const [open, setOpen] = useState(false);
  const {userInfo, setUserInfo} = useUserContext();
  const {data, isSuccess} = useQuery<PrfileResponse, Error>({
    queryKey: ['userProfile'],
    queryFn: () => getProfile(UserEndPoint.getProfileEndpoint),
    enabled: !!localStorage.getItem("token")
    });
  useEffect(() => {
    if(isSuccess)
        setUserInfo((pre) => ({...pre, name: data?.data?.data?.name, avatar: data?.data?.data?.avatar, _id: data?.data?.data?._id}));
    }, [data]);
    const handleLogout = () => {
        localStorage.removeItem("token");
        setUserInfo((pre) => ({...pre, name: "", avatar: ""}));
        navigate("/")
    }
    const handleClickOutside = () => {
        setOpen(false)
  }
  useOnClickOutside(outsideRef as unknown as React.RefObject<HTMLElement>, handleClickOutside)

  return (
    <div className="flex justify-between items-center gap-2.5 border-b-2 border-(--secondary) sm:px-(--paddingX) sm:py-(--paddingY) mb-4">
        <h2 className="text-lg cursor-pointer" onClick={() => navigate("/")}>Blog</h2>
        <div className="flex sm:gap-2.5 items-center gap-.5">
            {!userInfo.name &&
            <>
                <div className="hover:bg-(--info) p-0.5 sm:px-(--paddingX) sm:py-(paddingY) rounded-(--radius) text-nowrap">
                    <NavLink to="/signup">Sign up</NavLink>
                </div>
                <div className="hover:bg-(--info) p-1 sm:px-(--paddingX) sm:py-(paddingY) rounded-(--radius) text-nowrap">
                    <NavLink to="/login">Log in</NavLink>
                </div>
            </> 
            }
            <div className="hover:bg-(--info) p-1 sm:px-(--paddingX) sm:py-(paddingY) rounded-(--radius) text-nowrap">
                <NavLink to="/create-post">Write Blog</NavLink>
            </div>
            {userInfo.name && 
                <div className="relative cursor-pointer">
                    <img src={userInfo?.avatar || defaultProfile} className="rounded-[50%] w-12 h-12" onClick={() => setOpen(!open)}  referrerPolicy="no-referrer"/>
                    {open && <div className="bg-(--secondary) absolute right-0 -bottom-13 px-(--paddingX) py-(--paddingY) rounded-(--radius)" ref={outsideRef}>
                        <button onClick={handleLogout} className="bg-(--info) px-(--paddingX) py-(--paddingY) rounded-(--radius)"> Logout </button>
                    </div> }
                </div>
            }
            <ThemeSwitcher />
        </div>
    </div>
  )
}

export default Navbar