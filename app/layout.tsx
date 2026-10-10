import type { Metadata } from "next";
import "./globals.css";
import {MotionProvider} from "@/components/Motion";
export const metadata: Metadata = {
  title:"HANCODE — Digital Products",
  description:"Portfolio de HANCODE — applications web, mobiles et produits numériques.",
  openGraph:{title:"HANCODE — Digital Products",description:"Applications web, mobiles et produits numériques.",type:"website"}
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr"><body><MotionProvider>{children}</MotionProvider></body></html>}