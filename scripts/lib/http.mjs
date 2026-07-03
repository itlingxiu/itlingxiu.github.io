const UA = 'Mozilla/5.0 (compatible; itlingxiu-blog-sync/1.0)';

export async function fetchText(url, options = {}) {
  const { timeoutMs = 15000, headers = {}, ...rest } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      ...rest,
      signal: controller.signal,
      headers: { 'User-Agent': UA, ...headers },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchJson(url, options = {}) {
  const text = await fetchText(url, options);
  return JSON.parse(text);
}

export async function postJson(url, body, options = {}) {
  const { timeoutMs = 15000, headers = {}, ...rest } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: 'POST',
      ...rest,
      signal: controller.signal,
      headers: {
        'User-Agent': UA,
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}
