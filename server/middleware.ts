import { NextRequest, NextResponse } from "next/server";
import { getErrorResponse, verifyJWT } from "./lib/utils";

export interface AuthenticatedRequest extends NextRequest {
  user: {
    id: string;
  };
}

export async function middleware(req: NextRequest) {
  let token: string | undefined;

  if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
    token = req.headers.get("Authorization")?.substring(7);
  }

  if (!token) {
    return getErrorResponse(
      401,
      "You are not logged in. Please provide a token to gain access."
    );
  }

  const response = NextResponse.next();

  try {
    if (token) {
      const { sub } = await verifyJWT<{ sub: string }>(token);
      (req as AuthenticatedRequest).user = { id: sub };
      response.headers.set("X-USER-ID", sub);
    }
  } catch (error) {
    return getErrorResponse(401, "Token is invalid or user doesn't exists");
  }

  return response;
}

export const config = {
  matcher: ["/api/user/:path*", "/api/chat-stream"],
};
