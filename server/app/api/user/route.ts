import prisma from '@/lib/db'
import type { User } from "@prisma/client";
import { AuthenticatedRequest } from "@/middleware";

export async function GET(req: AuthenticatedRequest) {
  const userId = req.headers.get("X-USER-ID");
  const user: Partial<User | null> = await prisma.user.findUnique({
    where: {
      id: userId!,
    },
  })
  delete user!.wx_openid;
  return new Response(JSON.stringify({
    status: "success",
    data: user,
  }))
}