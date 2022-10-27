import React from 'react'
import { supabase } from '../utils/supabase'
import { useQuery } from "react-query"
import { type } from 'os'

export type Checked = {
    id: string,
    User_id : string,
    Comment_id:string

}

export const useQueryChecked = (id:string) => {
    const getChecked = async () => {
        const {data,error} = await supabase
        .from("checked")
        .select("id_User")
        .eq("id_Comment",id)

        if (error) {
            throw new Error(error.message)
          }
          return data
    }
  {
    return useQuery<Checked[], Error>({
        queryKey: ['checked', id],
        queryFn: getChecked,
        staleTime: Infinity,
      })

  }
}

