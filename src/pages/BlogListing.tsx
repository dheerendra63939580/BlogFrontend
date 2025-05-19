import { useQuery } from "@tanstack/react-query"
import { getAllBlogs } from "../api"
import type { BlogResponse } from "../types/types"
import ReactQuill from "react-quill-new"

function BlogListing() {

  const {data} = useQuery<BlogResponse, Error>({
    queryKey: ["allBlogs"],
    queryFn: () => getAllBlogs(),
  });
  console.log(data?.data.blogs)

  return (
    <div>
      {data?.data.blogs.map((blogInfo) =>(
      <div key={blogInfo._id}>
        <div>

        </div>
        <ReactQuill 
          value={blogInfo.content}
          theme="bubble"
          readOnly={true}
          placeholder="Write your content here..."
        />
      </div>
      ))}
    </div>
  )
}

export default BlogListing