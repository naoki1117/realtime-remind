import React from 'react'
import { supabase } from '../utils/supabase'
import { useQuery } from 'react-query'

export const useUserQuery = (user_id: string | undefined) => {
  const getUser = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('user_id', user_id)
      .single()

    if (error) {
      throw new Error(error.message)
    }
    return data
  }
  return useQuery<string | undefined, Error>({
    queryKey: ['user_id', user_id],
    queryFn: getUser,
  })
}
