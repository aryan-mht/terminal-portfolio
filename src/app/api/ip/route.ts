import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface IpapiResponse {
  ip?: string;
  city?: string;
  region?: string;
  country_name?: string;
  latitude?: number;
  longitude?: number;
}

export async function GET() {
  try {
    const res = await fetch("https://ipapi.co/json/", {
      headers: { "User-Agent": "aryan.me-portfolio" },
      cache: "no-store",
    });
    if (!res.ok) {
      return NextResponse.json({ error: "lookup failed" }, { status: 502 });
    }
    const data = (await res.json()) as IpapiResponse;
    return NextResponse.json({
      ip: data.ip ?? null,
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
