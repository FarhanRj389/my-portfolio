import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Farhan Ahmed — Web Developer & Shopify Specialist',
  description: 'Portfolio of Farhan Ahmed, a web developer, Shopify and WordPress specialist, and electronics engineer based in Karachi, Pakistan.',
  keywords: ['Farhan Ahmed', 'Web Developer', 'Shopify Specialist', 'WordPress Developer', 'Karachi'],
  openGraph: { title: 'Farhan Ahmed — Web Developer & Shopify Specialist', description: 'Fast, conversion-focused websites and e-commerce stores.', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" suppressHydrationWarning><body className={`${inter.variable} ${space.variable}`}><Providers>{children}</Providers></body></html>;
}
