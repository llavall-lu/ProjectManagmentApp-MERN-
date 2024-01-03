import {  authMiddleware } from "@clerk/nextjs"; // import the auth middleware


export default authMiddleware({});

export const config = {
    matcher: ["/((?!_next/image|_next/static|favicon.ico).*)", "/"],
  };