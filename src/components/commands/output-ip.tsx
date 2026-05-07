'use client';

import { useEffect, useState } from "react";

interface IpData {
  ip: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
}

export function OutputIp() {
  const [data, setData] = useState<IpData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/ip")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("lookup failed"))))
      .then((d: IpData) => {
        if (!cancelled) setData(d);
      })
      .catch(() => {
        if (!cancelled) setError("Could not look up IP.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return <div style={{ color: "var(--color-error)", fontFamily: "var(--font-mono)" }}>{error}</div>;
  }
  if (!data) {
    return <div style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}>Looking up your IP…</div>;
  }
  const location = [data.city, data.region, data.country].filter(Boolean).join(", ") || "unknown";
  return (
    <div style={{ fontFamily: "var(--font-mono)", whiteSpace: "pre-wrap" }}>
      <div style={{ color: "var(--color-text)" }}>🌐 Your connection:</div>
      <div>
        <span style={{ color: "var(--color-muted)" }}>   IP:       </span>
        <span style={{ color: "var(--color-accent)" }}>{data.ip ?? "—"}</span>
      </div>
      <div>
        <span style={{ color: "var(--color-muted)" }}>   Location: </span>
        <span style={{ color: "var(--color-text)" }}>{location}</span>
      </div>
    </div>
  );
}
