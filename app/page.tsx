"use client"

import { useState } from "react"

export default function HomePage() {
  const [style, setStyle] = useState("现代简约")
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState("")

  async function generateImage() {
    try {
      setLoading(true)

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          style,
        }),
      })

      const data = await response.json()

      if (data.error) {
        alert(data.error)
        return
      }

      setImage(data.image)
    } catch (error) {
      alert("生成失败")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          AI电商主图生成平台
        </h1>

        <div className="bg-slate-900 rounded-2xl p-6">

          <h2 className="text-xl mb-4">
            选择场景风格
          </h2>

          <div className="flex gap-3 flex-wrap mb-6">
            {[
              "现代简约",
              "科技未来",
              "温馨家居",
              "高级轻奢",
              "自然清新",
              "专业棚拍",
            ].map((item) => (
              <button
                key={item}
                onClick={() => setStyle(item)}
                className={`px-4 py-2 rounded-lg ${
                  style === item
                    ? "bg-blue-600"
                    : "bg-slate-700"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            onClick={generateImage}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-bold"
          >
            {loading ? "AI生成中..." : "开始AI生成"}
          </button>

        </div>

        {image && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">
              AI生成结果
            </h2>

            <img
              src={image}
              alt=""
              className="rounded-2xl w-full max-w-xl"
            />
          </div>
        )}

      </div>
    </div>
  )
}
