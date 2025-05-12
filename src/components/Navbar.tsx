import { NavLink } from "react-router-dom"
import { useUserContext } from "../context/userContext"
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api";
import { UserEndPoint } from "../constant";
import type { PrfileResponse } from "../types/types";
import { useEffect, useRef, useState, type RefObject } from "react";
import { useOnClickOutside } from 'usehooks-ts'

function Navbar() {

  const outsideRef = useRef<RefObject<HTMLElement> | RefObject<HTMLElement>[]>(null)
  const [open, setOpen] = useState(false);
  const {userInfo, setUserInfo} = useUserContext();
  const {data, isSuccess} = useQuery<PrfileResponse, Error>({
    queryKey: ['userProfile'],
    queryFn: () => getProfile(UserEndPoint.getProfileEndpoint),
    });
  useEffect(() => {
    if(isSuccess)
        setUserInfo((pre) => ({...pre, name: data?.data?.data?.name, avatar: data?.data?.data?.avatar}));
    }, [data]);
    const handleLogout = () => {
        localStorage.removeItem("token");
        setUserInfo((pre) => ({...pre, name: "", avatar: ""}))
    }
    const handleClickOutside = () => {
        setOpen(false)
  }
  useOnClickOutside(outsideRef, handleClickOutside)

  return (
    <div className="flex justify-between gap-2.5 border-b-2 border-(--secondary) px-(--paddingX) py-(--paddingY) mb-4">
        <h2 className="text-lg">Blog</h2>
        <div className="flex gap-2.5 items-center">
            {!userInfo.name &&
            <>
                <div className="hover:bg-(--info) px-(--paddingX) py-(paddingY) rounded-(--radius)">
                    <NavLink to="/signup">Sign up</NavLink>
                </div>
                <div className="hover:bg-(--info) px-(--paddingX) py-(paddingY) rounded-(--radius)">
                    <NavLink to="/login">Log in</NavLink>
                </div>
            </> 
            }
            <div className="hover:bg-(--info) px-(--paddingX) py-(paddingY) rounded-(--radius)">
                <NavLink to="/create-post">Write Blog</NavLink>
            </div>
            {userInfo.name && 
                <div className="relative cursor-pointer">
                    <img src={userInfo.avatar} className="rounded-[50%] w-12 h-12" onClick={() => setOpen(!open)}  referrerPolicy="no-referrer"/>
                    {open && <div className="bg-(--secondary) absolute right-0 -bottom-13 px-(--paddingX) py-(--paddingY) rounded-(--radius)" ref={outsideRef}>
                        <button onClick={handleLogout} className="bg-(--info) px-(--paddingX) py-(--paddingY) rounded-(--radius)"> Logout </button>
                    </div> }
                </div>
            }
        </div>
    </div>
  )
}

export default Navbar