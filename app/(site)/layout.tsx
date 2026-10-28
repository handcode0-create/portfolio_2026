import { ScrollProgress } from "@/components/Motion";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";

/** Gabarit des pages intérieures (fiches projet). L'accueil a sa propre machine. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
