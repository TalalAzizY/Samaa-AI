import React from "react";
import { GitCommit, ExternalLink } from "lucide-react";

function relativeTime(dateStr) {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export default function CommitList({ commits }) {
  if (!commits || commits.length === 0) {
    return (
      <div className="rounded-lg border border-border p-8 text-center text-sm text-muted-foreground">
        No commits found on this branch.
      </div>
    );
  }

  return (
    <div className="relative pl-6">
      <div className="absolute left-2 top-2 bottom-2 w-px bg-border" />
      <div className="space-y-4">
        {commits.map((c) => {
          const firstLine = (c.message || "").split("\n")[0];
          const rest = (c.message || "").split("\n").slice(1).join("\n").trim();
          return (
            <div key={c.sha} className="relative">
              <div className="absolute -left-[18px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-background ring-2 ring-primary/40">
                <GitCommit className="h-3 w-3 text-primary" />
              </div>
              <div className="rounded-lg border border-border bg-card p-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium leading-snug">{firstLine}</p>
                  <a
                    href={c.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-0.5 shrink-0 text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
                {rest && <p className="mt-1 text-xs text-muted-foreground whitespace-pre-wrap">{rest}</p>}
                <div className="mt-2 flex items-center gap-2">
                  {c.author_avatar ? (
                    <img src={c.author_avatar} alt="" className="h-5 w-5 rounded-full" />
                  ) : null}
                  <span className="text-xs text-muted-foreground">
                    {c.author_login || c.author} · {relativeTime(c.date)}
                  </span>
                  <span className="ml-auto rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                    {c.sha ? c.sha.slice(0, 7) : ""}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
