import { FC, Dispatch, SetStateAction, memo } from 'react'
import Image from 'next/image'
import {
  PencilAltIcon,
  TrashIcon,
  UserCircleIcon,
} from '@heroicons/react/solid'
import useStore from '../store'
import { EditedComment } from '../types'
import { useQueryAvatar } from '../hooks/useQueryAvatar'
import { useMutateComment } from '../hooks/useMutateComment'
import { useDownloadUrl } from '../hooks/useDownloadUrl'
import {format} from "date-fns"
// import { useQueryChecked } from '../hooks/UseQueryChecked'


type Props = {
  id: string
  comment: string
  user_id: string | undefined
  created_at:string
  setEditedComment: Dispatch<SetStateAction<EditedComment>>
}

export const CommentItemMemo: FC<Props> = ({
  id,
  comment,
  user_id,
  setEditedComment,
  created_at
}) => {
  const session = useStore((state) => state.session)
  const { data } = useQueryAvatar(user_id)
  // const { data:check } = useQueryChecked(id)
  
  const { deleteCommentMutation } = useMutateComment()
  const { fullUrl: avatarUrl } = useDownloadUrl(data?.avatar_url, 'avatars')
  return (
    <li className="my-6 relative flex items-center justify-between">
      <div className="">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="avatar"
            className="rounded-full float-left "
            width={25}
            height={25}
          />
        ) : (
          <UserCircleIcon className="inline-block  cursor-pointer text-gray-500 w-[25px] h-[25px]"  />
        )}
        <span className="mx-1 text-sm">{comment}</span>
        
        <div className='absolute right-1 text-[10px] text-indigo-300'>登録日:{format (new Date(created_at),"yyyy-MM-dd HH:mm:ss")}
          <p>登録者:{data?.username}</p>
        </div>
      </div>
      {session?.user?.id === user_id && (
        <div className="flex">
          <PencilAltIcon
            data-testid="pencil-comment"
            className="h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => {
              setEditedComment({ id: id, comment: comment })
            }}
          />
          <TrashIcon
            data-testid="trash-comment"
            className="h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => {
              const res = confirm("削除してよろしいですか?")
                  if(res==true){
                    deleteCommentMutation.mutate(id)
                  } else {
                    alert("キャンセルされました")
                  }
            }}
          />
        </div>
      )}
    </li>
  )
}
export const CommentItem = memo(CommentItemMemo)
