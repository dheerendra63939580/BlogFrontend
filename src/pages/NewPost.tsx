import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { createBlog } from '../api';
function NewPost() {

    const queryClient = useQueryClient();
    const newBlog = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['todos'] })
      setContent("")
    },
  })
    const [content, setContent] = useState("");
    console.log(content)
    const handleNewBlog = () => {
      newBlog.mutate({content})
    }

  return (
    <>
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