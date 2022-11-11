import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {QueryClient,QueryClientProvider} from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { MantineProvider } from '@mantine/core';
import Head from 'next/head';

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      retry:false,
      refetchOnWindowFocus:false,
      suspense:true
    }
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{
      /** Put your mantine theme override here */
      colorScheme: 'dark',
    }}
  >
      <QueryClientProvider client={queryClient}>
      <Head><meta name="robots" content="noindex" /></Head>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </MantineProvider>
  )
}

export default MyApp
