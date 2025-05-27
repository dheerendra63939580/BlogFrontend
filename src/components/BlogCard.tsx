import { useNavigate } from "react-router-dom"
import { useState, useRef, type RefObject } from "react"
import defaultProfile from "../assets/defaultProfile.png"
import type { BlogObject } from "../types/types"
import { format } from "date-fns"
import { MessageCircle, ThumbsUp, EllipsisVertical, SquarePen, CircleX } from "lucide-react"
import { useOnClickOutside } from 'usehooks-ts'
import { useUserContext } from "../context/UserContext"
interface BlogCardProps {
    blogInfo: BlogObject
}

export default function BlogCard({blogInfo}: BlogCardProps) {

    const {userInfo} = useUserContext();
    console.log("userid from", userInfo)
    const navigate = useNavigate();
    const [isAction, setIsAction] = useState(false);
    const actionRef = useRef<RefObject<HTMLElement> | RefObject<HTMLElement>[]>(null);
    const handleClickOutside = () => {
        setIsAction(false)
    }
    useOnClickOutside(actionRef, handleClickOutside)

    return (
        <div 
            className="bg-(--light) dark:bg-(--card-dark) dark:text-(--text-dark) px-(--paddingX) py-(--paddingY) rounded-(--radius) shadow-md hover:cursor-pointer hover:bg-(--info)
            flex flex-col gap-(--gap) relative dark:hover:bg-(--secondary)"
            onClick={() => navigate(`/blog/${blogInfo._id}`)}
        >
            <div className="flex gap-(--gap) items-center">
                <img
                    src={blogInfo.userId?.avatar || defaultProfile}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="rounded-[50%] h-13 w-13"
                />
                <div className="flex gap-(--gap) flex-col">
                <span>{blogInfo.userId.name}</span>
                <span>Member since: {format(blogInfo.userId.createdAt, "d MMMM yyyy")}</span>
                </div>
            </div>
            <div>Published At: {blogInfo?.createdAt ? format(blogInfo?.createdAt, "d MMMM yyyy, h:mm a") : "---"}</div>
            <h1 className="text-lg">{blogInfo.title}</h1>
            <div className="flex justify-between">
                <span title="Comments" className="flex gap-(--gap)"><MessageCircle /> 0</span>
                <span title="Likes" className="flex gap-(--gap)"><ThumbsUp /> 0</span>
            </div>
            {userInfo._id === blogInfo.userId._id &&
                <div className="absolute right-(--paddingX) top-(--paddingY)">
                    <div className="relative">
                        <button onClick={(e) => {e.stopPropagation(); setIsAction(true)}}>
                            <EllipsisVertical className="hover:text-white cursor-pointer"/>
                        </button>
                        {isAction && 
                            <div 
                                className="absolute top-0 right-0 bg-white px-(--paddingX) py-(--paddingY) rounded-(--radius)"
                                ref={actionRef}
                                >
                                <button type="button" onClick={(e) => {e.stopPropagation(); navigate(`update-blog/${blogInfo._id}`)}}>
                                    <SquarePen className="text-(--info)"/>
                                </button>
                                <span>
                                    <CircleX className="text-red-500"/>
                                </span>
                            </div>
                        }
                    </div>
                    
                </div>
            }
        </div>
    )
}