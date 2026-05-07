import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface YahooMeta {
  symbol?: string;
  longName?: string;
  shortName?: string;
  fullExchangeName?: string;
  exchangeName?: string;
  regularMarketPrice?: number;
  chartPreviousClose?: number;
  previousClose?: number;
  regularMarketDayHigh?: number;
  regularMarketDayLow?: number;
  regularMarketOpen?: number;
  regularMarketTime?: number;
  currency?: string;
}

interface YahooChartResponse {
  chart?: {
    result?: Array<{ meta?: YahooMeta }>;
    error?: { description?: string } | null;
  };
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const symbol = url.searchParams.get("symbol")?.trim().toUpperCase();
  if (!symbol) {
    return NextResponse.json({ error: "missing symbol" }, { status: 400 });
  }
  try {
    const res = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; aryan.me-portfolio/1.0)",
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );
    if (!res.ok) {
      return NextResponse.json({ error: "lookup failed" }, { status: 502 });
    }
    const body = (await res.json()) as YahooChartResponse;
    const meta = body.chart?.result?.[0]?.meta;
    if (!meta || meta.regularMarketPrice == null) {
      return NextResponse.json({ error: "symbol not found" }, { status: 404 });
    }
    const prev = meta.chartPreviousClose ?? meta.previousClose ?? null;
    const price = meta.regularMarketPrice;
    const change = prev != null ? price - prev : null;
    const changePct = prev != null && prev !== 0 ? ((price - prev) / prev) * 100 : null;
    return NextResponse.json({
      symbol: meta.symbol ?? symbol,
      name: meta.longName ?? meta.shortName ?? symbol,
      exchange: meta.fullExchangeName ?? meta.exchangeName ?? null,
      currency: meta.currency ?? null,
      price,
      change,
      changePct,
      high: meta.regularMarketDayHigh ?? null,
      low: meta.regularMarketDayLow ?? null,
      open: meta.regularMarketOpen ?? null,
      previousClose: prev,
      updated: meta.regularMarketTime ? meta.regularMarketTime * 1000 : null,
    });
  } catch {
    return NextResponse.json({ error: "lookup failed" }, { status: 502 });
  }
}
