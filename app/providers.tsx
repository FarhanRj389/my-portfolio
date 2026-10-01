'use client';

import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
      <Toaster theme="dark" position="bottom-right" toastOptions={{ style: { background: '#171717', border: '1px solid #333', color: '#fff' } }} />
    </ThemeProvider>
  );
}
