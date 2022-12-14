import { useQuery } from 'react-query'
import { supabase } from '../utils/supabase'
import { Profile } from '../types/'
export const useQueryAvatar = (userId: string | undefined) => {
  const getAvatarUrl = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('avatar_url,username')
      .eq('id', userId)
      .maybeSingle()

    if (error) {
      throw new Error(error.message)
    }
    return data
  }
  return useQuery<Profile, Error>({
    queryKey: ['avatar-url', userId],
    queryFn: getAvatarUrl,
    refetchOnWindowFocus: true,
  })
}
