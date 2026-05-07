'use client';

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const CHARS = "アァカサタナハマヤラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨロヲゴゾドボポ0123456789";

export function OutputMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const fontSize = 16;
    const accent =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--color-accent")
        .trim() || "#00ff9f";
    let columns = Math.floor(canvas.width / fontSize);
    let drops = new Array(columns).fill(1);

    const dismiss = () => setActive(false);
    const onResize = () => {
      setSize();
      columns = Math.floor(canvas.width / fontSize);
      drops = new Array(columns).fill(1);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", dismiss);
    window.addEventListener("mousedown", dismiss);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = accent;
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillText(ch ?? "0", i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 1;
      }
    };
    const interval = window.setInterval(draw, 40);
    const timeout = window.setTimeout(dismiss, 10_000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("mousedown", dismiss);
    };
  }, [active]);

  if (!mounted) {
    return <span style={{ color: "var(--color-muted)" }}>Entering the matrix…</span>;
  }
  if (!active) {
    return <span style={{ color: "var(--color-muted)" }}>...the matrix has you.</span>;
  }
  return (
    <>
      <span style={{ color: "var(--color-muted)" }}>...the matrix has you.</span>
      {createPortal(
        <canvas
          ref={canvasRef}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#000",
          }}
          aria-hidden="true"
        />,
        document.body
      )}
    </>
  );
}
