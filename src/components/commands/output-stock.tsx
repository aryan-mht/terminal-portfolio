'use client';

import { useEffect, useState } from "react";

interface StockData {
  symbol: string;
  name: string;
  exchange: string | null;
  currency: string | null;
  price: number;
  change: number | null;
  changePct: number | null;
  high: number | null;
  low: number | null;
  open: number | null;
  previousClose: number | null;
  updated: number | null;
}

interface Props {
  symbol: string;
}

function fmt(n: number | null, suffix = ""): string {
  if (n == null || Number.isNaN(n)) return "—";
  return `${n.toFixed(2)}${suffix}`;
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ whiteSpace: "pre" }}>
      <span
        style={{
          color: "var(--color-muted)",
          display: "inline-block",
          minWidth: "16ch",
        }}
      >
        {label}
      </span>
      <span style={{ color: "var(--color-text)" }}>{children}</span>
    </div>
  );
}

export function OutputStock({ symbol }: Props) {
  const [data, setData] = useState<StockData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/stock?symbol=${encodeURIComponent(symbol)}`)
      .then(async (r) => {
        if (r.status === 404) throw new Error(`No quote for ${symbol.toUpperCase()}`);
        if (!r.ok) throw new Error("lookup failed");
        return r.json() as Promise<StockData>;
      })
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message || "lookup failed");
      });
    return () => {
      cancelled = true;
    };
  }, [symbol]);

  if (error) {
    return <div style={{ color: "var(--color-error)", fontFamily: "var(--font-mono)" }}>{error}</div>;
  }
  if (!data) {
    return (
      <div style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}>
        Fetching {symbol.toUpperCase()}…
      </div>
    );
  }

  const cur = data.currency ? ` ${data.currency}` : "";
  const changeStr = data.change != null ? `${data.change >= 0 ? "+" : ""}${data.change.toFixed(2)}` : "—";
  const pctStr = data.changePct != null ? `${data.changePct >= 0 ? "+" : ""}${data.changePct.toFixed(2)}%` : "—";
  const changeColor =
    data.change == null
      ? "var(--color-text)"
      : data.change >= 0
        ? "var(--color-success)"
        : "var(--color-error)";
  const updated = data.updated ? new Date(data.updated).toLocaleString() : "—";

  return (
    <div style={{ fontFamily: "var(--font-mono)" }}>
      <Row label="Name">{data.name}</Row>
      <Row label="Ticker">{data.symbol}</Row>
      <Row label="Exchange">{data.exchange ?? "—"}</Row>
      <Row label="Price">
        {fmt(data.price)}
        {cur}
      </Row>
      <div style={{ whiteSpace: "pre" }}>
        <span
          style={{
            color: "var(--color-muted)",
            display: "inline-block",
            minWidth: "16ch",
          }}
        >
          Change
        </span>
        <span style={{ color: changeColor }}>
          {changeStr} ({pctStr})
        </span>
      </div>
      <Row label="Open">{fmt(data.open)}</Row>
      <Row label="High">{fmt(data.high)}</Row>
      <Row label="Low">{fmt(data.low)}</Row>
      <Row label="Previous Close">{fmt(data.previousClose)}</Row>
      <Row label="Updated">{updated}</Row>
    </div>
  );
}
