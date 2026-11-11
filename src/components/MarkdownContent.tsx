import React from "react";

function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 rounded bg-background/70 border text-xs font-mono"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={idx}>{part.slice(1, -1)}</em>;
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

export function MarkdownContent({ content }: { content: string }) {
  const lines = content.split(/\r?\n/);
  const blocks: React.ReactNode[] = [];
  let listItems: string[] = [];
  let listType: "ul" | "ol" | null = null;

  const flushList = (keyPrefix: string) => {
    if (!listType || listItems.length === 0) return;
    const Tag = listType;
    blocks.push(
      <Tag
        key={`${keyPrefix}-list`}
        className={
          listType === "ul"
            ? "list-disc pl-5 space-y-1 my-2"
            : "list-decimal pl-5 space-y-1 my-2"
        }
      >
        {listItems.map((item, i) => (
          <li key={i} className="leading-relaxed">
            {renderInline(item)}
          </li>
        ))}
      </Tag>
    );
    listItems = [];
    listType = null;
  };

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trim();
    if (!line) {
      flushList(`l${idx}`);
      return;
    }

    if (line.startsWith("### ")) {
      flushList(`l${idx}`);
      blocks.push(
        <h3 key={idx} className="font-heading font-semibold text-sm mt-3 mb-1">
          {renderInline(line.slice(4))}
        </h3>
      );
      return;
    }

    if (line.startsWith("## ")) {
      flushList(`l${idx}`);
      blocks.push(
        <h2 key={idx} className="font-heading font-bold text-base mt-3 mb-1.5">
          {renderInline(line.slice(3))}
        </h2>
      );
      return;
    }

    if (line.startsWith("# ")) {
      flushList(`l${idx}`);
      blocks.push(
        <h1 key={idx} className="font-heading font-bold text-lg mt-3 mb-2">
          {renderInline(line.slice(2))}
        </h1>
      );
      return;
    }

    if (/^[-*•]\s+/.test(line)) {
      if (listType === "ol") flushList(`l${idx}`);
      listType = "ul";
      listItems.push(line.replace(/^[-*•]\s+/, ""));
      return;
    }

    if (/^\d+\.\s+/.test(line)) {
      if (listType === "ul") flushList(`l${idx}`);
      listType = "ol";
      listItems.push(line.replace(/^\d+\.\s+/, ""));
      return;
    }

    flushList(`l${idx}`);
    blocks.push(
      <p key={idx} className="leading-relaxed my-1.5">
        {renderInline(line)}
      </p>
    );
  });

  flushList("end");

  return <div className="text-sm space-y-1">{blocks}</div>;
}
