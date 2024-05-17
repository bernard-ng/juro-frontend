import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const protectedRoutes = ['/chat']
const publicRoutes = ['/login', '/register']

export default async function middleware(req: NextRequest)  {
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    const token: string | undefined = cookies().get('token')?.value

    if (isProtectedRoute && token === undefined) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    if (isPublicRoute && token !== undefined && !req.nextUrl.pathname.startsWith('/')) {
        return NextResponse.redirect(new URL('/chat', req.nextUrl))
    }

    if (isPublicRoute && token !== undefined) {
        return NextResponse.redirect(new URL('/chat', req.nextUrl))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
