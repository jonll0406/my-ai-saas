import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { style } = await req.json()

    const prompt = `
生成一张1:1电商平台主图。
产品类型：家居/电商产品。
场景风格：${style || "现代简约"}。
要求：
高清真实摄影风格，
干净背景，
适合淘宝、天猫、京东主图，
产品居中展示，
商业质感，
不要文字，
不要水印。
`

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt,
        size: "1024x1024",
        n: 1,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || "生成失败" },
        { status: 500 }
      )
    }

    const imageBase64 = data.data?.[0]?.b64_json

    return NextResponse.json({
      image: `data:image/png;base64,${imageBase64}`,
    })
  } catch (error) {
    return NextResponse.json(
      { error: "服务器错误" },
      { status: 500 }
    )
  }
}
