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
          model: "black-forest-labs/FLUX.1-schnell",

          prompt: `
生成一张高质量中国电商主图，
风格：${style}，
高级商品摄影，
白色干净背景，
真实光影，
商业广告风，
4K高清，
不要文字，
不要水印，
适合淘宝京东拼多多主图
          `,

          width: 1024,
          height: 1024,
        }),
      }
    )

    const data = await response.json()

    console.log(data)

    if (!response.ok) {
      return NextResponse.json({
        error:
          data.message ||
          data.error ||
          "AI生成失败",
      })
    }

    const image =
      data.images?.[0]?.url ||
      data.data?.[0]?.url ||
      ""

    if (!image) {
      return NextResponse.json({
        error: "没有返回图片",
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
