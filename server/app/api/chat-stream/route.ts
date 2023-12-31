import type { NextRequest } from "next/server";
import prisma from '@/lib/db'
import { ChatGPTMessage, OpenAIStream, OpenAIStreamPayload } from "@/lib/openAIStream";
import { User } from "@prisma/client";

const handler = async (req: NextRequest) => {
  const body = await req.json();
  const { messages } = body;
  const userId = req.headers.get("X-USER-ID");
  const user: User | null = await prisma.user.findUnique({
    where: {
      id: userId!,
    },
  });
  if (!user) {
    return new Response(JSON.stringify({
      status: "fail",
      message: '请先登录',
    }))
  }
  const isAdmin = user.role === 'ADMIN';
  if (!isAdmin && (!user.credit || user.credit <= 0)) {
    return new Response(JSON.stringify({
      status: "fail",
      message: '使用次数不足',
    }))
  }

  if (!messages) {
    return new Response(JSON.stringify({
      status: "fail",
      message: '请先输入你的问题',
    }))
  }


  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0.7,
    top_p: 1,
    max_tokens: 800,
    stream: true,
  };

  const stream = await OpenAIStream(payload);
  !isAdmin && await prisma.user.update({
    where: {
      id: userId!,
    },
    data: {
      credit: {
        decrement: 1
      },
    },
  })
  return new Response(stream);

};

export { handler as POST, handler as GET };

// export const runtime = "edge";
