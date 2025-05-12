import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
function NewPost() {
    const [value, setValue] = useState("");
    console.log(value)
  return (
    <>
        <ReactQuill 
            theme="snow" 
            value={value} 
            onChange={setValue}
            className="mb-4"
        />
        <button type="button" className='bg-(--primary) p-(--paddingX) py-(--paddingY) rounded-(--radius) cursor-pointer hover:text-white'>SUBMIT</button>
    </>
  )
}

export default NewPost