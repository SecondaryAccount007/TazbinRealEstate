import { NextResponse } from 'next/server';
import { getSections } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const sections = await getSections();
  return NextResponse.json(sections);
}
