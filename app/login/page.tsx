"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function login() {
    if (!email || !password) {
      alert("请输入邮箱和密码")
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    localStorage.setItem("loggedIn", "true")
    alert("登录成功")
    window.location.replace("/")
  }

  function quickEnter() {
    localStorage.setItem("loggedIn", "true")
    window.location.replace("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-md bg-slate-900 p-8 rounded-2xl">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-8">
          电商AI运营平台
        </h1>

        <input
          type="email"
          placeholder="请输入邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white"
        />

        <input
          type="password"
          placeholder="请输入密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg bg-slate-800 text-white"
        />

        <button
          onClick={login}
          disabled={loading}
          className="w-full bg-blue-600 py-3 rounded-lg text-white font-bold"
        >
          {loading ? "登录中..." : "登录"}
        </button>

        <button
          onClick={quickEnter}
          className="w-full mt-4 bg-green-600 py-3 rounded-lg text-white font-bold"
        >
          直接进入后台
        </button>

        <p className="text-center text-slate-400 mt-6">
          AI主图生成 · AI详情页生成 · AI视频脚本
        </p>
      </div>
    </div>
  )
}
