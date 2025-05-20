import { useQuery } from "@tanstack/react-query"
import { getAllBlogs } from "../api"
import type { BlogResponse } from "../types/types"
import defaultProfile from "../assets/defaultProfile.png"
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"

function BlogListing() {

  const navigate = useNavigate()
  const { data } = useQuery<BlogResponse, Error>({
    queryKey: ["allBlogs"],
    queryFn: () => getAllBlogs(),
  });
  console.log(data?.data.blogs)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-(--gap)">
      {data?.data.blogs.map((blogInfo) => (
        <div 
        key={blogInfo._id} 
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
      ))}
    </div>
  )
}

export default BlogListing