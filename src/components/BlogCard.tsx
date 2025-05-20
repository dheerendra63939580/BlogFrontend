import { useNavigate } from "react-router-dom"
import defaultProfile from "../assets/defaultProfile.png"
import type { BlogObject } from "../types/types"
import { format } from "date-fns"

interface BlogCardProps {
    blogInfo: BlogObject
}

export default function BlogCard({blogInfo}: BlogCardProps) {

    const navigate = useNavigate()

    return (
        <div 
            className="bg-(--light) px-(--paddingX) py-(--paddingY) rounded-(--radius) shadow-md hover:cursor-pointer hover:bg-(--info)"
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
                <span>Published at: {format(blogInfo.userId.createdAt, "d MMMM yyyy, h:mm a")} &nbsp;&nbsp; Last updated at: {format(blogInfo.userId.updatedAt, "d MMMM yyyy, h:mm a")}</span>
                </div>
            </div>
            <h1 className="mt-2.5 text-lg">{blogInfo.title}</h1>
        </div>
    )
}