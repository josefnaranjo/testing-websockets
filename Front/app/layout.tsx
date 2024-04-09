import type { Metadata } from 'next';
import { Inter, Roboto } from 'next/font/google';
import './globals.css';

//https://nextjs.org/docs/pages/building-your-application/optimizing/fonts

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Communation App',
  description: 'Made by MLM Team',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
