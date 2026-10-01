import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { transporter } from '@/lib/mailer';

export const runtime = 'nodejs';

const schema = z.object({ name: z.string().min(2).max(80), email: z.string().email().max(160), subject: z.string().min(3).max(160), message: z.string().min(15).max(5000), website: z.string().max(0).optional() });
const recentRequests = new Map<string, number[]>();

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const now = Date.now();
    const recent = (recentRequests.get(ip) || []).filter((time) => now - time < 10 * 60 * 1000);
    if (recent.length >= 3) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    recentRequests.set(ip, [...recent, now]);
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success || parsed.data.website) return NextResponse.json({ error: 'Please check your details' }, { status: 400 });
    const { name, email, subject, message } = parsed.data;
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const { error: insertError } = await supabase.from('messages').insert({ name, email, subject, message });
    if (insertError) throw insertError;
    await transporter.sendMail({ from: process.env.SMTP_USER, to: process.env.CONTACT_TO_EMAIL, replyTo: email, subject: `[My Portfolio] New message: ${subject}`, html: `<div style="font-family:Arial,sans-serif;background:#0a0a0a;color:#fff;padding:32px"><p style="color:#facc15;font-weight:bold;letter-spacing:2px">MY PORTFOLIO</p><h1 style="font-size:28px">New message from ${escapeHtml(name)}</h1><p style="color:#aaa">${escapeHtml(email)} · ${escapeHtml(subject)}</p><div style="margin-top:24px;padding:20px;border:1px solid #333;line-height:1.7">${escapeHtml(message).replace(/\n/g, '<br />')}</div></div>` });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Unable to send your message' }, { status: 500 });
  }
}
function escapeHtml(value: string) { return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character] || character); }
