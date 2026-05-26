import { NextRequest, NextResponse } from 'next/server';
import { getProperties, createProperty } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const properties = await getProperties(false);
  return NextResponse.json(properties);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const property = await createProperty(body);
    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
  }
}
