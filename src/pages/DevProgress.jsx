import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Loader2, GitCommitHorizontal, RefreshCw, ArrowLeft, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import RepoPicker from "@/components/devprogress/RepoPicker";
import CommitList from "@/components/devprogress/CommitList";

export default function DevProgress() {
  const [repos, setRepos] = useState(null);
  const [selected, setSelected] = useState(null);
  const [commits, setCommits] = useState(null);
  const [branch, setBranch] = useState(null);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [loadingCommits, setLoadingCommits] = useState(false);
  const [error, setError] = useState(null);

  const loadRepos = async () => {
    setLoadingRepos(true);
    setError(null);
    try {
      const res = await base44.functions.invoke("githubDevProgress", {});
      setRepos(res.data.repos);
      if (res.data.repos.length > 0 && !selected) {
        setSelected(res.data.repos[0].full_name);
      }
    } catch (e) {
      setError(e.response?.data?.error || e.message || "Failed to load repositories");
    } finally {
      setLoadingRepos(false);
    }
  };

  const loadCommits = async (repo) => {
    if (!repo) return;
    setLoadingCommits(true);
    setError(null);
    try {
      const res = await base44.functions.invoke("githubDevProgress", { repo });
      setCommits(res.data.commits);
      setBranch(res.data.branch);
    } catch (e) {
      setError(e.response?.data?.error || e.message || "Failed to load commits");
    } finally {
      setLoadingCommits(false);
    }
  };

  useEffect(() => {
    loadRepos();
  }, []);

  useEffect(() => {
    if (selected) loadCommits(selected);
  }, [selected]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 font-heading text-2xl font-bold">
            <GitCommitHorizontal className="h-6 w-6 text-primary" />
            Development Progress
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track development activity across your GitHub repositories via commit logs.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => selected ? loadCommits(selected) : loadRepos()} disabled={loadingRepos || loadingCommits}>
          <RefreshCw className={`h-4 w-4 ${loadingRepos || loadingCommits ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-[320px_1fr]">
        {/* Repository list */}
        <div>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Repositories
          </h2>
          {loadingRepos ? (
            <div className="flex h-40 items-center justify-center text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : repos && repos.length === 0 ? (
            <div className="rounded-lg border border-border p-6 text-center text-sm text-muted-foreground">
              No repositories found for your account.
            </div>
          ) : (
            <RepoPicker repos={repos} selected={selected} onSelect={setSelected} />
          )}
        </div>

        {/* Commit log */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Commit Log
            </h2>
            {branch && (
              <span className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                <Activity className="h-3 w-3" />
                {branch}
                {commits ? ` · ${commits.length} commits` : ""}
              </span>
            )}
          </div>

          {loadingCommits ? (
            <div className="flex h-40 items-center justify-center text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : (
            <CommitList commits={commits} />
          )}
        </div>
      </div>
    </div>
  );
}
