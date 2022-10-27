import type { NextPage } from 'next'
import { Layout } from '../components/Layout'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react'
import useStore from '../store'
import { supabase } from '../utils/supabase'
import { Auth } from '../components/Auth'
import { DashBoard } from '../components/DashBoard'


const Home: NextPage = () => {
  
  const session = useStore((state) => state.session)
  const setSession =useStore((state) => state.setSession)
  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event,session) => {
      setSession(session)
    })
  },[setSession])
  return (
    <Layout title='DashBoard'>
      {!session ? <Auth/> : <DashBoard/>}
    </Layout>
  )
}

export default Home
