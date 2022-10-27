import { useState, FormEvent, FC } from 'react'
import { useMutateAuth } from '../hooks/useMutateAuth'
import { Bolt } from 'tabler-icons-react';

export const Auth: FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    registerMutation,
  } = useMutateAuth()
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      loginMutation.mutate()
    } else {
      const result = prompt("signup passwordを入力してください")
      if(result===process.env.NEXT_PUBLIC_PASS){
        registerMutation.mutate()
      } else{
        alert("パスワードが不正です!")
        {console.log(process.env.NEXT_PUBLIC_PASS)}
      }
      
    }
  }

  return (
    <>
    <Bolt
    size={48}
    strokeWidth={2}
    color={'#40bfb2'}
   />
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            required
            className="my-2 rounded border text-black border-gray-300 px-3 py-2 text-sm focus:outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </div>
        <div>
          <input
            type="password"
            required
            className="my-2 rounded border text-black border-gray-300 px-3 py-2 text-sm focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <div className="my-6 flex items-center justify-center text-sm">
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="cursor-pointer font-medium hover:text-indigo-500"
          >
            モード切替
          </span>
        </div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm text-white"
        >
          {isLogin ? 'ログイン' : '新規登録'}
        </button>
      </form>
    </>
  )
}
