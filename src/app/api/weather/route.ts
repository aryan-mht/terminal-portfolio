import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const WMO_CONDITIONS: Record<number, string> = {
  0: "Clear",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Rime fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Dense drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Heavy rain showers",
  82: "Violent rain showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Severe thunderstorm",
};

interface OpenMeteoResponse {
  current?: {
    temperature_2m?: number;
    weather_code?: number;
    wind_speed_10m?: number;
    wind_direction_10m?: number;
    relative_humidity_2m?: number;
  };
}

function compass(deg: number | undefined): string {
  if (deg === undefined) return "";
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8] ?? "";
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");
  if (!lat || !lon) {
    return NextResponse.json({ error: "missing lat/lon" }, { status: 400 });
  }
  try {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lon)}&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m,relative_humidity_2m`;
    const res = await fetch(apiUrl, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ error: "weather failed" }, { status: 502 });
    }
    const data = (await res.json()) as OpenMeteoResponse;
    const c = data.current ?? {};
    return NextResponse.json({
      temp: c.temperature_2m ?? null,
      condition: c.weather_code !== undefined ? (WMO_CONDITIONS[c.weather_code] ?? "Unknown") : null,
      wind: c.wind_speed_10m ?? null,
      windDir: compass(c.wind_direction_10m),
      humidity: c.relative_humidity_2m ?? null,
    });
  } catch {
    return NextResponse.json({ error: "weather failed" }, { status: 502 });
  }
}
