"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  const [active, setActive] = useState("AI主图生成")
  const [image, setImage] = useState<string | null>(null)
  const [points, setPoints] = useState(128)
  const [member, setMember] = useState("免费版")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<string[]>([])
  const [assets, setAssets] = useState<string[]>([])
  const [detailText, setDetailText] = useState("")
  const [videoText, setVideoText] = useState("")

  const menus = ["控制台", "AI主图生成", "AI详情页生成", "AI视频脚本", "素材库", "会员中心"]
  const styles = ["现代简约", "科技未来", "自然清新", "轻奢优雅", "温馨居家", "专业棚拍"]

  useEffect(() => {
    if (localStorage.getItem("isLogin") !== "true") {
      router.push("/login")
    }

    const savedAssets = localStorage.getItem("assets")
    const savedPoints = localStorage.getItem("points")
    const savedMember = localStorage.getItem("member")

    if (savedAssets) setAssets(JSON.parse(savedAssets))
    if (savedPoints) setPoints(Number(savedPoints))
    if (savedMember) setMember(savedMember)
  }, [router])

  function saveAssets(newAssets: string[]) {
    setAssets(newAssets)
    localStorage.setItem("assets", JSON.stringify(newAssets))
  }

  function savePoints(num: number) {
    setPoints(num)
    localStorage.setItem("points", String(num))
  }

  function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    setImage(url)

    const newAssets = [url, ...assets]
    saveAssets(newAssets)
  }

  function generateImage() {
    if (!image) {
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
      const newResults = [image, image, image, image]

      savePoints(points - 2)
      setResults(newResults)
      saveAssets([...newResults, ...assets])
      setLoading(false)
    }, 1500)
  }

  function generateDetail() {
    if (points < 2) {
      alert("积分不足，请开通会员")
      return
    }

    savePoints(points - 2)

    setDetailText(
      "【产品亮点】\n1. 简约现代外观，适合多种家居场景。\n2. 大容量收纳设计，让空间更整洁。\n3. 防尘防潮，适合客厅、卧室、阳台使用。\n\n【详情页文案】\n这款收纳柜采用清爽简约设计，兼顾美观与实用。多层分类收纳，轻松整理日常杂物，让家居空间更干净有序。适合电商主图、详情页、短视频种草使用。"
    )
  }

  function generateVideo() {
    if (points < 2) {
      alert("积分不足，请开通会员")
      return
    }

    savePoints(points - 2)

    setVideoText(
      "15秒短视频脚本：\n\n0-3秒：展示凌乱房间，字幕：家里东西太多没地方放？\n3-7秒：镜头切换到收纳柜，字幕：一柜解决杂物收纳。\n7-12秒：展示分类存放衣物、玩具、日用品。\n12-15秒：产品特写，字幕：简约美观，大容量收纳，马上入手！"
    )
  }

  function deleteAsset(index: number) {
    const newAssets = assets.filter((_, i) => i !== index)
    saveAssets(newAssets)
  }

  function upgrade(plan: string) {
    if (plan === "专业版") {
      setMember("专业版")
      localStorage.setItem("member", "专业版")
      savePoints(3000)
      alert("已升级为专业版，获得3000积分")
    }

    if (plan === "企业版") {
      setMember("企业版")
      localStorage.setItem("member", "企业版")
      savePoints(999999)
      alert("已升级为企业版，获得无限积分")
    }
  }

  function logout() {
    localStorage.removeItem("isLogin")
    router.push("/login")
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

        <button
          onClick={logout}
          className="mt-10 w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg"
        >
          退出登录
        </button>
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
            <h3 className="text-3xl font-bold mt-2">{results.length}</h3>
          </div>

          <div className="bg-slate-900 p-5 rounded-xl">
            <p className="text-slate-400">会员等级</p>
            <h3 className="text-3xl font-bold mt-2 text-blue-400">{member}</h3>
          </div>

          <div className="bg-slate-900 p-5 rounded-xl">
            <p className="text-slate-400">素材数量</p>
            <h3 className="text-3xl font-bold mt-2">{assets.length}</h3>
          </div>
        </div>

        {active === "控制台" && (
          <div className="bg-slate-900 p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">欢迎使用电商AI运营平台</h3>
            <p className="text-slate-400">
              当前版本支持：主图生成、详情页文案、视频脚本、素材库、会员积分。
            </p>
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
                <button
                  key={item}
                  className="bg-slate-800 hover:bg-blue-600 px-4 py-2 rounded-lg"
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              onClick={generateImage}
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
              placeholder="输入产品名称、卖点、适用场景..."
            />

            <button onClick={generateDetail} className="mt-6 bg-blue-600 px-8 py-3 rounded-lg">
              生成详情页文案
            </button>

            {detailText && (
              <pre className="mt-6 bg-slate-800 p-5 rounded-xl whitespace-pre-wrap text-slate-200">
                {detailText}
              </pre>
            )}
          </div>
        )}

        {active === "AI视频脚本" && (
          <div className="bg-slate-900 p-6 rounded-xl">
            <textarea
              className="w-full h-40 bg-slate-800 p-4 rounded-lg outline-none"
              placeholder="输入产品信息，AI会生成15秒短视频脚本..."
            />

            <button onClick={generateVideo} className="mt-6 bg-purple-600 px-8 py-3 rounded-lg">
              生成视频脚本
            </button>

            {videoText && (
              <pre className="mt-6 bg-slate-800 p-5 rounded-xl whitespace-pre-wrap text-slate-200">
                {videoText}
              </pre>
            )}
          </div>
        )}

        {active === "素材库" && (
          <div>
            {assets.length === 0 ? (
              <div className="bg-slate-900 p-8 rounded-xl text-slate-400">
                暂无素材，请先上传或生成图片。
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-4">
                {assets.map((item, index) => (
                  <div key={index} className="bg-slate-900 p-3 rounded-xl">
                    <img src={item} className="w-full h-40 object-contain rounded-lg" alt="素材" />

                    <a
                      href={item}
                      download={`asset-${index}.png`}
                      className="mt-3 bg-blue-600 w-full py-2 rounded-lg block text-center"
                    >
                      下载
                    </a>

                    <button
                      onClick={() => deleteAsset(index)}
                      className="mt-3 bg-red-600 w-full py-2 rounded-lg"
                    >
                      删除
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {active === "会员中心" && (
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
              <h3 className="text-2xl font-bold mb-4">免费版</h3>
              <p className="text-slate-400 mb-6">128积分</p>
              <button className="bg-slate-700 w-full py-3 rounded-lg">当前套餐</button>
            </div>

            <div className="bg-slate-900 p-6 rounded-xl border border-blue-600">
              <h3 className="text-2xl font-bold mb-4">专业版</h3>
              <p className="text-slate-400 mb-6">99元/月 · 3000积分</p>
              <button onClick={() => upgrade("专业版")} className="bg-blue-600 w-full py-3 rounded-lg">
                模拟升级
              </button>
            </div>

            <div className="bg-slate-900 p-6 rounded-xl border border-purple-600">
              <h3 className="text-2xl font-bold mb-4">企业版</h3>
              <p className="text-slate-400 mb-6">299元/月 · 无限生成</p>
              <button onClick={() => upgrade("企业版")} className="bg-purple-600 w-full py-3 rounded-lg">
                模拟升级
              </button>
            </div>
          </div>
        )}

        {results.length > 0 && active !== "素材库" && (
          <div className="mt-8">
            <h3 className="text-xl mb-4">生成结果</h3>
            <div className="grid grid-cols-4 gap-4">
              {results.map((item, index) => (
                <div key={index} className="bg-slate-900 p-3 rounded-xl">
                  <img src={item} className="w-full h-48 object-contain rounded-lg" alt="结果" />

                  <a
                    href={item}
                    download={`image-${index}.png`}
                    className="mt-3 bg-blue-600 w-full py-2 rounded-lg block text-center"
                  >
                    下载
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}