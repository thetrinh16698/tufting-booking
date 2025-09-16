import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Add any custom middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to public pages
        const publicPaths = ['/', '/services', '/about-me', '/auth/signin']
        if (publicPaths.includes(req.nextUrl.pathname)) {
          return true
        }
        
        // Require authentication for protected routes
        const protectedPaths = ['/account', '/book-now']
        if (protectedPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
          return !!token
        }
        
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/account/:path*',
    '/book-now/:path*',
  ]
}
