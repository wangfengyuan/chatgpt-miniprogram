import { NextRequest } from "next/server";
import prisma from '@/lib/db'
import type { User } from "@prisma/client";
import { signJWT } from "@/lib/utils";

const { WX_APPID, WX_SECRET, DEFAULT_CREDIT } = process.env;

/**
 * 注册用户
 * @param req 
 * @returns 
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { code } = body;
  const response = await fetch(`https://api.weixin.qq.com/sns/jscode2session?appid=${WX_APPID}&secret=${WX_SECRET}&js_code=${code}&grant_type=authorization_code`)
  const jscode2session = await response.json();

  let user: Partial<User | null> = await prisma.user.findUnique({
    where: {
      wx_openid: jscode2session.openid,
    },
  })
  if (!user) {
    user = await prisma.user.create({
      data: {
        wx_openid: jscode2session.openid,
        credit: Number(DEFAULT_CREDIT),
      },
    })
  }
  const token = await signJWT({ sub: user.id! }, { exp: '1h' });
  delete user.wx_openid;
  return new Response(JSON.stringify({
    status: "success",
    data: {
      token,
      user,
    },
  }))
}
