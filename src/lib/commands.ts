import type { ReactNode } from "react";
import { createElement } from "react";
import { OutputAbout } from "@/components/commands/output-about";
import { OutputContact } from "@/components/commands/output-contact";
import { OutputExperience } from "@/components/commands/output-experience";
import { OutputHelp } from "@/components/commands/output-help";
import { OutputProjects } from "@/components/commands/output-projects";
import { OutputSkills } from "@/components/commands/output-skills";

export type CommandCategory = "navigation" | "fun" | "utility";

export interface Command {
  name: string;
  aliases?: string[];
  description: string;
  usage: string;
  category: CommandCategory;
  handler: (args: string[]) => ReactNode;
}

const placeholder = (): ReactNode =>
  createElement("span", null, "Command output coming in Phase 6");

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
    handler: placeholder,
  },
  {
    name: "refresh",
    description: "Reload page",
    usage: "refresh",
    category: "utility",
    handler: placeholder,
  },
  {
    name: "whoami",
    description: "Who am I?",
    usage: "whoami",
    category: "fun",
    handler: placeholder,
  },
  {
    name: "neofetch",
    description: "System info card",
    usage: "neofetch",
    category: "fun",
    handler: placeholder,
  },
  {
    name: "hash",
    description: "SHA-256 + MD5 of text",
    usage: "hash [text]",
    category: "utility",
    handler: placeholder,
  },
  {
    name: "ip",
    description: "Your IP + location",
    usage: "ip",
    category: "fun",
    handler: placeholder,
  },
  {
    name: "weather",
    description: "Current weather at your location",
    usage: "weather",
    category: "fun",
    handler: placeholder,
  },
  {
    name: "rps",
    description: "Rock paper scissors",
    usage: "rps [rock|paper|scissors]",
    category: "fun",
    handler: placeholder,
  },
  {
    name: "ascii",
    description: "ASCII block art",
    usage: "ascii [text]",
    category: "fun",
    handler: placeholder,
  },
  {
    name: "matrix",
    description: "Matrix rain (10s)",
    usage: "matrix",
    category: "fun",
    handler: placeholder,
  },
  {
    name: "theme",
    description: "Switch accent color",
    usage: "theme [green|amber]",
    category: "utility",
    handler: placeholder,
  },
  {
    name: "uptime",
    description: "Time since page load",
    usage: "uptime",
    category: "utility",
    handler: placeholder,
  },
  {
    name: "history",
    description: "Commands run this session",
    usage: "history",
    category: "utility",
    handler: placeholder,
  },
  {
    name: "sudo hire aryan",
    description: "Try it and see",
    usage: "sudo hire aryan",
    category: "fun",
    handler: placeholder,
  },
  {
    name: "man",
    description: "Show usage for a command",
    usage: "man [command]",
    category: "utility",
    handler: placeholder,
  },
];

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
