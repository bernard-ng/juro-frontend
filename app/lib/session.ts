import 'server-only'
import { cookies } from 'next/headers'

export async function createSession(token: string): Promise<void> {
    cookies().set('token', token, {
        domain: process.env.API_URL === 'https://localhost:8000/api' ? 'localhost' : 'juro.life',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
    })
}

export function deleteSession() {
    cookies().delete('token')
}
