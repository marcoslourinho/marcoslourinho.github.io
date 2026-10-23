import { AboutContent } from '@components/content/about-content'
import { BlogsContent } from '@components/content/blogs-content'
import { BooksContent } from '@components/content/books-content'
import { NotesContent } from '@components/content/notes-content'
import { VideosContent } from '@components/content/videos-content'
import { ProjectsContent } from '@components/content/projects-content'
import type { ComponentType } from 'react'
import type { Note } from '@framework/shared/types'
import { PageShell } from './shell'
import { transitionName } from '@framework/shared/transitions'

/**
 * The six list-and-prose routes.
 *
 * Each reuses the existing component under `app/components/content/`, so the
 * markup matches what the Next build produced. The one difference is where the
 * view-transition name lands: React's `<ViewTransition>` put it on the content
 * component's own root element, and these put it on `<main>`, because the
 * content components do not take a style prop.
 *
 * All six take `toolbar` so the build can emit an `/embed` variant with no
 * chrome. The desktop's folder windows iframe those, which keeps the window
 * content byte-identical to the real page at zero client-JS cost.
 */

export interface ContentPageProps {
  toolbar?: boolean
}

/**
 * `/about`, `/videos`, `/books` and `/blogs` are the same page: the section
 * name is the title, the only breadcrumb, the route and the transition name.
 * One function applied four times rather than four copies of eleven lines.
 */
function sectionPage(name: string, Content: ComponentType) {
  return function SectionPage({ toolbar }: ContentPageProps) {
    return (
      <PageShell
        toolbar={toolbar}
        title={name}
        segments={[{ name, href: `/${name}` }]}
        vtName={transitionName('page', name)}
      >
        <Content />
      </PageShell>
    )
  }
}

export const AboutPage = sectionPage('about', AboutContent)
export const VideosPage = sectionPage('videos', VideosContent)
export const BooksPage = sectionPage('books', BooksContent)
export const BlogsPage = sectionPage('blogs', BlogsContent)

export const ProjectsPage = sectionPage('projects', ProjectsContent)

export function NotesIndexPage({
  notes,
  toolbar,
}: ContentPageProps & { notes: Note[] }) {
  return (
    <PageShell
      toolbar={toolbar}
      title="notes"
      segments={[{ name: 'notes', href: '/notes' }]}
      vtName={transitionName('page', 'notes')}
    >
      <NotesContent notes={notes} />
    </PageShell>
  )
}

export function NotFoundPage() {
  return (
    <PageShell title="404" vtName={transitionName('page', '404')}>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-mono font-bold mb-8 text-[var(--fg)]">
          404
        </h1>
        <p className="text-[var(--gray)]">
          That page does not exist.{' '}
          <a
            href="/"
            className="text-[var(--link)] hover:opacity-80 underline transition-opacity"
          >
            Go home
          </a>
          .
        </p>
      </div>
    </PageShell>
  )
}
