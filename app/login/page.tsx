"use client"

export default function LoginPage() {

  function enter() {
    window.location.href = "/"
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
          className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white"
        />

        <input
          type="password"
          placeholder="请输入密码"
          className="w-full p-3 mb-6 rounded-lg bg-slate-800 text-white"
        />

        <button
          onClick={enter}
          className="w-full bg-green-600 py-3 rounded-lg text-white font-bold"
        >
          进入后台
        </button>

      </div>
    </div>
  )
}
