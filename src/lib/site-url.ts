/** Production canonical URL on Vercel; override for other hosting environments. */
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://fullstack-portfolio-omega-one.vercel.app")
);
