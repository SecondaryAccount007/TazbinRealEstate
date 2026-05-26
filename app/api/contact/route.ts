import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, interest } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    // Log the submission (you can add email/CRM integration here)
    console.log('Contact Form Submission:', {
      name, email, phone, message, interest,
      timestamp: new Date().toISOString(),
    });

    // Optional: Send email via a service like Resend, SendGrid, etc.
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({ from: '...', to: '...', subject: '...', text: '...' });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}
