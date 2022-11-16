import { FC, Suspense, useState } from 'react'
import { useQueryClient } from 'react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { LogoutIcon, ExclamationCircleIcon } from '@heroicons/react/solid'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import { Spinner } from './Spinner'
import { UserProfile } from './userProfile'
import { Notification } from './Notification'
import { Feed } from './Feed'
import { Burger } from '@mantine/core';

export const DashBoard: FC = () => {
  const [opened,setOpened] = useState(false)
  const title = opened ? 'Close navigation' : 'Open navigation';
  const queryClient = useQueryClient()
  const resetPost = useStore((state) => state.resetEditedPost)
  const resetProfile = useStore((state) => state.resetEditedProfile)
  const resetNotice = useStore((state) => state.resetEditedNotice)
  const onClickOpen = () => {
    setOpened(!opened)
  }
  const signOut = () => {
    resetPost()
    resetProfile()
    resetNotice()
    supabase.auth.signOut()
    queryClient.removeQueries(['profile'])
    queryClient.removeQueries(['notices'])
    queryClient.removeQueries(['posts'])
  }
  if (opened) {
    
  }
  return (
    <>
      <Burger
        opened={opened}
        onClick={onClickOpen}
        title={title}
        className="absolute left-2 top-10 z-40"
      />
      {/* <p className='absolute left-1 top-1 font-bold '>LIVE</p> */}
      <LogoutIcon
        data-testid="logout"
        className="my-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={signOut}
      />
      
      <div className="md:grid grid-cols-5 gap-2">
        { opened ?
        <div className=" flex flex-col items-center absolute top-0 left-0 h-[100vh] w-[100vw] z-20 bg-slate-500 m-0">
          <ErrorBoundary
            fallback={
              <ExclamationCircleIcon className="my-5 h-10 w-10 text-pink-500" />
            }
          >
            <Suspense fallback={<Spinner />}>
              <UserProfile  />
            </Suspense>
          </ErrorBoundary>
        </div>:<div className='col-span-1'></div> }
         <div className="flex col-span-3 flex-col items-center">
          <ErrorBoundary
            fallback={
              <ExclamationCircleIcon className="my-5 h-10 w-10 text-pink-500" />
            }
          >
            <Suspense fallback={<Spinner />}>
              <Feed />
            </Suspense>
          </ErrorBoundary>
        </div>
        <div className="flex flex-col col-span-1 items-center">
          <ErrorBoundary
            fallback={
              <ExclamationCircleIcon className="my-5 h-10 w-10 text-pink-500" />
            }
          >
            <Suspense fallback={<Spinner />}>
              <Notification />
            </Suspense>
          </ErrorBoundary>
        </div> 
      </div>
    </>
  )
}
