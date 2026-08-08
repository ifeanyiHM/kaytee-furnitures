"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { LuMessageCircleMore } from "react-icons/lu";
import { GoDash } from "react-icons/go";
import { IoClose } from "react-icons/io5";

interface Message {
  role: "user" | "assistant";
  content: string;
  provider?: string;
  files?: AttachedFile[];
  isEmailPrompt?: boolean; // marks the "send to team?" message
}

interface AttachedFile {
  name: string;
  type: string;
  base64: string;
  preview?: string;
}

// Gmail-compose-style window states:
// closed  -> only the floating action button is visible (the "default/minimized" layout)
// open    -> chat panel visible (see isMaximized for its size/position)
// docked  -> taken out via the dash, collapsed to a small bar at the bottom — conversation preserved
type WidgetState = "closed" | "open" | "docked";

const SYSTEM_PROMPT = `You are an interior design consultant for Kaytee Furnitures.
Your only job is to help clients articulate their design vision through conversation, 
then generate a structured mood board brief.

Only discuss topics related to interior design, furniture, home décor, colour, 
materials, lighting, and space planning.

When you have gathered enough information and the client seems satisfied, generate a 
structured brief with these exact sections:
## Project Overview
## Style Direction
## Colour Palette
## Materials & Textures
## Key Furniture Pieces
## Lighting Mood
## What To Avoid

After generating the brief, end your message with exactly this line on its own:
[BRIEF_COMPLETE]

If a user explicitly asks for output in PDF or DOCX format, generate the brief and 
end with [EXPORT_PDF] or [EXPORT_DOCX] accordingly.

If a user asks about anything outside interior design and furniture, politely decline 
and steer them back to their design project.`;

function detectExportTrigger(content: string): "pdf" | "docx" | "email" | null {
  if (content.includes("[EXPORT_PDF]")) return "pdf";
  if (content.includes("[EXPORT_DOCX]")) return "docx";
  if (content.includes("[BRIEF_COMPLETE]")) return "email";
  return null;
}

function stripTriggers(content: string): string {
  return content
    .replace(/\[EXPORT_PDF\]/g, "")
    .replace(/\[EXPORT_DOCX\]/g, "")
    .replace(/\[BRIEF_COMPLETE\]/g, "")
    .trim();
}

function fileIcon(type: string) {
  if (type.startsWith("image/")) return "🖼";
  if (type === "application/pdf") return "📄";
  if (type.includes("word")) return "📝";
  if (type.includes("sheet") || type.includes("csv")) return "📊";
  if (type.includes("presentation")) return "📑";
  return "📎";
}

// Renders the Kaytee logo if the asset exists at /kaytee-logo.png,
// falling back to the "K" monogram badge if it fails to load.
// Replace the src below with your actual logo path (svg or png).
function Brandmark({ size = 32 }: { size?: number }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className="flex shrink-0 items-center justify-center rounded-full border border-brand-400/40 bg-charcoal-light"
        style={{ width: size, height: size }}
      >
        <span
          className="font-hero text-brand-300"
          style={{ fontSize: size * 0.5 }}
        >
          K
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/kaytee-logo.png"
      alt="Kaytee Furnitures"
      onError={() => setErrored(true)}
      className="shrink-0 rounded-full object-contain"
      style={{ width: size, height: size }}
    />
  );
}

// Shown when the panel is at its normal size — clicking expands it.
function ExpandIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <rect
        x="3"
        y="3"
        width="10"
        height="10"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

// Shown when the panel is expanded — clicking restores it to normal size.
function RestoreIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <rect
        x="2.5"
        y="4.5"
        width="8"
        height="8"
        rx="1.3"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M5.5 4.5V3a1 1 0 0 1 1-1H13a1 1 0 0 1 1 1v6.5a1 1 0 0 1-1 1H12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function KayteeChatWidget() {
  const [widgetState, setWidgetState] = useState<WidgetState>("closed");
  const [isMaximized, setIsMaximized] = useState(false);
  const [hasEverOpened, setHasEverOpened] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [servedBy, setServedBy] = useState<string | null>(null);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [exportLoading, setExportLoading] = useState<"pdf" | "docx" | null>(
    null,
  );
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [contactStep, setContactStep] = useState<
    "idle" | "name" | "email" | "phone" | "done"
  >("idle");
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [contactInput, setContactInput] = useState("");
  const latestBriefRef = useRef<string>("");

  const bottomRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (widgetState === "open") {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, widgetState]);

  useEffect(() => {
    if (!loading && widgetState === "open") {
      textareaRef.current?.focus();
    }
  }, [loading, widgetState]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
  }, [input]);

  // ── Window controls (Gmail-compose style) ──────────────────────────
  function openPanel() {
    setHasEverOpened(true);
    setWidgetState("open");
    setTimeout(() => textareaRef.current?.focus(), 180);
  }

  // Square icon: toggles between the normal bottom-right panel and a
  // larger, centered "focus mode" view. Conversation is untouched either way.
  function toggleMaximize() {
    setIsMaximized((prev) => !prev);
  }

  // Dash icon: takes the chat out to a small docked bar, conversation preserved.
  function dockPanel() {
    setIsMaximized(false);
    setWidgetState("docked");
  }

  // Square icon on the docked bar (or clicking the bar itself): restore to the open panel.
  function restorePanel() {
    setWidgetState("open");
    setTimeout(() => textareaRef.current?.focus(), 180);
  }

  // X icon: fully clears the conversation. Next open starts fresh.
  function clearAndClose() {
    setMessages([]);
    setInput("");
    setAttachedFiles([]);
    setServedBy(null);
    setEmailSent(false);
    setEmailLoading(false);
    setContactStep("idle");
    setContactInfo({ name: "", email: "", phone: "" });
    setContactInput("");
    latestBriefRef.current = "";
    setHasEverOpened(false);
    setIsMaximized(false);
    setWidgetState("closed");
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && widgetState === "open") {
        if (isMaximized) setIsMaximized(false);
        else dockPanel();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [widgetState, isMaximized]);

  async function readFile(file: File): Promise<AttachedFile> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(",")[1];
        resolve({
          name: file.name,
          type: file.type,
          base64,
          preview: file.type.startsWith("image/")
            ? (reader.result as string)
            : undefined,
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    const read = await Promise.all(files.map(readFile));
    setAttachedFiles((prev) => [...prev, ...read]);
    e.target.value = "";
  }

  function removeFile(index: number) {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function buildApiMessages(history: Message[]) {
    return history
      .filter((m) => !m.isEmailPrompt)
      .map((m) => {
        if (m.role === "user" && m.files?.length) {
          return {
            role: "user",
            content: [
              ...m.files.map((f) => ({
                type: f.type.startsWith("image/") ? "image_url" : "text",
                ...(f.type.startsWith("image/")
                  ? { image_url: { url: `data:${f.type};base64,${f.base64}` } }
                  : { text: `[Attached file: ${f.name}]` }),
              })),
              {
                type: "text",
                text: m.content || "Please review the attached file(s).",
              },
            ],
          };
        }
        return { role: m.role, content: m.content };
      });
  }

  async function exportBrief(format: "pdf" | "docx", content: string) {
    setExportLoading(format);
    try {
      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Kaytee Furnitures — Mood Board Brief",
          content,
          format,
        }),
      });
      if (!res.ok) {
        alert(`Export failed: ${await res.text()}`);
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `kaytee-brief.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setExportLoading(null);
    }
  }

  function startContactCollection() {
    setContactStep("name");
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          "Wonderful. Before I pass this to the team, may I take a few details? What's your name?",
        isEmailPrompt: false,
      },
    ]);
  }

  function handleContactSubmit() {
    const value = contactInput.trim();
    if (!value) return;
    setContactInput("");

    if (contactStep === "name") {
      setContactInfo((prev) => ({ ...prev, name: value }));
      setContactStep("email");
      setMessages((prev) => [
        ...prev,
        { role: "user", content: value },
        {
          role: "assistant",
          content: `A pleasure, ${value}. What's your email address?`,
        },
      ]);
    } else if (contactStep === "email") {
      setContactInfo((prev) => ({ ...prev, email: value }));
      setContactStep("phone");
      setMessages((prev) => [
        ...prev,
        { role: "user", content: value },
        {
          role: "assistant",
          content: "And lastly, the best number to reach you on?",
        },
      ]);
    } else if (contactStep === "phone") {
      const finalContact = { ...contactInfo, phone: value };
      setContactInfo(finalContact);
      setContactStep("done");
      setMessages((prev) => [
        ...prev,
        { role: "user", content: value },
        {
          role: "assistant",
          content: "Sending your brief to the Kaytee design team now…",
        },
      ]);
      sendEmail(finalContact);
    }
  }

  async function sendEmail(contact: {
    name: string;
    email: string;
    phone: string;
  }) {
    setEmailLoading(true);
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief: latestBriefRef.current, contact }),
      });
      if (!res.ok) {
        const err = await res.text();
        alert(`Failed to send email: ${err}`);
        return;
      }
      setEmailSent(true);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `All set, ${contact.name}. Your brief is with the Kaytee team, and a confirmation is on its way to ${contact.email}. Expect to hear from us within 24 hours.`,
        },
      ]);
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setEmailLoading(false);
    }
  }

  async function send() {
    const text = input.trim();
    if ((!text && !attachedFiles.length) || loading) return;

    const userMsg: Message = {
      role: "user",
      content: text,
      files: attachedFiles.length ? [...attachedFiles] : undefined,
    };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setAttachedFiles([]);
    setLoading(true);
    setServedBy(null);

    setMessages([...history, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...buildApiMessages(history),
          ],
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = {
            role: "assistant",
            content: `Error: ${err}`,
          };
          return next;
        });
        return;
      }

      const provider = res.headers.get("X-AI-Provider") ?? "unknown";
      setServedBy(provider);

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        const snap = full;
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = {
            role: "assistant",
            content: stripTriggers(snap),
            provider,
          };
          return next;
        });
      }

      const trigger = detectExportTrigger(full);
      const cleanContent = stripTriggers(full);

      if (trigger === "pdf" || trigger === "docx") {
        await exportBrief(trigger, cleanContent);
      } else if (trigger === "email") {
        latestBriefRef.current = cleanContent;
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Would you like me to send this brief to the Kaytee team so they can follow up, or is there anything you'd like to refine first?",
            isEmailPrompt: true,
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "assistant",
          content: `Network error: ${(err as Error).message}`,
        };
        return next;
      });
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  const hasConversation = messages.length > 0;
  const showPulse = widgetState === "closed" && !hasEverOpened;

  // Positioning classes for the panel: mobile is always full-screen.
  // On desktop, "normal" is the default minimized-size panel anchored bottom-right;
  // "maximized" is a larger, centered focus view. Each string is fully self-contained
  // (no shared/base sm: utilities) so the two states never fight over the same breakpoint.
  const panelSizeClasses = isMaximized
    ? "inset-0 h-[100dvh] w-full rounded-none sm:inset-0 sm:m-auto sm:h-[82vh] sm:max-h-[760px] sm:w-[880px] sm:max-w-[92vw] sm:rounded-[16px]"
    : "inset-0 h-[100dvh] w-full rounded-none sm:inset-auto sm:bottom-7 sm:right-7 sm:h-[640px] sm:max-h-[calc(100vh-3.5rem)] sm:w-[400px] sm:rounded-[10px]";

  return (
    <>
      <style>{`
        @keyframes kaytee-pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(160, 120, 72, 0.45); }
          100% { box-shadow: 0 0 0 16px rgba(160, 120, 72, 0); }
        }
        .kaytee-pulse::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          animation: kaytee-pulse-ring 2.4s ease-out infinite;
        }
      `}</style>

      {/* Floating Action Button — closed state */}
      {/* {widgetState === "closed" && (
        <button
          onClick={openPanel}
          aria-label="Chat with the Kaytee design concierge"
          className={`${showPulse ? "kaytee-pulse" : ""} animate-fade-in fixed bottom-7 right-7 z-9998 flex h-15 w-15 items-center justify-center overflow-hidden rounded-full bg-charcoal shadow-[0_14px_30px_-6px_rgba(17,17,17,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-6px_rgba(17,17,17,0.55)]`}
        >
          <Brandmark size={60} />
        </button>
      )} */}
      {widgetState === "closed" && (
        <button
          onClick={openPanel}
          aria-label="Chat with the Kaytee design concierge"
          className={`${showPulse ? "kaytee-pulse" : ""} animate-fade-in fixed bottom-7 right-7 z-9998 flex h-15 w-15 items-center justify-center rounded-full bg-charcoal text-brand-200 shadow-[0_14px_30px_-6px_rgba(17,17,17,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:text-sand-50 hover:shadow-[0_18px_36px_-6px_rgba(17,17,17,0.55)]`}
        >
          <LuMessageCircleMore size={24} />
        </button>
      )}

      {/* Docked bar — taken out via the dash, conversation preserved */}
      {widgetState === "docked" && (
        <button
          onClick={restorePanel}
          className="animate-fade-in fixed bottom-0 right-7 z-9999 flex w-65 items-center justify-between gap-2 rounded-t-xl border border-b-0 border-brand-200/30 bg-charcoal px-3.5 py-3 shadow-[0_-8px_24px_-8px_rgba(17,17,17,0.35)] transition-colors hover:bg-charcoal-light"
        >
          <Image
            src="/images/logo.png"
            alt="Kaytee Furnitures"
            width={317}
            height={121}
            priority
            className="h-6 w-auto transition-all duration-500"
          />
          <span className="flex shrink-0 items-center gap-0.5">
            <span
              role="button"
              aria-label="Expand chat"
              onClick={(e) => {
                e.stopPropagation();
                restorePanel();
              }}
              className="flex h-6 w-6 items-center justify-center rounded-full text-sand-200/70 transition-colors hover:bg-white/10 hover:text-sand-50"
            >
              <ExpandIcon />
            </span>
            <span
              role="button"
              aria-label="Close chat"
              onClick={(e) => {
                e.stopPropagation();
                clearAndClose();
              }}
              className="flex h-6 w-6 items-center justify-center rounded-full text-sand-200/70 transition-colors hover:bg-white/10 hover:text-sand-50"
            >
              <IoClose />
            </span>
          </span>
        </button>
      )}

      {/* Backdrop — only shown behind the expanded/centered panel on desktop */}
      {widgetState === "open" && isMaximized && (
        <div
          onClick={toggleMaximize}
          className="animate-fade-in fixed inset-0 z-9998 hidden bg-charcoal/45 backdrop-blur-[2px] sm:block"
        />
      )}

      {/* Chat Panel — open state (normal or expanded, per panelSizeClasses) */}
      {widgetState === "open" && (
        <div
          className={`animate-fade-up fixed z-9999 flex flex-col overflow-hidden bg-sand-50 shadow-[0_0px_5px_0px_rgba(17,17,17,0.35)] ${panelSizeClasses}`}
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between bg-charcoal px-5 py-2">
            <div className="flex items-center gap-3">
              {/* <Brandmark size={40} /> */}
              <Image
                src="/images/logo.png"
                alt="Kaytee Furnitures"
                width={317}
                height={121}
                priority
                className="h-6 w-auto transition-all duration-500"
              />

              <div className="mt-0.5 flex items-center gap-1.5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-brand-300/90">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${servedBy ? "bg-emerald-400" : "bg-brand-400"}`}
                />
                Design Concierge
              </div>
            </div>

            {/* Gmail-style window controls: dash / expand-toggle / close */}
            <div className="flex shrink-0 items-center gap-0.5">
              <button
                onClick={dockPanel}
                aria-label="Take out"
                title="Take out"
                className="flex h-8 w-8 items-center justify-center rounded-full text-sand-200/70 transition-colors hover:bg-white/10 hover:text-sand-50"
              >
                <GoDash />
              </button>
              <button
                onClick={toggleMaximize}
                aria-label={isMaximized ? "Restore size" : "Expand"}
                title={isMaximized ? "Restore size" : "Expand"}
                className="flex h-8 w-8 items-center justify-center rounded-full text-sand-200/70 transition-colors hover:bg-white/10 hover:text-sand-50"
              >
                {isMaximized ? <RestoreIcon /> : <ExpandIcon />}
              </button>
              <button
                onClick={clearAndClose}
                aria-label="Close and clear chat"
                title="Close and clear chat"
                className="flex h-8 w-8 items-center justify-center rounded-full text-sand-200/70 transition-colors hover:bg-white/10 hover:text-sand-50"
              >
                <IoClose />
              </button>
            </div>
          </div>
          <div className="h-px shrink-0 bg-linear-to-r from-brand-500/70 via-brand-300/40 to-transparent" />

          {/* Messages */}
          <main
            className={`flex-1 space-y-4 overflow-y-auto bg-sand-50 py-5 scrollbar-none [&::-webkit-scrollbar]:hidden ${
              isMaximized ? "px-6 sm:px-10" : "px-4"
            }`}
          >
            {!hasConversation && (
              <div
                className={`mx-auto py-4 text-center ${isMaximized ? "max-w-95" : "max-w-70"}`}
              >
                <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-brand-300/60 bg-sand-100">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 20v-5a2 2 0 0 1 2-2h1V9a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v4h1a2 2 0 0 1 2 2v5M4 20h16M6 20v-2M18 20v-2"
                      stroke="#a07848"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="font-display text-[21px] italic leading-snug text-charcoal">
                  Let&apos;s design your space
                </p>
                <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal-muted">
                  Tell me about the room you have in mind. Feel free to share
                  inspiration images or a floor plan along the way.
                </p>
                <div className="mt-5 flex flex-col gap-2">
                  {[
                    "I want to redesign my living room",
                    "Help me furnish a studio apartment",
                    "I need a home office that feels calm",
                  ].map((starter) => (
                    <button
                      key={starter}
                      onClick={() => setInput(starter)}
                      className="rounded-xl border border-brand-200 bg-white px-3.5 py-2.5 text-left text-[12.5px] text-charcoal transition-colors hover:border-brand-400 hover:bg-sand-100"
                    >
                      {starter}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={isMaximized ? "mx-auto max-w-160" : ""}>
                <div
                  className={`flex items-start gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "assistant" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-charcoal">
                      <Brandmark size={28} />
                    </div>
                  )}
                  <div
                    className={`relative max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-md bg-charcoal text-sand-50"
                        : "rounded-bl-md border border-brand-200/70 bg-white text-charcoal shadow-[0_1px_2px_rgba(17,17,17,0.04)]"
                    }`}
                  >
                    {m.files?.length && (
                      <div className="mb-2 flex flex-wrap gap-1.5">
                        {m.files.map((f, fi) => (
                          <div
                            key={fi}
                            className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] ${
                              m.role === "user" ? "bg-white/10" : "bg-sand-100"
                            }`}
                          >
                            {f.preview ? (
                              <img
                                src={f.preview}
                                alt={f.name}
                                className="h-4.5 w-4.5 rounded object-cover"
                              />
                            ) : (
                              <span className="text-[13px]">
                                {fileIcon(f.type)}
                              </span>
                            )}
                            <span
                              className={`max-w-22.5 overflow-hidden text-ellipsis whitespace-nowrap ${
                                m.role === "user"
                                  ? "text-sand-100"
                                  : "text-charcoal-muted"
                              }`}
                            >
                              {f.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    <pre className="whitespace-pre-wrap wrap-break-word font-sans text-[13px] leading-relaxed">
                      {m.content ||
                        (loading && i === messages.length - 1 ? "▌" : "")}
                    </pre>
                  </div>
                </div>

                {m.isEmailPrompt && contactStep === "idle" && !emailSent && (
                  <div className="ml-9 mt-2 flex flex-wrap gap-2">
                    <button
                      onClick={startContactCollection}
                      className="rounded-lg bg-charcoal px-3 py-1.5 text-[12px] font-medium text-brand-200 transition-colors hover:bg-charcoal-light"
                    >
                      Yes, send to the team
                    </button>
                    <button
                      onClick={() =>
                        setMessages((prev) => [
                          ...prev,
                          {
                            role: "assistant",
                            content: "No problem — the brief won't be sent.",
                          },
                        ])
                      }
                      className="rounded-lg border border-brand-200 bg-white px-3 py-1.5 text-[12px] text-charcoal-muted transition-colors hover:border-brand-300"
                    >
                      No thanks
                    </button>
                    <button
                      onClick={() =>
                        setMessages((prev) => [
                          ...prev,
                          {
                            role: "assistant",
                            content:
                              "Of course — what would you like to explore or adjust?",
                          },
                        ])
                      }
                      className="rounded-lg border border-brand-300/60 bg-brand-100/60 px-3 py-1.5 text-[12px] font-medium text-brand-700 transition-colors hover:bg-brand-100"
                    >
                      Continue chatting
                    </button>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div
                className={`flex items-start justify-start gap-2.5 ${isMaximized ? "mx-auto max-w-160" : ""}`}
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-charcoal">
                  <Brandmark size={28} />
                </div>
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-brand-200/70 bg-white px-4 py-3">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-300 [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-300 [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-300 [animation-delay:300ms]" />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </main>

          {/* Contact collection bar */}
          {(contactStep === "name" ||
            contactStep === "email" ||
            contactStep === "phone") && (
            <div
              className={`flex shrink-0 items-center gap-2.5 border-t border-brand-200 bg-sand-100 py-2.5 ${
                isMaximized ? "px-6 sm:px-10" : "px-4"
              }`}
            >
              <span className="shrink-0 text-[10.5px] font-semibold uppercase tracking-widest text-brand-600">
                {contactStep === "name" && "Name"}
                {contactStep === "email" && "Email"}
                {contactStep === "phone" && "Phone"}
              </span>
              <input
                autoFocus
                type={
                  contactStep === "email"
                    ? "email"
                    : contactStep === "phone"
                      ? "tel"
                      : "text"
                }
                placeholder={
                  contactStep === "name"
                    ? "e.g. Amaka Johnson"
                    : contactStep === "email"
                      ? "e.g. amaka@email.com"
                      : "e.g. +234 801 234 5678"
                }
                value={contactInput}
                onChange={(e) => setContactInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleContactSubmit()}
                disabled={emailLoading}
                className="flex-1 rounded-lg border border-brand-300/50 bg-white px-3 py-1.5 text-[13px] text-charcoal outline-none placeholder:text-charcoal-muted/60 focus:border-brand-400"
              />
              <button
                onClick={handleContactSubmit}
                disabled={!contactInput.trim() || emailLoading}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-charcoal text-brand-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {emailLoading ? (
                  <span className="h-3 w-3 animate-spin rounded-full border-[1.5px] border-brand-300 border-t-transparent" />
                ) : (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h9M8 3l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </div>
          )}

          {/* Attached files preview */}
          {attachedFiles.length > 0 && (
            <div
              className={`flex shrink-0 flex-wrap gap-1.5 border-t border-brand-200 bg-white py-2 ${
                isMaximized ? "px-6 sm:px-10" : "px-4"
              }`}
            >
              {attachedFiles.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 rounded-md border border-brand-200 bg-sand-50 px-2 py-1 text-[11px]"
                >
                  {f.preview ? (
                    <img
                      src={f.preview}
                      alt={f.name}
                      className="h-5 w-5 rounded object-cover"
                    />
                  ) : (
                    <span>{fileIcon(f.type)}</span>
                  )}
                  <span className="max-w-25 overflow-hidden text-ellipsis whitespace-nowrap text-charcoal">
                    {f.name}
                  </span>
                  <button
                    onClick={() => removeFile(i)}
                    className="text-charcoal-muted hover:text-charcoal"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Input footer */}
          <div
            className={`shrink-0 bg-sand-50 pb-2 pt-2.5 ${isMaximized ? "px-6 sm:px-10" : "px-3"}`}
          >
            <div
              className={`mx-auto flex items-center gap-1.5 rounded-full bg-charcoal px-2.5 py-1.5 ${isMaximized ? "max-w-160" : ""}`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
                accept="image/*,.pdf,.doc,.docx,.txt,.csv,.xlsx,.pptx"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                aria-label="Add files"
                className="group relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-brand-200/70 transition-colors hover:bg-white/10 hover:text-brand-100"
              >
                <span className="pointer-events-none absolute bottom-9 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-charcoal-light px-2 py-1 text-[11px] text-sand-100 opacity-0 shadow-lg transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100">
                  Add files
                </span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 3v10M3 8h10"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <textarea
                ref={textareaRef}
                placeholder="Ask anything about your space…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                rows={1}
                disabled={loading}
                style={{ outline: "none" }}
                className="max-h-25 flex-1 resize-none bg-transparent py-1.5 font-sans text-[13.5px] text-sand-50 placeholder:text-sand-200/40 scrollbar-none [&::-webkit-scrollbar]:hidden"
              />
              <button
                onClick={send}
                disabled={loading || (!input.trim() && !attachedFiles.length)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-400 text-charcoal transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
              >
                {loading ? (
                  <span className="h-3 w-3 animate-spin rounded-full border-[1.5px] border-charcoal border-t-transparent" />
                ) : (
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 13V3M3.5 7.5 8 3l4.5 4.5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-charcoal-muted/80">
              Kaytee's assistant can make mistakes. Please verify important
              details.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

// "use client";

// import { useState, useRef, useEffect } from "react";

// interface Message {
//   role: "user" | "assistant";
//   content: string;
//   provider?: string;
//   files?: AttachedFile[];
//   isEmailPrompt?: boolean; // marks the "send to team?" message
// }

// interface AttachedFile {
//   name: string;
//   type: string;
//   base64: string;
//   preview?: string;
// }

// const SYSTEM_PROMPT = `You are an interior design consultant for Kaytee Furnitures.
// Your only job is to help clients articulate their design vision through conversation,
// then generate a structured mood board brief.

// Only discuss topics related to interior design, furniture, home décor, colour,
// materials, lighting, and space planning.

// When you have gathered enough information and the client seems satisfied, generate a
// structured brief with these exact sections:
// ## Project Overview
// ## Style Direction
// ## Colour Palette
// ## Materials & Textures
// ## Key Furniture Pieces
// ## Lighting Mood
// ## What To Avoid

// After generating the brief, end your message with exactly this line on its own:
// [BRIEF_COMPLETE]

// If a user explicitly asks for output in PDF or DOCX format, generate the brief and
// end with [EXPORT_PDF] or [EXPORT_DOCX] accordingly.

// If a user asks about anything outside interior design and furniture, politely decline
// and steer them back to their design project.`;

// function detectExportTrigger(content: string): "pdf" | "docx" | "email" | null {
//   if (content.includes("[EXPORT_PDF]")) return "pdf";
//   if (content.includes("[EXPORT_DOCX]")) return "docx";
//   if (content.includes("[BRIEF_COMPLETE]")) return "email";
//   return null;
// }

// function stripTriggers(content: string): string {
//   return content
//     .replace(/\[EXPORT_PDF\]/g, "")
//     .replace(/\[EXPORT_DOCX\]/g, "")
//     .replace(/\[BRIEF_COMPLETE\]/g, "")
//     .trim();
// }

// function fileIcon(type: string) {
//   if (type.startsWith("image/")) return "🖼";
//   if (type === "application/pdf") return "📄";
//   if (type.includes("word")) return "📝";
//   if (type.includes("sheet") || type.includes("csv")) return "📊";
//   if (type.includes("presentation")) return "📑";
//   return "📎";
// }

// export default function KayteeChatWidget() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [hasEverOpened, setHasEverOpened] = useState(false);

//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [servedBy, setServedBy] = useState<string | null>(null);
//   const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
//   const [exportLoading, setExportLoading] = useState<"pdf" | "docx" | null>(
//     null,
//   );
//   const [emailLoading, setEmailLoading] = useState(false);
//   const [emailSent, setEmailSent] = useState(false);
//   const [contactStep, setContactStep] = useState<
//     "idle" | "name" | "email" | "phone" | "done"
//   >("idle");
//   const [contactInfo, setContactInfo] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });
//   const [contactInput, setContactInput] = useState("");
//   const latestBriefRef = useRef<string>("");

//   const bottomRef = useRef<HTMLDivElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isOpen]);

//   useEffect(() => {
//     if (!loading && isOpen) {
//       textareaRef.current?.focus();
//     }
//   }, [loading, isOpen]);

//   useEffect(() => {
//     const ta = textareaRef.current;
//     if (!ta) return;
//     ta.style.height = "auto";
//     ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
//   }, [input]);

//   function toggleOpen() {
//     setIsOpen((prev) => {
//       const next = !prev;
//       if (next) {
//         setHasEverOpened(true);
//         setTimeout(() => textareaRef.current?.focus(), 180);
//       }
//       return next;
//     });
//   }

//   useEffect(() => {
//     function onKeyDown(e: KeyboardEvent) {
//       if (e.key === "Escape" && isOpen) setIsOpen(false);
//     }
//     window.addEventListener("keydown", onKeyDown);
//     return () => window.removeEventListener("keydown", onKeyDown);
//   }, [isOpen]);

//   async function readFile(file: File): Promise<AttachedFile> {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const base64 = (reader.result as string).split(",")[1];
//         resolve({
//           name: file.name,
//           type: file.type,
//           base64,
//           preview: file.type.startsWith("image/")
//             ? (reader.result as string)
//             : undefined,
//         });
//       };
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });
//   }

//   async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
//     const files = Array.from(e.target.files ?? []);
//     if (!files.length) return;
//     const read = await Promise.all(files.map(readFile));
//     setAttachedFiles((prev) => [...prev, ...read]);
//     e.target.value = "";
//   }

//   function removeFile(index: number) {
//     setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
//   }

//   function buildApiMessages(history: Message[]) {
//     return history
//       .filter((m) => !m.isEmailPrompt)
//       .map((m) => {
//         if (m.role === "user" && m.files?.length) {
//           return {
//             role: "user",
//             content: [
//               ...m.files.map((f) => ({
//                 type: f.type.startsWith("image/") ? "image_url" : "text",
//                 ...(f.type.startsWith("image/")
//                   ? { image_url: { url: `data:${f.type};base64,${f.base64}` } }
//                   : { text: `[Attached file: ${f.name}]` }),
//               })),
//               {
//                 type: "text",
//                 text: m.content || "Please review the attached file(s).",
//               },
//             ],
//           };
//         }
//         return { role: m.role, content: m.content };
//       });
//   }

//   async function exportBrief(format: "pdf" | "docx", content: string) {
//     setExportLoading(format);
//     try {
//       const res = await fetch("/api/export", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: "Kaytee Furnitures — Mood Board Brief",
//           content,
//           format,
//         }),
//       });
//       if (!res.ok) {
//         alert(`Export failed: ${await res.text()}`);
//         return;
//       }
//       const blob = await res.blob();
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `kaytee-brief.${format}`;
//       a.click();
//       URL.revokeObjectURL(url);
//     } catch (err) {
//       alert((err as Error).message);
//     } finally {
//       setExportLoading(null);
//     }
//   }

//   function startContactCollection() {
//     setContactStep("name");
//     setMessages((prev) => [
//       ...prev,
//       {
//         role: "assistant",
//         content:
//           "Wonderful. Before I pass this to the team, may I take a few details? What's your name?",
//         isEmailPrompt: false,
//       },
//     ]);
//   }

//   function handleContactSubmit() {
//     const value = contactInput.trim();
//     if (!value) return;
//     setContactInput("");

//     if (contactStep === "name") {
//       setContactInfo((prev) => ({ ...prev, name: value }));
//       setContactStep("email");
//       setMessages((prev) => [
//         ...prev,
//         { role: "user", content: value },
//         {
//           role: "assistant",
//           content: `A pleasure, ${value}. What's your email address?`,
//         },
//       ]);
//     } else if (contactStep === "email") {
//       setContactInfo((prev) => ({ ...prev, email: value }));
//       setContactStep("phone");
//       setMessages((prev) => [
//         ...prev,
//         { role: "user", content: value },
//         {
//           role: "assistant",
//           content: "And lastly, the best number to reach you on?",
//         },
//       ]);
//     } else if (contactStep === "phone") {
//       const finalContact = { ...contactInfo, phone: value };
//       setContactInfo(finalContact);
//       setContactStep("done");
//       setMessages((prev) => [
//         ...prev,
//         { role: "user", content: value },
//         {
//           role: "assistant",
//           content: "Sending your brief to the Kaytee design team now…",
//         },
//       ]);
//       sendEmail(finalContact);
//     }
//   }

//   async function sendEmail(contact: {
//     name: string;
//     email: string;
//     phone: string;
//   }) {
//     setEmailLoading(true);
//     try {
//       const res = await fetch("/api/email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ brief: latestBriefRef.current, contact }),
//       });
//       if (!res.ok) {
//         const err = await res.text();
//         alert(`Failed to send email: ${err}`);
//         return;
//       }
//       setEmailSent(true);
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: `All set, ${contact.name}. Your brief is with the Kaytee team, and a confirmation is on its way to ${contact.email}. Expect to hear from us within 24 hours.`,
//         },
//       ]);
//     } catch (err) {
//       alert((err as Error).message);
//     } finally {
//       setEmailLoading(false);
//     }
//   }

//   async function send() {
//     const text = input.trim();
//     if ((!text && !attachedFiles.length) || loading) return;

//     const userMsg: Message = {
//       role: "user",
//       content: text,
//       files: attachedFiles.length ? [...attachedFiles] : undefined,
//     };
//     const history = [...messages, userMsg];
//     setMessages(history);
//     setInput("");
//     setAttachedFiles([]);
//     setLoading(true);
//     setServedBy(null);

//     setMessages([...history, { role: "assistant", content: "" }]);

//     try {
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           messages: [
//             { role: "system", content: SYSTEM_PROMPT },
//             ...buildApiMessages(history),
//           ],
//         }),
//       });

//       if (!res.ok) {
//         const err = await res.text();
//         setMessages((prev) => {
//           const next = [...prev];
//           next[next.length - 1] = {
//             role: "assistant",
//             content: `Error: ${err}`,
//           };
//           return next;
//         });
//         return;
//       }

//       const provider = res.headers.get("X-AI-Provider") ?? "unknown";
//       setServedBy(provider);

//       const reader = res.body!.getReader();
//       const decoder = new TextDecoder();
//       let full = "";

//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;
//         full += decoder.decode(value, { stream: true });
//         const snap = full;
//         setMessages((prev) => {
//           const next = [...prev];
//           next[next.length - 1] = {
//             role: "assistant",
//             content: stripTriggers(snap),
//             provider,
//           };
//           return next;
//         });
//       }

//       const trigger = detectExportTrigger(full);
//       const cleanContent = stripTriggers(full);

//       if (trigger === "pdf" || trigger === "docx") {
//         await exportBrief(trigger, cleanContent);
//       } else if (trigger === "email") {
//         latestBriefRef.current = cleanContent;
//         setMessages((prev) => [
//           ...prev,
//           {
//             role: "assistant",
//             content:
//               "Would you like me to send this brief to the Kaytee team so they can follow up, or is there anything you'd like to refine first?",
//             isEmailPrompt: true,
//           },
//         ]);
//       }
//     } catch (err) {
//       setMessages((prev) => {
//         const next = [...prev];
//         next[next.length - 1] = {
//           role: "assistant",
//           content: `Network error: ${(err as Error).message}`,
//         };
//         return next;
//       });
//     } finally {
//       setLoading(false);
//     }
//   }

//   function handleKey(e: React.KeyboardEvent) {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       send();
//     }
//   }

//   const hasConversation = messages.length > 0;
//   const showPulse = !isOpen && !hasEverOpened;

//   return (
//     <>
//       <style>{`
//         @keyframes kaytee-pulse-ring {
//           0% { box-shadow: 0 0 0 0 rgba(160, 120, 72, 0.45); }
//           100% { box-shadow: 0 0 0 16px rgba(160, 120, 72, 0); }
//         }
//         .kaytee-pulse::before {
//           content: "";
//           position: absolute;
//           inset: 0;
//           border-radius: 9999px;
//           animation: kaytee-pulse-ring 2.4s ease-out infinite;
//         }
//       `}</style>

//       {/* Floating Action Button */}
//       {!isOpen && (
//         <button
//           onClick={toggleOpen}
//           aria-label="Chat with the Kaytee design concierge"
//           className={`${showPulse ? "kaytee-pulse" : ""} animate-fade-in fixed bottom-7 right-7 z-[9998] flex h-[60px] w-[60px] items-center justify-center rounded-full bg-charcoal text-brand-200 shadow-[0_14px_30px_-6px_rgba(17,17,17,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-6px_rgba(17,17,17,0.55)] hover:text-sand-50`}
//         >
//           <span className="font-hero text-[22px] leading-none">K</span>
//         </button>
//       )}

//       {/* Chat Panel */}
//       {isOpen && (
//         <div className="animate-fade-up fixed bottom-0 right-0 z-[9999] flex h-[100dvh] w-full flex-col overflow-hidden border border-brand-200/60 bg-sand-50 shadow-[0_30px_70px_-12px_rgba(17,17,17,0.35)] sm:bottom-7 sm:right-7 sm:h-[640px] sm:max-h-[calc(100vh-3.5rem)] sm:w-[400px] sm:rounded-[22px]">
//           {/* Header */}
//           <div className="flex shrink-0 items-center justify-between bg-charcoal px-5 py-4">
//             <div className="flex items-center gap-3">
//               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-400/40 bg-charcoal-light">
//                 <span className="font-hero text-lg text-brand-300">K</span>
//               </div>
//               <div>
//                 <div className="font-hero text-[17px] leading-tight tracking-wide text-sand-50">
//                   Kaytee Furnitures
//                 </div>
//                 <div className="mt-0.5 flex items-center gap-1.5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-brand-300/90">
//                   <span
//                     className={`h-1.5 w-1.5 rounded-full ${servedBy ? "bg-emerald-400" : "bg-brand-400"}`}
//                   />
//                   Design Concierge
//                 </div>
//               </div>
//             </div>
//             <button
//               onClick={() => setIsOpen(false)}
//               aria-label="Close chat"
//               className="flex h-8 w-8 items-center justify-center rounded-full text-sand-200/70 transition-colors hover:bg-white/10 hover:text-sand-50"
//             >
//               <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
//                 <path
//                   d="M3 3l10 10M13 3L3 13"
//                   stroke="currentColor"
//                   strokeWidth="1.6"
//                   strokeLinecap="round"
//                 />
//               </svg>
//             </button>
//           </div>
//           <div className="h-px shrink-0 bg-gradient-to-r from-brand-500/70 via-brand-300/40 to-transparent" />

//           {/* Messages */}
//           <main className="flex-1 space-y-4 overflow-y-auto bg-sand-50 px-4 py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
//             {!hasConversation && (
//               <div className="mx-auto max-w-[280px] py-4 text-center">
//                 <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-brand-300/60 bg-sand-100">
//                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//                     <path
//                       d="M4 20v-5a2 2 0 0 1 2-2h1V9a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v4h1a2 2 0 0 1 2 2v5M4 20h16M6 20v-2M18 20v-2"
//                       stroke="#a07848"
//                       strokeWidth="1.4"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </div>
//                 <p className="font-display text-[21px] italic leading-snug text-charcoal">
//                   Let&apos;s design your space
//                 </p>
//                 <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal-muted">
//                   Tell me about the room you have in mind. Feel free to share
//                   inspiration images or a floor plan along the way.
//                 </p>
//                 <div className="mt-5 flex flex-col gap-2">
//                   {[
//                     "I want to redesign my living room",
//                     "Help me furnish a studio apartment",
//                     "I need a home office that feels calm",
//                   ].map((starter) => (
//                     <button
//                       key={starter}
//                       onClick={() => setInput(starter)}
//                       className="rounded-xl border border-brand-200 bg-white px-3.5 py-2.5 text-left text-[12.5px] text-charcoal transition-colors hover:border-brand-400 hover:bg-sand-100"
//                     >
//                       {starter}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {messages.map((m, i) => (
//               <div key={i}>
//                 <div
//                   className={`flex items-start gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
//                 >
//                   {m.role === "assistant" && (
//                     <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-charcoal">
//                       <span className="font-hero text-[12px] text-brand-300">
//                         {m.provider ? m.provider[0].toUpperCase() : "K"}
//                       </span>
//                     </div>
//                   )}
//                   <div
//                     className={`relative max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
//                       m.role === "user"
//                         ? "rounded-br-md bg-charcoal text-sand-50"
//                         : "rounded-bl-md border border-brand-200/70 bg-white text-charcoal shadow-[0_1px_2px_rgba(17,17,17,0.04)]"
//                     }`}
//                   >
//                     {m.files?.length && (
//                       <div className="mb-2 flex flex-wrap gap-1.5">
//                         {m.files.map((f, fi) => (
//                           <div
//                             key={fi}
//                             className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] ${
//                               m.role === "user" ? "bg-white/10" : "bg-sand-100"
//                             }`}
//                           >
//                             {f.preview ? (
//                               <img
//                                 src={f.preview}
//                                 alt={f.name}
//                                 className="h-[18px] w-[18px] rounded object-cover"
//                               />
//                             ) : (
//                               <span className="text-[13px]">
//                                 {fileIcon(f.type)}
//                               </span>
//                             )}
//                             <span
//                               className={`max-w-[90px] overflow-hidden text-ellipsis whitespace-nowrap ${
//                                 m.role === "user"
//                                   ? "text-sand-100"
//                                   : "text-charcoal-muted"
//                               }`}
//                             >
//                               {f.name}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                     <pre className="whitespace-pre-wrap break-words font-sans text-[13px] leading-relaxed">
//                       {m.content ||
//                         (loading && i === messages.length - 1 ? "▌" : "")}
//                     </pre>
//                   </div>
//                 </div>

//                 {m.isEmailPrompt && contactStep === "idle" && !emailSent && (
//                   <div className="ml-9 mt-2 flex flex-wrap gap-2">
//                     <button
//                       onClick={startContactCollection}
//                       className="rounded-lg bg-charcoal px-3 py-1.5 text-[12px] font-medium text-brand-200 transition-colors hover:bg-charcoal-light"
//                     >
//                       Yes, send to the team
//                     </button>
//                     <button
//                       onClick={() =>
//                         setMessages((prev) => [
//                           ...prev,
//                           {
//                             role: "assistant",
//                             content: "No problem — the brief won't be sent.",
//                           },
//                         ])
//                       }
//                       className="rounded-lg border border-brand-200 bg-white px-3 py-1.5 text-[12px] text-charcoal-muted transition-colors hover:border-brand-300"
//                     >
//                       No thanks
//                     </button>
//                     <button
//                       onClick={() =>
//                         setMessages((prev) => [
//                           ...prev,
//                           {
//                             role: "assistant",
//                             content:
//                               "Of course — what would you like to explore or adjust?",
//                           },
//                         ])
//                       }
//                       className="rounded-lg border border-brand-300/60 bg-brand-100/60 px-3 py-1.5 text-[12px] font-medium text-brand-700 transition-colors hover:bg-brand-100"
//                     >
//                       Continue chatting
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))}

//             {loading && (
//               <div className="flex items-start justify-start gap-2.5">
//                 <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-charcoal">
//                   <span className="font-hero text-[12px] text-brand-300">
//                     K
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-brand-200/70 bg-white px-4 py-3">
//                   <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-300 [animation-delay:0ms]" />
//                   <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-300 [animation-delay:150ms]" />
//                   <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-300 [animation-delay:300ms]" />
//                 </div>
//               </div>
//             )}

//             <div ref={bottomRef} />
//           </main>

//           {/* Contact collection bar */}
//           {(contactStep === "name" ||
//             contactStep === "email" ||
//             contactStep === "phone") && (
//             <div className="flex shrink-0 items-center gap-2.5 border-t border-brand-200 bg-sand-100 px-4 py-2.5">
//               <span className="shrink-0 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-brand-600">
//                 {contactStep === "name" && "Name"}
//                 {contactStep === "email" && "Email"}
//                 {contactStep === "phone" && "Phone"}
//               </span>
//               <input
//                 autoFocus
//                 type={
//                   contactStep === "email"
//                     ? "email"
//                     : contactStep === "phone"
//                       ? "tel"
//                       : "text"
//                 }
//                 placeholder={
//                   contactStep === "name"
//                     ? "e.g. Amaka Johnson"
//                     : contactStep === "email"
//                       ? "e.g. amaka@email.com"
//                       : "e.g. +234 801 234 5678"
//                 }
//                 value={contactInput}
//                 onChange={(e) => setContactInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleContactSubmit()}
//                 disabled={emailLoading}
//                 className="flex-1 rounded-lg border border-brand-300/50 bg-white px-3 py-1.5 text-[13px] text-charcoal outline-none placeholder:text-charcoal-muted/60 focus:border-brand-400"
//               />
//               <button
//                 onClick={handleContactSubmit}
//                 disabled={!contactInput.trim() || emailLoading}
//                 className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-charcoal text-brand-200 disabled:cursor-not-allowed disabled:opacity-40"
//               >
//                 {emailLoading ? (
//                   <span className="h-3 w-3 animate-spin rounded-full border-[1.5px] border-brand-300 border-t-transparent" />
//                 ) : (
//                   <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
//                     <path
//                       d="M3 8h9M8 3l5 5-5 5"
//                       stroke="currentColor"
//                       strokeWidth="1.6"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 )}
//               </button>
//             </div>
//           )}

//           {/* Attached files preview */}
//           {attachedFiles.length > 0 && (
//             <div className="flex shrink-0 flex-wrap gap-1.5 border-t border-brand-200 bg-white px-4 py-2">
//               {attachedFiles.map((f, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center gap-1.5 rounded-md border border-brand-200 bg-sand-50 px-2 py-1 text-[11px]"
//                 >
//                   {f.preview ? (
//                     <img
//                       src={f.preview}
//                       alt={f.name}
//                       className="h-5 w-5 rounded object-cover"
//                     />
//                   ) : (
//                     <span>{fileIcon(f.type)}</span>
//                   )}
//                   <span className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap text-charcoal">
//                     {f.name}
//                   </span>
//                   <button
//                     onClick={() => removeFile(i)}
//                     className="text-charcoal-muted hover:text-charcoal"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Input footer */}
//           <div className="shrink-0 bg-sand-50 px-3 pb-2 pt-2.5">
//             <div className="flex items-center gap-1.5 rounded-full bg-charcoal px-2.5 py-1.5">
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 multiple
//                 className="hidden"
//                 onChange={handleFileChange}
//                 accept="image/*,.pdf,.doc,.docx,.txt,.csv,.xlsx,.pptx"
//               />
//               <button
//                 onClick={() => fileInputRef.current?.click()}
//                 aria-label="Add files"
//                 className="group relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-brand-200/70 transition-colors hover:bg-white/10 hover:text-brand-100"
//               >
//                 <span className="pointer-events-none absolute bottom-9 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-charcoal-light px-2 py-1 text-[11px] text-sand-100 opacity-0 shadow-lg transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100">
//                   Add files
//                 </span>
//                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//                   <path
//                     d="M8 3v10M3 8h10"
//                     stroke="currentColor"
//                     strokeWidth="1.6"
//                     strokeLinecap="round"
//                   />
//                 </svg>
//               </button>
//               <textarea
//                 ref={textareaRef}
//                 placeholder="Ask anything about your space…"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={handleKey}
//                 rows={1}
//                 disabled={loading}
//                 className="max-h-[100px] flex-1 resize-none bg-transparent py-1.5 font-sans text-[13.5px] text-sand-50 outline-none placeholder:text-sand-200/40 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
//               />
//               <button
//                 onClick={send}
//                 disabled={loading || (!input.trim() && !attachedFiles.length)}
//                 className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-400 text-charcoal transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
//               >
//                 {loading ? (
//                   <span className="h-3 w-3 animate-spin rounded-full border-[1.5px] border-charcoal border-t-transparent" />
//                 ) : (
//                   <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
//                     <path
//                       d="M8 13V3M3.5 7.5 8 3l4.5 4.5"
//                       stroke="currentColor"
//                       strokeWidth="1.7"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 )}
//               </button>
//             </div>
//             <p className="mt-2 text-center text-[10px] text-charcoal-muted/80">
//               Kaytee's assistant can make mistakes. Please verify important
//               details.
//             </p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
