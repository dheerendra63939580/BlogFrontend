import { useQuery } from "@tanstack/react-query"
import { getAllBlogs } from "../api"
import type { BlogResponse } from "../types/types"
import BlogCard from '../components/BlogCard'
import { PageLoading } from "../components/PageLoading";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function BlogListing() {
  const [blogsPerPage, setBlogsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const { data, isPending, refetch } = useQuery<BlogResponse, Error>({
    queryKey: ["allBlogs"],
    queryFn: () => getAllBlogs(page, blogsPerPage),
  });

  useEffect(() => {
    refetch()
  }, [page, blogsPerPage])
  const pageArray = Array.from({length: Math.ceil(data?.data?.total! / blogsPerPage)}, (_, ind:number) => ind + 1);
  const handlePrevious = () => {
    if(page !== 1)
      setPage(pre => pre - 1)
  }
  const handleNext = () => {
    if(page !== pageArray?.length)
      setPage(pre => pre + 1)
  }
  if (isPending) return <PageLoading />

  return (
    <>
      <label className="mb-2.5 block dark:bg-(--background-dark)">
        Blog per page:
        <select value={blogsPerPage} onChange={(e) => setBlogsPerPage(+e.target.value)}>
          {Array.from({ length: 4 }, (_, index: number) => (index + 1) * 5).map((value, ind) => (
            <option value={value} key={ind} selected={ind === 0} className="dark:bg-(--background-dark)">{value}</option>
          ))}
        </select>
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-(--gap)">
        {data?.data.blogs.map((blogInfo) => (
          <BlogCard
            key={blogInfo._id}
            blogInfo={blogInfo}
          />
        ))}
      </div>
      <section className="flex justify-end items-center flex-wrap gap(--gap) mt-2.5">
        {page !== 1 && <button onClick={handlePrevious}><ChevronLeft /></button>}
        {pageArray?.map(pg => 
          <button 
            className={`shadow-md p-2.5 rounded-md ${page === pg ? "bg-(--info)" : ""}`}
            onClick={() => setPage(pg)}
          >
            {pg}
          </button>)}
        {page !== pageArray?.length && <button onClick={handleNext}><ChevronRight /></button>}
      </section>
    </>
  )
}

export default BlogListing