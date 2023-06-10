import { NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";

export function getErrorResponse(
  status: number = 500,
  message: string,
  errors: any = null
) {
  return new NextResponse(
    JSON.stringify({
      status: status < 500 ? "fail" : "error",
      message,
      errors: errors ? errors.flatten() : null,
    }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export const signJWT = async (
  payload: { sub: string },
  options: { exp: string }
) => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";
    return new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setExpirationTime(options.exp)
      .setIssuedAt()
      .setSubject(payload.sub)
      .sign(secret);
  } catch (error) {
    throw error;
  }
};

export const verifyJWT = async <T>(token: string): Promise<T> => {
  try {
    return (
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      )
    ).payload as unknown as T;
  } catch (error) {
    throw new Error("Your token has expired.");
  }
};