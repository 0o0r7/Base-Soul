import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Base Soul',
  description: 'Reveal your Farcaster soul archetype and color.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-background text-foreground min-h-screen antialiased`}>
        <main className="flex flex-col items-center min-h-screen p-4 sm:p-8 md:p-12 relative overflow-hidden">
          <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-[#0a0a0a] to-black -z-10" />
          {children}
        </main>
      </body>
    </html>
  );
}