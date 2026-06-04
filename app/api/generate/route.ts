import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { style } = await req.json()

    const response = await fetch(
      "https://api.siliconflow.cn/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "Kwai-Kolors/Kolors",
          prompt: `电商产品主图，${style}风格，高级感，商品摄影，白底，高清`,
          image_size: "1024x1024"
        })
      }
    )

    const data = await response.json()

    return NextResponse.json({
      image: data.images?.[0]?.url
    })

  } catch (error) {
    return NextResponse.json({
      error: "生成失败"
    })
  }
}
