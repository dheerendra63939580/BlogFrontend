import { useQuery } from "@tanstack/react-query"
import { getAllBlogs } from "../api"
import type { BlogResponse } from "../types/types"
import BlogCard from '../components/BlogCard'

function BlogListing() {

  const { data } = useQuery<BlogResponse, Error>({
    queryKey: ["allBlogs"],
    queryFn: () => getAllBlogs(),
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-(--gap)">
      {data?.data.blogs.map((blogInfo) => (
        <BlogCard 
          key={blogInfo._id}
          blogInfo={blogInfo}
        />
      ))}
    </div>
  )
}

export default BlogListing