import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface IpapiResponse {
  ip?: string;
  city?: string;
  region?: string;
  country_name?: string;
  latitude?: number;
  longitude?: number;
  error?: boolean;
  reason?: string;
}

function clientIp(req: Request): string | null {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return null;
}

export async function GET(req: Request) {
  const ip = clientIp(req);
  const url = ip ? `https://ipapi.co/${ip}/json/` : "https://ipapi.co/json/";
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "aryan.me-portfolio" },
      cache: "no-store",
    });
    if (!res.ok) {
      return NextResponse.json({ error: "lookup failed" }, { status: 502 });
    }
    const data = (await res.json()) as IpapiResponse;
    if (data.error) {
      return NextResponse.json({ error: data.reason ?? "lookup failed" }, { status: 502 });
    }
    return NextResponse.json({
      ip: data.ip ?? ip ?? null,
      city: data.city ?? null,
      region: data.region ?? null,
      country: data.country_name ?? null,
      latitude: data.latitude ?? null,
      longitude: data.longitude ?? null,
    });
  } catch {
    return NextResponse.json({ error: "lookup failed" }, { status: 502 });
  }
}
