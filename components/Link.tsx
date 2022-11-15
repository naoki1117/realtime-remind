import React from 'react'
import { Menu, Button, Text } from '@mantine/core';
import {useQueryPosts} from "../hooks/useQueryPosts"
import { useSubscribePosts } from '../hooks/useSubscribePosts'
import { Search,Badges } from 'tabler-icons-react'
import { useInView } from 'react-intersection-observer';
export const Link = () => {
  const { ref, inView } = useInView({
    // オプション
    rootMargin: '0px', // ref要素が現れてから50px過ぎたら
    triggerOnce: false, 
  });
const { data: posts } = useQueryPosts()
  useSubscribePosts()
  return (
    <div className="fixed top-1 right-1" >
      <Menu shadow="md" width={200}>
        {inView && <div className='h-5 w-5 bg-white'></div>}
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
        <Menu.Label>Link</Menu.Label>
        {posts?.map((post) => {
          return(
            <Menu.Item key={post.id} className="" ><a href={`#${post.title}`} className="block">
            <Badges
            className='float-left'
            size={20}
            strokeWidth={2}
            color={'#bbbf40'}
          />{post.title}</a></Menu.Item>
          )
        })}
        
      </Menu.Dropdown>
    </Menu>
    
    </div>
  )
}
