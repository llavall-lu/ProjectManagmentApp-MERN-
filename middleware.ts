import {  authMiddleware } from "@clerk/nextjs"; // import the auth middleware


export default authMiddleware({
  publicRoutes: ["/landingPage"]
});
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};