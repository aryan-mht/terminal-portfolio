'use client';

import { useEffect, useState } from "react";
import { md5 } from "@/lib/md5";

interface Props {
  text: string;
}

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function OutputHash({ text }: Props) {
  const [sha, setSha] = useState<string | null>(null);
  const [md, setMd] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    sha256(text).then((s) => {
      if (!cancelled) setSha(s);
    });
    setMd(md5(text));
    return () => {
      cancelled = true;
    };
  }, [text]);

  return (
    <div style={{ fontFamily: "var(--font-mono)", whiteSpace: "pre-wrap" }}>
      <div style={{ marginBottom: "0.5rem", color: "var(--color-text)" }}>
        🔒 Hash output for &quot;{text}&quot;:
      </div>
      <div>
        <span style={{ color: "var(--color-muted)" }}>SHA-256: </span>
        <span style={{ color: "var(--color-accent)" }}>
          {sha ?? "computing..."}
        </span>
      </div>
      <div>
        <span style={{ color: "var(--color-muted)" }}>MD5:     </span>
        <span style={{ color: "var(--color-accent)" }}>{md ?? "computing..."}</span>
      </div>
    </div>
  );
}
