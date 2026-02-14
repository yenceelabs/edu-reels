import { NextResponse } from 'next/server';

const AUTH_PASSWORD = process.env.AUTH_PASSWORD;
const AUTH_COOKIE = 'edu-reels-auth';

export async function POST(request: Request) {
  try {
    // Require AUTH_PASSWORD to be set
    if (!AUTH_PASSWORD) {
      console.error('AUTH_PASSWORD environment variable is not set');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const { password } = await request.json();

    if (password === AUTH_PASSWORD) {
      const response = NextResponse.json({ success: true });
      
      // Set auth cookie (7 days)
      response.cookies.set(AUTH_COOKIE, 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(AUTH_COOKIE);
  return response;
}
