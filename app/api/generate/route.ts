import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { style } = await req.json()

    const response = await fetch(
      "https://api.siliconflow.cn/v1/images/generations",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "Kwai-Kolors/Kolors",
          prompt: `生成一张1:1电商主图，${style}风格，高清商品摄影，干净背景，商业质感，不要文字，不要水印`,
          image_size: "1024x1024",
          batch_size: 1,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({
        error: data.message || data.error || "AI生成失败",
      })
    }

    const image =
      data.images?.[0]?.url ||
      data.data?.[0]?.url ||
      data.data?.[0]?.b64_json ||
      ""

    if (!image) {
      return NextResponse.json({
        error: "生成成功但没有返回图片地址",
        raw: data,
      })
    }

    return NextResponse.json({
      image,
    })
  } catch (error) {
    return NextResponse.json({
      error: "服务器错误",
    })
  }
}
