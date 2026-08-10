import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('github');

    const body = await req.json().catch(() => ({}));
    const repo = body && body.repo; // "owner/repo" — optional

    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'Samaa-DevProgress',
    };

    // No repo selected: list the user's repositories (most recently pushed first)
    if (!repo) {
      const resp = await fetch(
        'https://api.github.com/user/repos?sort=pushed&per_page=50&affiliation=owner,collaborator,organization_member',
        { headers }
      );
      if (!resp.ok) {
        const text = await resp.text();
        return Response.json({ error: `GitHub API error: ${resp.status} ${text}` }, { status: 502 });
      }
      const repos = await resp.json();
      return Response.json({
        repos: repos.map((r: any) => ({
          id: r.id,
          name: r.name,
          full_name: r.full_name,
          description: r.description,
          private: r.private,
          default_branch: r.default_branch,
          pushed_at: r.pushed_at,
          updated_at: r.updated_at,
          language: r.language,
          stargazers_count: r.stargazers_count,
          open_issues_count: r.open_issues_count,
          html_url: r.html_url,
        })),
      });
    }

    // Repo selected: fetch its recent commits
    const [owner, name] = String(repo).split('/');
    if (!owner || !name) {
      return Response.json({ error: 'Invalid repo. Use "owner/repo".' }, { status: 400 });
    }

    // branch is optional; default to repo's default branch
    let branch = body && body.branch;
    if (!branch) {
      const repoResp = await fetch(`https://api.github.com/repos/${owner}/${name}`, { headers });
      if (!repoResp.ok) {
        const text = await repoResp.text();
        return Response.json({ error: `GitHub API error: ${repoResp.status} ${text}` }, { status: 502 });
      }
      const repoData = await repoResp.json();
      branch = repoData.default_branch;
    }

    const commitsResp = await fetch(
      `https://api.github.com/repos/${owner}/${name}/commits?sha=${encodeURIComponent(branch)}&per_page=100`,
      { headers }
    );
    if (!commitsResp.ok) {
      const text = await commitsResp.text();
      return Response.json({ error: `GitHub API error: ${commitsResp.status} ${text}` }, { status: 502 });
    }
    const commits = await commitsResp.json();

    return Response.json({
      branch,
      commits: commits.map((c: any) => ({
        sha: c.sha,
        message: c.commit.message,
        author: c.commit.author ? c.commit.author.name : (c.author ? c.author.login : 'unknown'),
        author_login: c.author ? c.author.login : null,
        author_avatar: c.author ? c.author.avatar_url : null,
        date: c.commit.author ? c.commit.author.date : null,
        html_url: c.html_url,
      })),
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
