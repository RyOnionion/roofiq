import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RoofIQ | Commercial Roofing Market Intelligence',
  description: 'Market scoring dashboard for commercial roofing expansion.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
