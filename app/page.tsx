import type { Viewport } from "next";
import "./recorder.css";
import { RecorderEngine } from "@/components/recorder/RecorderEngine";
import { Tape } from "@/components/recorder/Tape";

export const viewport: Viewport = { themeColor: "#0B0B0B", colorScheme: "light" };

/** Accueil : « L'Enregistreur » — la bande de papier. */
export default function HomePage() {
  return (
    <RecorderEngine>
      <Tape />
    </RecorderEngine>
  );
}
