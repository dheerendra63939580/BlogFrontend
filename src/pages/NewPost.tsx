import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { createBlog, getBlogById, updateBlog } from '../api';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import type { BlogByIdResponse } from '../types/types';
function NewPost() {

  const {blogId} = useParams();
  const queryClient = useQueryClient();
  const { data, isPending, isFetching, isError, isSuccess } = useQuery<BlogByIdResponse, Error>({
      queryKey: [`blgogById`, blogId],
      queryFn: () => getBlogById(blogId!, true),
      enabled: !!blogId,
    })
    useEffect(() => {
  if (isSuccess && data) {
    setContent(data?.data?.content);
    setTitle(data?.data?.title || "")
  }
}, [isSuccess, data]);
  const newBlog = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['todos'] })
      setContent("");
      setTitle("")
    },
  })

  const updateBlogApi = useMutation({
    mutationFn: updateBlog,
    onSuccess: () => {
      toast.success("Blog updated successfully")
      queryClient.invalidateQueries({ queryKey: [`blgogById`, blogId] })
    }
  })

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("")
  const handleNewBlog = () => {
    if(content.trim().length <= 50) {
      toast.error("Content should contain at least 51 character");
      return;
    }
    if(title.length <= 9) {
      toast.error('Length should contain at least 10 characters');
      return;
    }
    if(blogId) {
      updateBlogApi.mutate({title, content, blogId});
      return
    }
    newBlog.mutate({ title,content })
  }

  return (
    <>
      <div className="flex flex-col gap-(--gap) mb-2.5">
        <label htmlFor="title">Enter Title</label>
        <input 
          type="text" 
          id="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="dark:bg-(--card-dark) bg-(--info)"
        />
      </div>

      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        className="mb-4"
        placeholder="Write your content here..."
      />
      <button
        type="button"
        className='bg-(--primary) p-(--paddingX) py-(--paddingY) rounded-(--radius) cursor-pointer hover:text-white'
        onClick={handleNewBlog}
      >
        SUBMIT
      </button>
    </>
  )
}

export default NewPost