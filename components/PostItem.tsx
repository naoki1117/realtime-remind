import { FC, useState, Suspense, memo } from 'react'
import Image from 'next/image'
import {
  PencilAltIcon,
  TrashIcon,
  ExclamationCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/solid'
import { ChatAlt2Icon } from '@heroicons/react/outline'
import { ErrorBoundary } from 'react-error-boundary'
import { Spinner } from './Spinner'
import useStore from '../store'
import { Post } from '../types'
import { useMutatePost } from '../hooks/useMutatePost'
import { useQueryAvatar } from '../hooks/useQueryAvatar'
import { useDownloadUrl } from '../hooks/useDownloadUrl'
import { Comments } from './Comments'
import { format } from "date-fns"
import { useInView } from 'react-intersection-observer'

export const PostItemMemo: FC<Post> = ({
  id,
  title,
  post_url,
  user_id,
  created_at
}) => {
  const {ref,inView} = useInView({
    rootMargin:"10px",
    triggerOnce:true
  })
  const [openComments, setOpenComments] = useState(false)
  const session = useStore((state) => state.session)
  const update = useStore((state) => state.updateEditedPost)
  const { data } = useQueryAvatar(user_id)
  
  const { deletePostMutation } = useMutatePost()
  const { fullUrl: avatarUrl, isLoading: isLoadingAvatar } = useDownloadUrl(
    data?.avatar_url,
    'avatars'
  )
  const { fullUrl: postUrl, isLoading: isLoadingPost } = useDownloadUrl(
    post_url,
    'posts'
  )
  return (
    <>
      <li className="w-[20rem] md:w-[40rem] ref={ref}">
        <div className="my-3 w-full border border-dashed border-gray-400" />
        <div className="flex items-center justify-between">
          <div className="w-[680px]">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="avatar"
                className="rounded-full"
                width={25}
                height={25}
              />
            ) : (
              <UserCircleIcon className="inline-block h-8 w-8 cursor-pointer text-gray-500" />
            )}
            <span id={title} className="ml-2 font-bold">{title}</span>
            
          </div>
          {session?.user?.id === user_id && (
            <div className="flex pr-4">
              <PencilAltIcon
                data-testid="pencil-post"
                className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
                onClick={() => {
                  update({
                    id: id,
                    title: title,
                    post_url: post_url,
                  })
                }}
              />
              <TrashIcon
                data-testid="trash-post"
                className="h-5 w-5 cursor-pointer text-blue-500"
                onClick={() => {
                  const res = confirm("削除してよろしいですか?")
                  if(res==true){
                  deletePostMutation.mutate(id)
                  } else {
                    alert("キャンセルされました")
                  }
                }}
              />
            </div>
          )}
        </div>
        <div className="my-3 flex justify-center">
          {postUrl && (
            <Image
              src={postUrl}
              alt="Image"
              className="rounded-lg"
              width={300}
              height={220}
            />
          )}
        </div>
        <div className="my-3 flex justify-center">
          {(isLoadingAvatar || isLoadingPost) && <Spinner />}
        </div>
        <ChatAlt2Icon
          data-testid="open-comments"
          className="ml-2 h-6 w-6 cursor-pointer text-blue-500"
          onClick={() => setOpenComments(!openComments)}
        />
        <div className=' text-[10px] text-end font-bold'>登録日:{format (new Date(created_at),"yyyy-MM-dd HH:mm:ss")}
          <p>登録者:{data?.username}</p>
          
        </div>
        {openComments && (
          <ErrorBoundary
            fallback={
              <ExclamationCircleIcon className="my-5 h-10 w-10 text-pink-500" />
            }
          >
            <Suspense
              fallback={
                <div className="flex justify-center">
                  <Spinner />
                </div>
              }
            >
              <div className="flex justify-center">
                <Comments postId={id} />
              </div>
            </Suspense>
          </ErrorBoundary>
        )}
        
      </li>
    </>
  )
}
export const PostItem = memo(PostItemMemo)


