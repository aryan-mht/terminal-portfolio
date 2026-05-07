function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();
export const SITE_NAME = "Aryan Mehta — Software Engineer";
export const SITE_DESCRIPTION =
  "Terminal portfolio of Aryan Mehta — Software Engineering Honours student at USask. Backend, integrations, OS internals, and full-stack work, all behind a typeable prompt.";
