import { postJson } from './http.mjs';
import { stripHtml, extractCodeSolutions } from './html.mjs';

const ARTICLE_LIST_QUERY = `query questionSolutionArticles($questionSlug: String!, $skip: Int, $first: Int, $orderBy: SolutionArticleOrderBy) {
  questionSolutionArticles(questionSlug: $questionSlug, skip: $skip, first: $first, orderBy: $orderBy) {
    edges {
      node {
        slug
        byLeetcode
        isEditorsPick
        isMostPopular
      }
    }
  }
}`;

const ARTICLE_CONTENT_QUERY = `query solutionArticle($slug: String!) {
  solutionArticle(slug: $slug) { content }
}`;

export async function fetchCommunitySolutions(titleSlug) {
  const headers = { Referer: `https://leetcode.cn/problems/${titleSlug}/solution/` };
  const list = await postJson(
    'https://leetcode.cn/graphql',
    {
      operationName: 'questionSolutionArticles',
      variables: { questionSlug: titleSlug, first: 8, skip: 0, orderBy: 'DEFAULT' },
      query: ARTICLE_LIST_QUERY,
    },
    { headers, timeoutMs: 12000 },
  );

  const edges = list?.data?.questionSolutionArticles?.edges ?? [];
  const pick =
    edges.find((e) => e.node.byLeetcode)?.node ??
    edges.find((e) => e.node.isEditorsPick)?.node ??
    edges.find((e) => e.node.isMostPopular)?.node ??
    edges[0]?.node;

  if (!pick?.slug) return {};

  const article = await postJson(
    'https://leetcode.cn/graphql',
    {
      operationName: 'solutionArticle',
      variables: { slug: pick.slug },
      query: ARTICLE_CONTENT_QUERY,
    },
    { headers, timeoutMs: 12000 },
  );

  return extractCodeSolutions(article?.data?.solutionArticle?.content ?? '');
}

function mergeSolutions(...packs) {
  const out = {};
  for (const pack of packs) {
    if (!pack) continue;
    for (const [lang, code] of Object.entries(pack)) {
      if (!code?.trim()) continue;
      if (!out[lang] || code.length > out[lang].length) out[lang] = code;
    }
  }
  return out;
}

export async function enrichLeetCodeProblem(titleSlug) {
  const headers = { Referer: `https://leetcode.cn/problems/${titleSlug}/` };
  const data = await postJson(
    'https://leetcode.cn/graphql',
    {
      operationName: 'enrichQuestion',
      query: `query enrichQuestion($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
          translatedContent
          content
          solution { content }
        }
      }`,
      variables: { titleSlug },
    },
    { headers, timeoutMs: 12000 },
  );
  const q = data?.data?.question;
  if (!q) return null;

  const statementZh = stripHtml(q.translatedContent || '');
  const statementEn = stripHtml(q.content || '');
  const editorial = q.solution?.content || '';
  const approachZh = stripHtml(editorial) || '';
  const editorialSolutions = extractCodeSolutions(editorial);

  let solutions = editorialSolutions;
  if (!Object.keys(solutions).length) {
    try {
      solutions = await fetchCommunitySolutions(titleSlug);
    } catch {
      /* 社区题解拉取失败时保留题面 */
    }
  }

  solutions = mergeSolutions(editorialSolutions, solutions);

  return {
    statementZh: statementZh || undefined,
    statementEn: statementEn || undefined,
    statement: statementZh || statementEn || undefined,
    approachZh: approachZh || undefined,
    approach: approachZh || '可参考力扣官方题解与讨论区的高赞思路。',
    solutions: Object.keys(solutions).length ? solutions : undefined,
  };
}
