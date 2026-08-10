import React from "react";
import { GitBranch, Lock, Star, GitFork } from "lucide-react";

export default function RepoPicker({ repos, selected, onSelect }) {
  return (
    <div className="grid gap-2">
      {repos.map((repo) => {
        const isActive = selected === repo.full_name;
        return (
          <button
            key={repo.id}
            onClick={() => onSelect(repo.full_name)}
            className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
              isActive
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/40 hover:bg-muted/40"
            }`}
          >
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
              <GitBranch className="h-4 w-4 text-foreground/70" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate font-medium text-sm">{repo.full_name}</span>
                {repo.private && <Lock className="h-3 w-3 text-muted-foreground" />}
              </div>
              {repo.description && (
                <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{repo.description}</p>
              )}
              <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
                {repo.language && <span>{repo.language}</span>}
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3" /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="h-3 w-3" /> {repo.open_issues_count} issues
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
