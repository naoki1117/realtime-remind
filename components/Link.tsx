import React from 'react'
import { Menu, Button, Text } from '@mantine/core';
import {useQueryPosts} from "../hooks/useQueryPosts"
import { useSubscribePosts } from '../hooks/useSubscribePosts'
import { Search } from 'tabler-icons-react'
export const Link = () => {
const { data: posts } = useQueryPosts()
  useSubscribePosts()
  return (
    <div>
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
    </div>
  )
}
