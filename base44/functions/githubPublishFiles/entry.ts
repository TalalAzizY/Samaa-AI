import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

function b64encode(str) {
  // UTF-8 safe base64
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('github');

    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'Samaa-DevProgress',
      'Content-Type': 'application/json',
    };

    const body = await req.json().catch(() => ({}));
    const repo = body.repo; // "owner/name"
    const files = Array.isArray(body.files) ? body.files : [];

    if (!repo || !repo.includes('/')) {
      return Response.json({ error: 'repo must be "owner/name"' }, { status: 400 });
    }
    if (files.length === 0) {
      return Response.json({ error: 'no files provided' }, { status: 400 });
    }

    const [owner, name] = repo.split('/');
    const branch = body.branch || 'main';

    // Ensure repo exists; create under the authenticated user if missing and owner matches their login
    const checkResp = await fetch(`https://api.github.com/repos/${owner}/${name}`, { headers });
    let createdRepo = false;
    if (checkResp.status === 404) {
      const meResp = await fetch('https://api.github.com/user', { headers });
      const meData = meResp.ok ? await meResp.json() : null;
      if (!meData || meData.login !== owner) {
        return Response.json({
          error: `Repository ${repo} does not exist and owner '${owner}' does not match the connected GitHub account (${meData ? meData.login : 'unknown'}). Create the repo first or use your own account's owner.`,
        }, { status: 404 });
      }
      const createResp = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers,
        body: JSON.stringify({ name, private: false, auto_init: true, description: 'Samaa AI project' }),
      });
      if (!createResp.ok) {
        const t = await createResp.text();
        return Response.json({ error: `Failed to create repo: ${createResp.status} ${t}` }, { status: 502 });
      }
      createdRepo = true;
    } else if (!checkResp.ok) {
      const t = await checkResp.text();
      return Response.json({ error: `Repo check failed: ${checkResp.status} ${t}` }, { status: 502 });
    }

    const results = [];
    for (const f of files) {
      const putResp = await fetch(`https://api.github.com/repos/${owner}/${name}/contents/${f.path}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          message: body.message || 'Upload project files',
          content: b64encode(f.content),
          branch,
        }),
      });
      results.push({
        path: f.path,
        ok: putResp.ok,
        status: putResp.status,
        sha: putResp.ok ? (await putResp.json()).content?.sha : null,
      });
    }

    return Response.json({ repo, createdRepo, branch, results });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
