import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Header from '@/components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kasa',
  description: 'Location de logements entre particuliers',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main className="conteneur">{children}</main>
      </body>
    </html>
  );
}
