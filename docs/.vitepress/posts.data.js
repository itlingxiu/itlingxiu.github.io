import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/*.md', {
  includeSrc: false,
  render: false,
  excerpt: true,
  transform(rawData) {
    return rawData
      .filter(({ frontmatter }) => frontmatter && frontmatter.title)
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title || '无标题',
        url,
        excerpt: excerpt || '',
        frontmatter: frontmatter || {}
      }))
      .sort((a, b) => {
        const dateA = new Date(a.frontmatter.date || 0)
        const dateB = new Date(b.frontmatter.date || 0)
        return dateB - dateA
      })
  }
})