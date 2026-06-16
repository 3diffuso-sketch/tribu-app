import type { Metadata, Viewport } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "./client-providers";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#C4442A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "TribU — La intimidad empieza en comunidad",
  description:
    "Descubre eventos, únete a comunidades y conecta con personas afines en Valencia. TribU es la plataforma donde las relaciones auténticas nacen de experiencias compartidas.",
  keywords: ["eventos Valencia", "comunidad", "citas", "conexiones", "actividades sociales"],
  openGraph: {
    title: "TribU — La intimidad empieza en comunidad",
    description: "Descubre eventos, comunidades y conexiones auténticas en Valencia.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${playfair.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ClientProviders>
          <main className="flex-1 page-content">{children}</main>
        </ClientProviders>
      </body>
    </html>
  );
}
