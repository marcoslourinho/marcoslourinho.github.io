import { createElement } from 'react'
import type { BuildContext, Head, PageDef } from '../shared/types'
import { buildEntries } from '../content'
import { collectImageUrls, loadImageDimensions } from '../content/dimensions'
import { collectTweetIds, loadTweets } from '../content/tweets'
import { ogImageUrl } from '../platform/og'
import { collectLanguages, getHighlighter } from './highlight'
import { createMdxCompiler } from './mdx'
import { createMdxComponents } from '../../app/mdx/static-components'
import { HomePage } from '../../app/pages/home'
import {
  AboutPage,
  BlogsPage,
  BooksPage,
  NotFoundPage,
  NotesIndexPage,
  ProjectsPage,
  VideosPage,
} from '../../app/pages/content-pages'
import { BlogPostPage, NotePage } from '../../app/pages/article-pages'

/**
 * The page registry: every route in the site as a `PageDef`.
 *
 * `generateStaticParams` has no analogue because the render loop in `./index.ts`
 * is that function, and `notFound()` has none because a page is only emitted
 * for a slug that exists.
 */

const NOTES_TITLE = 'Notes'
const NOTES_DESCRIPTION = 'Short-form thoughts, code snippets, and tips.'

/**
 * What an article falls back to when its frontmatter has no description.
 *
 * A post with an empty description emits no description tags at all, which is
 * what the baseline does and what `posts/nintype.mdx` relies on. A note
 * inherits the section's, because `notes/[slug]` exported no metadata and all
 * eight note pages shared this string.
 */
const SECTION_DESCRIPTION = { blog: '', notes: NOTES_DESCRIPTION } as const

interface Article {
  kind: 'blog' | 'notes'
  title: string
  description: string
  dateISO: string
  ogImage?: string
}

/**
 * The head every article shares.
 *
 * Both sections get the `%s | Marcos Lourinho` template, unlike the baseline:
 * Next's template reached the layouts but not `generateMetadata` on
 * `blog/[slug]`, so posts shipped a bare title, and `notes/[slug]` exported no
 * metadata at all, so all eight notes shared the one section title.
 * CONTRACT item 14.
 */
function articleHead(article: Article): Head {
  return {
    title: article.title,
    description: article.description || SECTION_DESCRIPTION[article.kind],
    ogImage: article.ogImage,
    ogType: 'article',
    publishedTime: article.dateISO,
  }
}

export async function getPages(ctx: BuildContext): Promise<PageDef[]> {
  const bodies = [
    ...ctx.posts.map((post) => post.body),
    ...ctx.notes.map((note) => note.body),
  ]

  const [highlighter, tweets, dimensions] = await Promise.all([
    getHighlighter(collectLanguages(bodies)),
    loadTweets(ctx.root, collectTweetIds(bodies)),
    loadImageDimensions(ctx.root, collectImageUrls(bodies)),
  ])
  const mdx = await createMdxCompiler(ctx.cacheDir, highlighter)
  const components = createMdxComponents({
    root: ctx.root,
    tweets,
    dimensions,
  })

  const entries = buildEntries(ctx)

  const pages: PageDef[] = [
    {
      path: '/',
      head: {
        description:
          'Marcos Lourinho — Head of Engineering na Exitlag. Notas sobre ' +
          'engenharia de software, liderança e gestão de times de tecnologia.',
      },
      render: () => createElement(HomePage, { posts: entries }),
    },
    {
      path: '/about',
      head: {
        title: 'About',
        description:
          'A trajetória de Marcos Lourinho: mais de uma década liderando ' +
          'pessoas, produtos e times de engenharia de software. Pega um ' +
          'café, porque aqui você vai ler a versão longa da história.',
      },
      variants: { embed: true },
      render: ({ toolbar }) => createElement(AboutPage, { toolbar }),
    },
    {
      path: '/blogs',
      head: {
        title: 'Blogs',
        description:
          'Artigos que eu tenho certeza que vão te ajudar a ser melhor.',
      },
      aliases: ['/blog'],
      variants: { embed: true },
      render: ({ toolbar }) => createElement(BlogsPage, { toolbar }),
    },
    {
      path: '/notes',
      head: {
        title: NOTES_TITLE,
        description: NOTES_DESCRIPTION,
      },
      variants: { embed: true },
      render: ({ toolbar }) =>
        createElement(NotesIndexPage, { notes: ctx.notes, toolbar }),
    },
    {
      path: '/videos',
      head: {
        title: 'Videos',
        description:
          'Vídeos que me ensinaram muito e precisam ser recomendados',
      },
      aliases: ['/labs'],
      variants: { embed: true },
      render: ({ toolbar }) => createElement(VideosPage, { toolbar }),
    },
    {
      path: '/projects',
      head: {
        title: 'Projects',
        description: 'Em breve...',
      },
      variants: { embed: true },
      render: ({ toolbar }) => createElement(ProjectsPage, { toolbar }),
    },
    {
      path: '/books',
      head: {
        title: 'Books',
        description:
          'Livros que me ensinaram muito e precisam ser recomendados',
      },
      aliases: ['/talks'],
      variants: { embed: true },
      render: ({ toolbar }) => createElement(BooksPage, { toolbar }),
    },
    {
      path: '/404',
      head: {
        title: '404',
        description: 'Page not found.',
        noindex: true,
      },
      // Vercel's static builder injects an error-phase route to `/404.html`
      // ahead of ours, so the body has to exist under that name too.
      aliases: ['/404.html'],
      render: () => createElement(NotFoundPage),
    },
  ]

  for (const post of ctx.posts) {
    const slug = post.slug
    if (!slug) continue
    pages.push({
      path: `/blog/${slug}`,
      head: articleHead({
        kind: 'blog',
        title: post.title,
        description: post.description,
        dateISO: post.dateISO,
        ogImage: ogImageUrl(ctx, post),
      }),
      variants: { embed: true },
      render: async ({ toolbar }) =>
        createElement(BlogPostPage, {
          slug,
          title: post.title,
          date: post.date,
          dateISO: post.dateISO,
          description: post.description,
          content: await mdx.render(post.body, components, post.file),
          toolbar,
        }),
    })
  }

  for (const note of ctx.notes) {
    pages.push({
      path: `/notes/${note.slug}`,
      head: articleHead({
        kind: 'notes',
        title: note.title,
        description: note.description,
        dateISO: note.dateISO,
      }),
      variants: { embed: true },
      render: async ({ toolbar }) =>
        createElement(NotePage, {
          slug: note.slug,
          title: note.title,
          date: note.date,
          dateISO: note.dateISO,
          description: note.description,
          kind: note.type,
          content: await mdx.render(note.body, components, note.file),
          toolbar,
        }),
    })
  }

  return pages
}
