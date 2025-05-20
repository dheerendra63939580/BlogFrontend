import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import { getBlogById } from "../api";
import type { BlogByIdResponse } from "../types/types";
import defaultProfile from "../assets/defaultProfile.png"
import { format } from "date-fns";
import ReactQuill from "react-quill-new";

function BlogPage() {
  
  const {blogId} = useParams();
  const { data, isPending, isFetching, isError } = useQuery<BlogByIdResponse, Error>({
    queryKey: ["ogById"],
    queryFn: () => getBlogById(blogId!)
  })
  console.log(data)
  if(isPending || isFetching) return <h1>Loading...</h1>
  if(isError) return <h1>error</h1>

  return (
    <div>
      <div 
            className="bg-(--light) px-(--paddingX) py-(--paddingY) rounded-(--radius) shadow-md"
        >
            <div className="flex gap-(--gap) items-center">
                <img
                src={data?.data?.userId?.avatar || defaultProfile}
                alt=""
                referrerPolicy="no-referrer"
                className="rounded-[50%] h-13 w-13"
                />
                <div className="flex gap-(--gap) flex-col">
                <span>{data?.data?.userId.name}</span>
                <span>Published at: {format(data?.data?.userId.createdAt, "d MMMM yyyy, h:mm a")} &nbsp;&nbsp; Last updated at: {format(data?.data?.userId.updatedAt, "d MMMM yyyy, h:mm a")}</span>
                </div>
            </div>
            <h1 className="mt-2.5 text-lg">{data?.data?.title}</h1>
            <ReactQuill 
              value={data.data.content}
              readOnly={true}
              theme="bubble"
            />
        </div>
    </div>
  )
}

export default BlogPage