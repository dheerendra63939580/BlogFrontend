import { useQuery } from "@tanstack/react-query"
import { getAllBlogs } from "../api"
import type { BlogResponse } from "../types/types"

function BlogListing() {

  const { data } = useQuery<BlogResponse, Error>({
    queryKey: ["allBlogs"],
    queryFn: () => getAllBlogs(),
  });
  console.log(data?.data.blogs)

  return (
    <div className="flex flex-col gap-(--gap)">
      {data?.data.blogs.map((blogInfo) => (
        <div key={blogInfo._id} className="bg-(--light) px-(--paddingX) py-(--paddingY) rounded-(--radius)">
          <div className="flex gap-(--gap) items-center">
            <img
              src={blogInfo.userId.avatar}
              alt=""
              referrerPolicy="no-referrer"
              className="rounded-[50%]"
            />
            <div className="flex gap-(--gap) flex-col">
              <span>{blogInfo.userId.name}</span>
              <span>Published at: {blogInfo.userId.createdAt} Last updated at: {blogInfo.userId.updatedAt}</span>
            </div>
          </div>
          <h1 className="mt-2.5 text-lg">{blogInfo.title}</h1>

        </div>
      ))}
    </div>
  )
}

export default BlogListing