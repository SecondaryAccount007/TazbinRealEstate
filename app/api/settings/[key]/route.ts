import { NextRequest, NextResponse } from 'next/server';
import { upsertSetting } from '@/lib/db';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  try {
    const body = await request.json();
    await upsertSetting(key, body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to save setting' }, { status: 500 });
  }
}
