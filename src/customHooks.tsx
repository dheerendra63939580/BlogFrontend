import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { DeleteBlogResponse } from "./types/types"
import { deleteBlog } from "./api"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

export const useDeleteBlog = (isNavigate=false) => {

    const navigate = useNavigate();
    const queryClient = useQueryClient()
    const deleteBlogMutation = useMutation<DeleteBlogResponse, Error, string>({
        mutationFn: deleteBlog,
    })
    const handleDelete = (blogId: string) => {
         toast.promise(deleteBlogMutation.mutateAsync(blogId), {
            loading: "deleting...",
            success: (data) => {
                queryClient.invalidateQueries({queryKey: ["allBlogs"]});
                if(isNavigate)
                    navigate("/");
                return data?.message;
            },
            error: "Something went wrong"
         })
    }
    return { handleDelete, isPending: deleteBlogMutation.isPending }
}