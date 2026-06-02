"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function login() {
    if (!email || !password) {
      alert("请输入邮箱和密码")
      return
    }

    localStorage.setItem("isLogin", "true")
    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-md bg-slate-900 p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-8">
          电商AI运营平台
        </h1>

        <input
          type="email"
          placeholder="请输入邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white outline-none"
        />

        <input
          type="password"
          placeholder="请输入密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg bg-slate-800 text-white outline-none"
        />

        <button
          onClick={login}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg text-white font-bold"
        >
          登录
        </button>

        <button className="w-full mt-4 bg-green-600 hover:bg-green-700 py-3 rounded-lg text-white font-bold">
          注册账号
        </button>

        <p className="text-center text-slate-400 mt-6">
          AI主图生成 · AI详情页生成 · AI视频脚本
        </p>
      </div>
    </div>
  )
}