import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { createBlog } from '../api';
import { toast } from 'sonner';
function NewPost() {

  const [title, setTitle] = useState("")
  const queryClient = useQueryClient();
  const newBlog = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['todos'] })
      console.log("")
    },
  })
  const [content, setContent] = useState("");
  console.log(content)
  const handleNewBlog = () => {
    if(content.trim().length <= 50) {
      toast.error("Content should contain at least 51 character");
      return;
    }
    if(title.length <= 9) {
      toast.error('Length should contain at least 10 characters');
      return;
    }
    newBlog.mutate({ title,content })
  }

  return (
    <>
      <div className="flex flex-col gap-(--gap) mb-2.5">
        <label htmlFor="title">Enter Title</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        className="mb-4"
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