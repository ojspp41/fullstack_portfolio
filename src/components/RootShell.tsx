import { JetBrains_Mono } from "next/font/google";
import CursorGlow from "@/components/CursorGlow";
import ParticleBackground from "@/components/ParticleBackground";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "@/app/globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

// applied before paint: stored choice > light (design default on first visit)
const THEME_INIT = `(function(){try{var t=localStorage.getItem("theme");document.documentElement.classList.toggle("dark",t==="dark")}catch(e){}})()`;

/** Shared <html>/<body> chrome for both locale root layouts. */
export default function RootShell({
  lang,
  children,
}: {
  lang: "ko" | "en";
  children: React.ReactNode;
}) {
  return (
    <html lang={lang} className={jetbrainsMono.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body className="antialiased">
        <div className="blob blob-1" aria-hidden />
        <div className="blob blob-2" aria-hidden />
        <div className="blob blob-3" aria-hidden />
        <ParticleBackground />
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
