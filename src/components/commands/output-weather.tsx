'use client';

import { useEffect, useState } from "react";

interface IpData {
  city: string | null;
  region: string | null;
  latitude: number | null;
  longitude: number | null;
}

interface WeatherData {
  temp: number | null;
  condition: string | null;
  wind: number | null;
  windDir: string;
  humidity: number | null;
}

export function OutputWeather() {
  const [city, setCity] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [w, setW] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const ipRes = await fetch("/api/ip");
        if (!ipRes.ok) throw new Error();
        const ip: IpData = await ipRes.json();
        if (cancelled) return;
        setCity(ip.city);
        setRegion(ip.region);
        if (ip.latitude == null || ip.longitude == null) {
          throw new Error();
        }
        const wRes = await fetch(`/api/weather?lat=${ip.latitude}&lon=${ip.longitude}`);
        if (!wRes.ok) throw new Error();
        const data: WeatherData = await wRes.json();
        if (!cancelled) setW(data);
      } catch {
        if (!cancelled) setError("Could not fetch weather.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return <div style={{ color: "var(--color-error)", fontFamily: "var(--font-mono)" }}>{error}</div>;
  }
  if (!w) {
    return <div style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}>Fetching weather…</div>;
  }
  const place = [city, region].filter(Boolean).join(", ") || "Unknown location";
  return (
    <div style={{ fontFamily: "var(--font-mono)", whiteSpace: "pre-wrap" }}>
      <div style={{ color: "var(--color-text)" }}>🌤  {place}</div>
      <div>
        <span style={{ color: "var(--color-accent)" }}>    {w.temp != null ? `${Math.round(w.temp)}°C` : "—"}</span>
        <span style={{ color: "var(--color-muted)" }}> — {w.condition ?? "—"}</span>
      </div>
      <div>
        <span style={{ color: "var(--color-muted)" }}>    Wind: </span>
        <span style={{ color: "var(--color-text)" }}>
          {w.wind != null ? `${Math.round(w.wind)} km/h ${w.windDir}` : "—"}
        </span>
      </div>
      <div>
        <span style={{ color: "var(--color-muted)" }}>    Humidity: </span>
        <span style={{ color: "var(--color-text)" }}>{w.humidity != null ? `${w.humidity}%` : "—"}</span>
      </div>
    </div>
  );
}
