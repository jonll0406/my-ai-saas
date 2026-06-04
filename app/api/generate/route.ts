import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { style, image } = await req.json()

    if (!image) {
      return NextResponse.json({
        error: "请先上传产品图片",
      })
    }

    const response = await fetch(
      "https://api.siliconflow.cn/v1/images/generations",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "Qwen-Image-Edit",
          prompt: `根据上传的产品图生成一张1:1中国电商主图，保留产品主体和外观，${style}风格，高级商品摄影，干净背景，真实光影，商业质感，适合淘宝京东拼多多，不要文字，不要水印`,
          image,
          image_size: "1024x1024",
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({
        error: data.message || data.error || "AI生成失败",
        raw: data,
      })
    }

    const resultImage =
      data.images?.[0]?.url ||
      data.data?.[0]?.url ||
      ""

    if (!resultImage) {
      return NextResponse.json({
        error: "没有返回图片",
        raw: data,
      })
    }

    return NextResponse.json({
      image: resultImage,
    })
  } catch (error) {
    return NextResponse.json({
      error: "服务器错误",
    })
  }
}
