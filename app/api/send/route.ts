import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: Request) {
    try {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'Email service not configured.' }, { status: 500 });
        }

        // Initialize inside the handler so env vars are available at runtime
        const resend = new Resend(apiKey);

        const { name, email, company, service, budget, timeline, message } = await request.json();

        const { data, error } = await resend.emails.send({
            from: 'Lzmu Quote Request <onboarding@resend.dev>',
            to: ['hello@lzmu.dev'],
            subject: `New Quote Request from ${name}`,
            html: `
        <h2>New Project Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Timeline:</strong> ${timeline || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        });

        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
