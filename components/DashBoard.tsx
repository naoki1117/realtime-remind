import { FC, Suspense } from 'react'
import { useQueryClient } from 'react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { LogoutIcon, ExclamationCircleIcon } from '@heroicons/react/solid'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import { Spinner } from './Spinner'
import { UserProfile } from './userProfile'
import { Notification } from './Notification'
import { Feed } from './Feed'

export const DashBoard: FC = () => {
  const queryClient = useQueryClient()
  const resetPost = useStore((state) => state.resetEditedPost)
  const resetProfile = useStore((state) => state.resetEditedProfile)
  const resetNotice = useStore((state) => state.resetEditedNotice)
  const signOut = () => {
    resetPost()
    resetProfile()
    resetNotice()
    supabase.auth.signOut()
    queryClient.removeQueries(['profile'])
    queryClient.removeQueries(['notices'])
    queryClient.removeQueries(['posts'])
  }
  return (
    <>
      <LogoutIcon
        data-testid="logout"
        className="my-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={signOut}
      />
      
      <div className="md:grid grid-cols-5 gap-2">
        <div className="flex flex-col col-span-1 items-center">
          <ErrorBoundary
            fallback={
              <ExclamationCircleIcon className="my-5 h-10 w-10 text-pink-500" />
            }
          >
            <Suspense fallback={<Spinner />}>
              <UserProfile />
            </Suspense>
          </ErrorBoundary>
        </div>
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
