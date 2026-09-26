/**
 * The shapes the desktop island receives through `data-props`, and the URL
 * helpers both the static page and the island use.
 *
 * These are deliberately narrower than `BlogPost`: `excerpt` and `content` are
 * never read on the homepage, and every byte here is serialized into the HTML
 * twice over (once as markup, once as the island's props JSON).
 */

import { entryHref } from '@lib/types'
import { transitionName } from '@framework/shared/transitions'

export type WindowId =
  | 'calculator'
  | 'profile'
  | 'about'
  | 'projects'
  | 'blog-list'
  | 'videos'
  | 'books'
  | 'notes'

export interface DesktopPost {
  slug: string
  title: string
  date: string
  href?: string
  isThirdParty?: boolean
  type: 'post' | 'note'
}

export interface DesktopProps {
  posts: DesktopPost[]
}

/**
 * Below this width the desktop is not a desktop: folder icons and post cards
 * are plain navigations, no window ever opens, and the embed prefetch in
 * app/pages/home.tsx is gated on the same number through a `media` query.
 */
export const DESKTOP_MIN_WIDTH = 768

/**
 * The chrome-free variant a window iframes. `?window` is a distinct cache key
 * from `/embed` and `/embed/`: Chrome remembers a 301 from `python -m
 * http.server` and a 308 from an earlier bun run, and the two bounce forever
 * inside the iframe. The query does not change the file that is served.
 */
export function embedHref(post: DesktopPost): string {
  return listEmbedHref(entryHref(post))
}

export function listEmbedHref(route: string): string {
  return `${route}/embed?window`
}

/** Pairs with the `view-transition-name` the article pages put on `<article>`. */
export function postTransitionName(post: DesktopPost): string {
  return transitionName(post.type === 'note' ? 'note' : 'blog', post.slug)
}

export interface FolderConfig {
  /** The desktop icon's label and its analytics `section`. */
  id: WindowId
  name: string
  route: string
  /** Drawn as a document rather than a folder. */
  file?: boolean
  /** Window chrome title. Defaults to `name`. */
  windowTitle?: string
}

/** Desktop order. The icon grid is five across. */
export const FOLDERS: FolderConfig[] = [
  {
    id: 'notes',
    name: 'notes',
    route: '/notes',
    windowTitle: 'engineering notes',
  },
  { id: 'books', name: 'books', route: '/books' },
  { id: 'videos', name: 'videos', route: '/videos' },
  { id: 'blog-list', name: 'blogs', route: '/blogs' },
  { id: 'projects', name: 'projects', route: '/projects' },
  { id: 'about', name: 'ABOUT.md', route: '/about', file: true },
]

export interface ContentWindowConfig extends FolderConfig {
  title: string
  defaultX: number
  defaultY: number
}

/**
 * Where each folder's window opens, cascaded so a second one is not hidden by
 * the first. Derived from FOLDERS rather than restated: the id, name and route
 * were written out twice, so adding a folder to one list and not the other left
 * an icon whose window silently never opened.
 */
const WINDOW_ORIGINS: Record<WindowId, { x: number; y: number }> = {
  about: { x: 200, y: 100 },
  projects: { x: 250, y: 120 },
  'blog-list': { x: 300, y: 140 },
  notes: { x: 325, y: 150 },
  videos: { x: 350, y: 160 },
  books: { x: 400, y: 180 },
  calculator: { x: 200, y: 100 },
  profile: { x: 220, y: 80 },
}

export const CONTENT_WINDOWS: ContentWindowConfig[] = FOLDERS.map((folder) => ({
  ...folder,
  title: folder.windowTitle ?? folder.name,
  defaultX: WINDOW_ORIGINS[folder.id].x,
  defaultY: WINDOW_ORIGINS[folder.id].y,
}))
