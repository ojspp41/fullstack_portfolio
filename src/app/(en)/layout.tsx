import type { Metadata, Viewport } from "next";
import RootShell from "@/components/RootShell";
import { siteUrl } from "@/lib/site-url";

const TITLE = "Junseok Oh — AI Product / Full-Stack Engineer";
const DESCRIPTION =
  "AI Product / Full-Stack Engineer turning generative AI into working products. AI Atlas for ~10,000 people across 13 affiliates, enterprise Agent safety validation, On-Prem sLLM × MES MCP production reporting, an AI development workflow, and six technical deep dives.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: TITLE,
  description: DESCRIPTION,
  alternates: { languages: { ko: "/", en: "/en" } },
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "en_US",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e8e4fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
