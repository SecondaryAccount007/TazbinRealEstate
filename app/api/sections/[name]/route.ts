import { NextRequest, NextResponse } from 'next/server';
import { updateSection } from '@/lib/db';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  try {
    const body = await request.json();
    await updateSection(name, body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update section' }, { status: 500 });
  }
}
