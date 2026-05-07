import type { ReactNode } from "react";
import { createElement } from "react";
import { OutputAbout } from "@/components/commands/output-about";
import { OutputAscii } from "@/components/commands/output-ascii";
import { OutputContact } from "@/components/commands/output-contact";
import { OutputDate } from "@/components/commands/output-date";
import { OutputExperience } from "@/components/commands/output-experience";
import { OutputHash } from "@/components/commands/output-hash";
import { OutputHelp } from "@/components/commands/output-help";
import { OutputHistory } from "@/components/commands/output-history";
import { OutputIp } from "@/components/commands/output-ip";
import { OutputProjects } from "@/components/commands/output-projects";
import { OutputRps } from "@/components/commands/output-rps";
import { OutputSkills } from "@/components/commands/output-skills";
import { OutputStock } from "@/components/commands/output-stock";
import { OutputSudoHire } from "@/components/commands/output-sudo-hire";
import { OutputTheme } from "@/components/commands/output-theme";
import { OutputTimer } from "@/components/commands/output-timer";
import { OutputUptime } from "@/components/commands/output-uptime";
import { OutputWeather } from "@/components/commands/output-weather";
import { OutputWhoami } from "@/components/commands/output-whoami";
import { play, type Move } from "./rps-score";

export type CommandCategory = "navigation" | "fun" | "utility";

export interface Command {
  name: string;
  aliases?: string[];
  description: string;
  usage: string;
  category: CommandCategory;
  handler: (args: string[]) => ReactNode;
}

function muted(text: string): ReactNode {
  return createElement(
    "span",
    { style: { color: "var(--color-muted)" } },
    text
  );
}

function hashHandler(args: string[]): ReactNode {
  const text = args.join(" ").trim();
  if (!text) return muted("Usage: hash [text]");
  return createElement(OutputHash, { text });
}

function rpsHandler(args: string[]): ReactNode {
  const move = args[0]?.toLowerCase();
  if (move !== "rock" && move !== "paper" && move !== "scissors") {
    return muted("Usage: rps [rock|paper|scissors]");
  }
  const round = play(move as Move);
  return createElement(OutputRps, round);
}

function asciiHandler(args: string[]): ReactNode {
  const text = args.join(" ").trim();
  if (!text) return muted("Usage: ascii [text]");
  return createElement(OutputAscii, { text });
}

function unameHandler(args: string[]): ReactNode {
  if (args[0] === "-a") {
    return createElement(
      "span",
      { style: { color: "var(--color-text)" } },
      "Linux aryan 6.x portfolio-terminal #1 Next.js"
    );
  }
  return createElement(
    "span",
    { style: { color: "var(--color-text)" } },
    "Linux"
  );
}

function echoHandler(args: string[]): ReactNode {
  return createElement(
    "span",
    { style: { color: "var(--color-text)" } },
    args.join(" ")
  );
}

function timerHandler(args: string[]): ReactNode {
  const arg = args[0];
  if (!arg) return muted("Usage: timer <seconds>");
  const seconds = Number.parseInt(arg, 10);
  if (!Number.isFinite(seconds) || seconds <= 0 || seconds > 3600) {
    return muted("Usage: timer <seconds>  (1–3600)");
  }
  return createElement(OutputTimer, { seconds });
}

function stockHandler(args: string[]): ReactNode {
  const symbol = args[0]?.trim();
  if (!symbol) return muted("Usage: stock <symbol>");
  if (!/^[A-Za-z0-9.\-^]{1,10}$/.test(symbol)) {
    return muted("Invalid symbol.");
  }
  return createElement(OutputStock, { symbol: symbol.toUpperCase() });
}

function themeHandler(args: string[]): ReactNode {
  const color = args[0]?.toLowerCase();
  if (color !== "green" && color !== "amber") {
    return muted("Available themes: green, amber");
  }
  return createElement(OutputTheme, { color });
}

export const commands: Command[] = [
  {
    name: "help",
    aliases: ["?", "ls"],
    description: "Show this help menu",
    usage: "help",
    category: "navigation",
    handler: () => createElement(OutputHelp),
  },
  {
    name: "cd about",
    aliases: ["about"],
    description: "About me & education",
    usage: "cd about",
    category: "navigation",
    handler: () => createElement(OutputAbout),
  },
  {
    name: "cd experience",
    aliases: ["experience"],
    description: "Work experience",
    usage: "cd experience",
    category: "navigation",
    handler: () => createElement(OutputExperience),
  },
  {
    name: "cd projects",
    aliases: ["projects"],
    description: "Projects",
    usage: "cd projects",
    category: "navigation",
    handler: () => createElement(OutputProjects),
  },
  {
    name: "cd skills",
    aliases: ["skills"],
    description: "Skills tree",
    usage: "cd skills",
    category: "navigation",
    handler: () => createElement(OutputSkills),
  },
  {
    name: "cd contact",
    aliases: ["contact"],
    description: "Contact & links",
    usage: "cd contact",
    category: "navigation",
    handler: () => createElement(OutputContact),
  },
  {
    name: "resume",
    description: "Open resume PDF in a new tab",
    usage: "resume",
    category: "navigation",
    handler: () =>
      createElement(
        "span",
        { style: { color: "var(--color-muted)" } },
        "Opening resume..."
      ),
  },
  {
    name: "clear",
    description: "Clear terminal",
    usage: "clear",
    category: "utility",
    handler: () => null,
  },
  {
    name: "refresh",
    description: "Reload page",
    usage: "refresh",
    category: "utility",
    handler: () => muted("Reloading…"),
  },
  {
    name: "whoami",
    description: "Who am I?",
    usage: "whoami",
    category: "fun",
    handler: () => createElement(OutputWhoami),
  },
  {
    name: "hash",
    description: "SHA-256 + MD5 of text",
    usage: "hash [text]",
    category: "utility",
    handler: hashHandler,
  },
  {
    name: "ip",
    description: "Your IP + location",
    usage: "ip",
    category: "fun",
    handler: () => createElement(OutputIp),
  },
  {
    name: "weather",
    description: "Current weather at your location",
    usage: "weather",
    category: "fun",
    handler: () => createElement(OutputWeather),
  },
  {
    name: "rps",
    description: "Rock paper scissors",
    usage: "rps [rock|paper|scissors]",
    category: "fun",
    handler: rpsHandler,
  },
  {
    name: "ascii",
    description: "ASCII block art",
    usage: "ascii [text]",
    category: "fun",
    handler: asciiHandler,
  },
  {
    name: "theme",
    description: "Switch accent color",
    usage: "theme [green|amber]",
    category: "utility",
    handler: themeHandler,
  },
  {
    name: "uptime",
    description: "Time since page load",
    usage: "uptime",
    category: "utility",
    handler: () => createElement(OutputUptime),
  },
  {
    name: "history",
    description: "Commands run this session",
    usage: "history",
    category: "utility",
    handler: () => createElement(OutputHistory),
  },
  {
    name: "sudo hire aryan",
    description: "Try it and see",
    usage: "sudo hire aryan",
    category: "fun",
    handler: () => createElement(OutputSudoHire),
  },
  {
    name: "man",
    description: "Show manual for command",
    usage: "man <command>",
    category: "utility",
    handler: (args) => manHandler(args),
  },
  {
    name: "uname",
    description: "Print system information",
    usage: "uname [-a]",
    category: "utility",
    handler: unameHandler,
  },
  {
    name: "date",
    description: "Print the current date and time",
    usage: "date",
    category: "utility",
    handler: () => createElement(OutputDate),
  },
  {
    name: "echo",
    description: "Print the given text",
    usage: "echo <text>",
    category: "utility",
    handler: echoHandler,
  },
  {
    name: "timer",
    description: "Start a countdown timer",
    usage: "timer <seconds>",
    category: "utility",
    handler: timerHandler,
  },
  {
    name: "stock",
    description: "Get stock price for a global ticker (e.g., AAPL, TSLA)",
    usage: "stock <symbol>",
    category: "utility",
    handler: stockHandler,
  },
];

function manHandler(args: string[]): ReactNode {
  const topic = args.join(" ").trim().toLowerCase();
  if (!topic) {
    return createElement(
      "span",
      { style: { color: "var(--color-muted)" } },
      "What manual page do you want? Try: man <command>"
    );
  }
  const target =
    commands.find((c) => getCommandTopic(c).toLowerCase() === topic) ??
    commandLookup.get(topic);
  if (!target) {
    return createElement(
      "span",
      { style: { color: "var(--color-error)" } },
      `No manual entry for ${topic}`
    );
  }
  const topicName = getCommandTopic(target);
  const argTail = target.usage.startsWith(target.name)
    ? target.usage.slice(target.name.length)
    : "";
  const head = `${topicName}${argTail}`;
  const desc = target.description.replace(/\.+$/, "");
  return createElement(
    "div",
    { style: { fontFamily: "var(--font-mono)", color: "#d1d5db" } },
    `${head} — ${desc}.`
  );
}

const commandLookup = new Map<string, Command>();
for (const cmd of commands) {
  commandLookup.set(cmd.name, cmd);
  for (const alias of cmd.aliases ?? []) {
    commandLookup.set(alias, cmd);
  }
}

export function findCommand(input: string): { command: Command; args: string[] } | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const exact = commandLookup.get(trimmed);
  if (exact) return { command: exact, args: [] };

  const parts = trimmed.split(/\s+/);
  for (let i = parts.length; i > 0; i--) {
    const candidate = parts.slice(0, i).join(" ");
    const match = commandLookup.get(candidate);
    if (match) {
      return { command: match, args: parts.slice(i) };
    }
  }

  return null;
}

export function getCommandTopic(cmd: Command): string {
  if (!cmd.name.includes(" ")) return cmd.name;
  return cmd.aliases?.find((a) => !a.includes(" ")) ?? cmd.name;
}

export interface ManTopic {
  topic: string;
  usage: string;
  description: string;
}

export function getManTopics(query: string, limit = 10): ManTopic[] {
  const q = query.trim().toLowerCase();
  const seen = new Set<string>();
  const results: ManTopic[] = [];
  for (const cmd of commands) {
    if (cmd.name === "man") continue;
    const topic = getCommandTopic(cmd);
    if (seen.has(topic)) continue;
    if (q && !topic.toLowerCase().startsWith(q)) continue;
    seen.add(topic);
    const argTail = cmd.usage.startsWith(cmd.name)
      ? cmd.usage.slice(cmd.name.length)
      : "";
    results.push({
      topic,
      usage: `${topic}${argTail}`,
      description: `Show manual for ${topic}`,
    });
    if (results.length >= limit) break;
  }
  return results;
}

export function getAutocompleteSuggestions(input: string, limit = 6): Command[] {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return [];

  const seen = new Set<string>();
  const matches: Command[] = [];

  for (const cmd of commands) {
    const candidates = [cmd.name, ...(cmd.aliases ?? [])];
    for (const candidate of candidates) {
      if (candidate.toLowerCase().startsWith(trimmed) && !seen.has(cmd.name)) {
        matches.push(cmd);
        seen.add(cmd.name);
        break;
      }
    }
    if (matches.length >= limit) break;
  }

  return matches;
}
