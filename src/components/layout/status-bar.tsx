'use client';

import { useEffect, useState } from "react";
import { useClock } from "@/lib/use-clock";

interface IpData {
  city: string | null;
  latitude: number | null;
  longitude: number | null;
}

interface WeatherData {
  temp: number | null;
}

const REFRESH_MS = 10 * 60 * 1000;

export function StatusBar() {
  const clock = useClock();
  const [city, setCity] = useState<string | null>(null);
  const [temp, setTemp] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const ipRes = await fetch("/api/ip");
        if (!ipRes.ok) throw new Error();
        const ip: IpData = await ipRes.json();
        if (cancelled) return;
        setCity(ip.city);
        if (ip.latitude == null || ip.longitude == null) throw new Error();
        const wRes = await fetch(`/api/weather?lat=${ip.latitude}&lon=${ip.longitude}`);
        if (!wRes.ok) throw new Error();
        const w: WeatherData = await wRes.json();
        if (cancelled) return;
        setTemp(w.temp);
        setError(false);
      } catch {
        if (!cancelled) setError(true);
      }
    };

    load();
    const id = window.setInterval(load, REFRESH_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  let weatherLabel: string;
  if (error) {
    weatherLabel = "—";
  } else if (temp == null || city == null) {
    weatherLabel = "— °C";
  } else {
    weatherLabel = `${city} ${Math.round(temp)}°C`;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-3 px-4"
      style={{
        height: "var(--status-bar-height)",
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
        color: "var(--color-muted)",
        fontSize: "var(--text-sm)",
        fontFamily: "var(--font-mono)",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{weatherLabel}</span>
      <span className="hidden sm:inline">aryan.dev</span>
      <span
        suppressHydrationWarning
        style={{ overflow: "hidden", textOverflow: "ellipsis" }}
      >
        {clock || " "}
      </span>
    </div>
  );
}
