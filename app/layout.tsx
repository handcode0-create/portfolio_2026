import type { Metadata, Viewport } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { MotionProvider } from "@/components/Motion";
import { site } from "@/data/site";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
// Police unique de la bande « L'Enregistreur » (accueil)
// Auto-hébergée (variable 100–800, sous-ensemble latin) : aucune requête vers Google.
const mono = localFont({
  src: "../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-mono",
  weight: "100 800",
  display: "swap",
  fallback: ["ui-monospace", "Menlo", "Consolas", "monospace"],
});

export const viewport: Viewport = { themeColor: "#0B0B0B", colorScheme: "dark" };

export const metadata: Metadata = {
  authors: [{ name: site.owner.name }],
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s · HANCODE" },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
    images: [{ url: "/portfolio-bg/devices.webp", width: 1600, height: 900, alt: "HANCODE — interfaces et produits numériques" }],
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};

// Marque le document « js » avant le premier rendu (états initiaux des scènes GSAP) et
// libère le contenu après 3 s si l'hydratation tarde : le contenu n'est jamais bloqué.
const bootScript =
  "document.documentElement.classList.add('js');setTimeout(function(){document.documentElement.classList.add('js-late')},3000);";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Aller au contenu
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
