import { useParams } from "react-router-dom"

function BlogPage() {

  const {blogId} = useParams();
  console.log(blogId)
  return (
    <div>Blog</div>
  )
}

export default BlogPage