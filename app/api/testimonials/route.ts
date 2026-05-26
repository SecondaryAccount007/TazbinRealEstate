import { NextRequest, NextResponse } from 'next/server';
import { getTestimonials, createTestimonial } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const testimonials = await getTestimonials(false);
  return NextResponse.json(testimonials);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const testimonial = await createTestimonial(body);
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}
