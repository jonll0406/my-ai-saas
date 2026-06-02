"use client"

import { useState } from "react"

export default function Home() {
  const [active, setActive] = useState("AI主图生成")
  const [image, setImage] = useState<string | null>(null)
  const [points, setPoints] = useState(128)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<string[]>([])

  const menus = ["控制台", "AI主图生成", "AI详情页生成", "AI视频脚本", "素材库", "会员中心"]
  const styles = ["现代简约", "科技未来", "自然清新", "轻奢优雅", "温馨居家", "专业棚拍"]

  function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) setImage(URL.createObjectURL(file))
  }

  function generate() {
    if (!image && active === "AI主图生成") {
      alert("请先上传产品图片")
      return
    }

    if (points < 2) {
      alert("积分不足，请开通会员")
      return
    }

    setLoading(true)
    setResults([])

    setTimeout(() => {
      setPoints(points - 2)
      setResults([
        image || "/next.svg",
        image || "/next.svg",
        image || "/next.svg",
        image || "/next.svg",
      ])
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <aside className="w-64 bg-slate-900 p-6 border-r border-slate-800">
        <h1 className="text-2xl font-bold text-blue-400 mb-8">AI Studio</h1>

        <ul className="space-y-3">
          {menus.map((item) => (
            <li
              key={item}
              onClick={() => setActive(item)}
              className={`p-3 rounded-lg cursor-pointer ${
                active === item ? "bg-blue-600" : "hover:bg-slate-800"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">{active}</h2>
          <div className="bg-slate-900 px-5 py-3 rounded-xl text-blue-400">
            剩余积分：{points}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900 p-5 rounded-xl">
            <p className="text-slate-400">今日生成</p>
            <h3 className="text-3xl font-bold mt-2">24</h3>
          </div>
          <div className="bg-slate-900 p-5 rounded-xl">
            <p className="text-slate-400">会员等级</p>
            <h3 className="text-3xl font-bold mt-2 text-blue-400">免费版</h3>
          </div>
          <div className="bg-slate-900 p-5 rounded-xl">
            <p className="text-slate-400">素材数量</p>
            <h3 className="text-3xl font-bold mt-2">36</h3>
          </div>
        </div>

        {active === "控制台" && (
          <div className="bg-slate-900 p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">欢迎使用电商AI运营平台</h3>
            <p className="text-slate-400">你可以生成主图、详情页文案、视频脚本，并管理素材和会员积分。</p>
          </div>
        )}

        {active === "AI主图生成" && (
          <div className="bg-slate-900 p-6 rounded-xl">
            <h3 className="text-xl mb-4">上传产品图片</h3>

            <label className="border-2 border-dashed border-slate-700 h-64 rounded-xl flex items-center justify-center cursor-pointer overflow-hidden">
              {image ? (
                <img src={image} className="h-full object-contain" alt="产品图" />
              ) : (
                <span className="text-slate-400">点击上传产品图片</span>
              )}
              <input type="file" accept="image/*" onChange={upload} className="hidden" />
            </label>

            <h3 className="text-xl mt-6 mb-4">选择场景风格</h3>
            <div className="flex flex-wrap gap-4">
              {styles.map((item) => (
                <button key={item} className="bg-slate-800 hover:bg-blue-600 px-4 py-2 rounded-lg">
                  {item}
                </button>
              ))}
            </div>

            <button
              onClick={generate}
              className="mt-6 bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg"
            >
              {loading ? "生成中..." : "开始生成"}
            </button>
          </div>
        )}

        {active === "AI详情页生成" && (
          <div className="bg-slate-900 p-6 rounded-xl">
            <textarea
              className="w-full h-40 bg-slate-800 p-4 rounded-lg outline-none"
              placeholder="输入产品名称、卖点、适用场景，例如：智能化妆镜，高清补光，适合女生卧室..."
            />
            <button onClick={generate} className="mt-6 bg-blue-600 px-8 py-3 rounded-lg">
              生成详情页文案
            </button>
          </div>
        )}

        {active === "AI视频脚本" && (
          <div className="bg-slate-900 p-6 rounded-xl">
            <textarea
              className="w-full h-40 bg-slate-800 p-4 rounded-lg outline-none"
              placeholder="输入产品信息，AI会生成15秒短视频脚本..."
            />
            <button onClick={generate} className="mt-6 bg-purple-600 px-8 py-3 rounded-lg">
              生成视频脚本
            </button>
          </div>
        )}

        {active === "素材库" && (
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-slate-900 h-40 rounded-xl flex items-center justify-center text-slate-400">
                素材 {i}
              </div>
            ))}
          </div>
        )}

        {active === "会员中心" && (
          <div className="grid grid-cols-3 gap-6">
            {["免费版", "专业版", "企业版"].map((item, i) => (
              <div key={item} className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <h3 className="text-2xl font-bold mb-4">{item}</h3>
                <p className="text-slate-400 mb-6">{i === 0 ? "128积分" : i === 1 ? "3000积分/月" : "无限生成"}</p>
                <button className="bg-blue-600 w-full py-3 rounded-lg">
                  {i === 0 ? "当前套餐" : "立即升级"}
                </button>
              </div>
            ))}
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl mb-4">生成结果</h3>
            <div className="grid grid-cols-4 gap-4">
              {results.map((item, index) => (
                <div key={index} className="bg-slate-900 p-3 rounded-xl">
                  <img src={item} className="w-full h-48 object-contain rounded-lg" alt="结果" />
                  <button className="mt-3 bg-blue-600 w-full py-2 rounded-lg">下载</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}