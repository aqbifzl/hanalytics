import { type NextApiResponse } from "next"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { insertData } from "~/db/data"
import { streamToString } from "~/utils/api"
import { insertInput } from "~/zod/api/insert"

const handler = async (req: Request | NextRequest, _: NextApiResponse) => {
  const headersInstance = headers()
  const auth = headersInstance.get("authorization")
  const apiKey = process.env.INSERT_SECRET

  if(!auth || !apiKey || auth != apiKey) {
    return NextResponse.json({ error: "You're not authenticated" }, { status: 401 })
  }

  try{

    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
    const data = insertInput.parse(JSON.parse(await streamToString(req.body as ReadableStream<Uint8Array>)))
    const {referrer, userAgent, ip, application, screenWidth, screenHeight} = data

    await insertData({
      referrer,
      userAgent,
      ip,
      application,
      screenWidth,
      screenHeight,
    })

    return Response.json({message: "OK"})
  } catch(e) {
    console.log(e)
    return NextResponse.json({ error: "Invalid data" }, { status: 400 })
  }
}

export { handler as POST };
