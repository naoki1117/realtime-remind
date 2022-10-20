import React, { FC, ReactNode } from 'react'
import Head from "next/head"
import { BadgeCheckIcon } from "@heroicons/react/solid"
import { Badge } from 'tabler-icons-react'
import { Menu, Button, Text } from '@mantine/core';



type Props = {
    children:ReactNode
    title:string
}

export const Layout:FC<Props> = ({children,title}) => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center font-mono'>
        <Head>{title}</Head>
        <header>
        <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button className='absolute right-0'>LIVE</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item >Settings</Menu.Item>
        <Menu.Item  >Messages</Menu.Item>
        <Menu.Item >Gallery</Menu.Item>
        <Menu.Item
          
          rightSection={<Text size="xs" color="dimmed">⌘K</Text>}
        >
          Search
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item >Transfer my data</Menu.Item>
        <Menu.Item color="red" >Delete my account</Menu.Item>
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


