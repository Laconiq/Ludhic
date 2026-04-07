import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(
    { error: 'Bingodir is temporarily disabled' },
    { status: 503 }
  );
}
