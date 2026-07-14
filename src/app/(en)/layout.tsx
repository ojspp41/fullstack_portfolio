import type { Metadata, Viewport } from "next";
import RootShell from "@/components/RootShell";

const TITLE = "Junseok Oh — Full-Stack Engineer · AI / LLM Application";
const DESCRIPTION =
  "Back-office admin full-stack — from the screen to server contracts, pipeline integration, and infra. Designed and built the RESTful metering/billing APIs for an internal AI (LLM) service serving 10,000 users across 13 Hansol Group affiliates. Queries 750x faster · re-renders down 99.6% · Docker image halved.";

export const metadata: Metadata = {
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
