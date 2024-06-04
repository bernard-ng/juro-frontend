import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const protectedRoutes = ['/chat']
const publicRoutes = ['/login', '/register']

const [AUTH_USER, AUTH_PASS] = (process.env.HTTP_BASIC_AUTH || ':').split(':');

export default async function middleware(req: NextRequest)  {
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)
    const token: string | undefined = cookies().get('token')?.value

    if (!isAuthenticated(req)) {
        return new NextResponse('Authentication required', {
            status: 401,
            headers: { 'WWW-Authenticate': 'Basic' },
        });
    }

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

function isAuthenticated(req: NextRequest) {
    const authHeader = req.headers.get('authorization') || req.headers.get('Authorization');

    if (!authHeader) {
        return false;
    }

    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const user = auth[0];
    const pass = auth[1];

    return user == AUTH_USER && pass == AUTH_PASS;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
