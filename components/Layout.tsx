import React, { FC, ReactNode } from 'react'
import Head from "next/head"
import { BadgeCheckIcon } from "@heroicons/react/solid"
import { Search } from 'tabler-icons-react'
import { Menu, Button, Text } from '@mantine/core';
import {useQueryPosts} from "../hooks/useQueryPosts"
import { useSubscribePosts } from '../hooks/useSubscribePosts'


type Props = {
    children:ReactNode
    title:string
}

export const Layout:FC<Props> = ({children,title}) => {
  const { data: posts } = useQueryPosts()
  useSubscribePosts()
  return (
    <div className='flex min-h-screen flex-col items-center justify-center font-mono'>
        <Head>{title}</Head>
        <header>
        <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button className='absolute right-1 top-1'>
        <Search
          size={24}
          strokeWidth={2}
          color={'#bf4a40'}
        />
        <p>ページ内リンク</p>
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        {posts?.map((post) => {
          return(
            <Menu.Item key={post.id} ><a href={`#${post.id}`}>{post.title}</a></Menu.Item>
          )
        })}
        
      </Menu.Dropdown>
    </Menu>
        </header>
        <main className='flex w-screen flex-1 flex-col items-center justify-center'>
            {children}
        </main>
        <footer className='flex h-12 w-full items-center justify-center border-t'>
            <BadgeCheckIcon className='h-6 w-6 text-blue-500'/>
        </footer>

    </div>

  )
}


