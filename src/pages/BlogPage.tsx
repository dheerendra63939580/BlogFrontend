import { useQuery, useMutation,useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom"
import { getBlogById, handleLike } from "../api";
import type { BlogByIdResponse } from "../types/types";
import defaultProfile from "../assets/defaultProfile.png"
import { format } from "date-fns";
import ReactQuill from "react-quill-new";
import { MessageCircle, ThumbsUp, EllipsisVertical, SquarePen, CircleX } from "lucide-react"
import { useState, useRef, type RefObject } from "react"
import { useOnClickOutside } from 'usehooks-ts'
import { useUserContext } from "../context/UserContext";
import { PageLoading } from "../components/PageLoading"

function BlogPage() {

  const {userInfo} = useUserContext();
  const navigate = useNavigate()
  const { blogId } = useParams();
  const queryClient = useQueryClient();
  const [isAction, setIsAction] = useState(false);
  const actionRef = useRef<RefObject<HTMLElement> | RefObject<HTMLElement>[]>(null);
  const { data, isPending, isError } = useQuery<BlogByIdResponse, Error>({
    queryKey: [`blgogById`, blogId],
    queryFn: () => getBlogById(blogId!, false) 
  })
  const handleClickOutside = () => {
    setIsAction(false)
  }
  useOnClickOutside(actionRef, handleClickOutside)
  const likeMutation = useMutation({
    mutationFn: handleLike,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [`blgogById`, blogId]})
    }
  })

  const handleLikeClick = () => {
    likeMutation.mutate(blogId!);
  }

  if (isPending) return <PageLoading />
  if (isError) return <h1>error</h1>

  return (
    <div
      className="px-(--paddingX) py-(--paddingY) rounded-(--radius) shadow-md
      flex flex-col gap-(--gap)"
    >
      <div className="relative">
        <div className="flex gap-(--gap) items-center">
          <img
            src={data?.data?.userId?.avatar || defaultProfile}
            alt=""
            referrerPolicy="no-referrer"
            className="rounded-[50%] h-13 w-13"
          />
          <div className="flex gap-(--gap) flex-col">
            <span>{data?.data?.userId?.name}</span>
            <span>Member since: {data?.data?.userId?.createdAt && format(data?.data?.userId?.createdAt, "d MMMM yyyy")}</span>
          </div>
        </div>
        <div>Published At: {data?.data?.createdAt ? format(data?.data?.createdAt, "d MMMM yyyy, h:mm a") : "---"}</div>
        <h1 className="text-lg">{data?.data?.title}</h1>
        <div className="flex justify-between">
          <span title="Comments" className="flex gap-(--gap)"><MessageCircle /> 0</span>
          <span title="Likes" className="flex gap-(--gap) items-center">
            <ThumbsUp onClick={handleLikeClick} className={`${data.data.hasUserLiked && "fill-(--secondary)"} cursor-pointer`}/> {data.data.likesCount}
          </span>
        </div>
        {userInfo._id === data?.data?.userId?._id &&
          <div className="absolute right-(--paddingX) top-(--paddingY)">
            <div className="relative">
              <button onClick={(e) => { e.stopPropagation(); setIsAction(true) }}>
                <EllipsisVertical className="cursor-pointer" />
              </button>
              {isAction &&
                <div
                  className="absolute top-0 right-0 bg-(--warning) px-(--paddingX) py-(--paddingY) rounded-(--radius)"
                  ref={actionRef}
                >
                  <button onClick={() => navigate(`/update-blog/${blogId}`)}>
                    <SquarePen className="text-(--info)" />
                  </button>
                  <span>
                    <CircleX className="text-red-500" />
                  </span>
                </div>
              }
            </div>

          </div>
        }
      </div>
      <hr />
      <ReactQuill
        value={data.data.content}
        readOnly={true}
        theme="bubble"
      />
    </div>
  )
}

export default BlogPage