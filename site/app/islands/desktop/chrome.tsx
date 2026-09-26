import type { CSSProperties, MouseEvent, ReactNode } from 'react'
import {
  ExternalLinkIcon,
  FileIcon,
  FolderIconDefault,
} from '@components/desktop/icons'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  SearchIcon,
  ThemeToggle,
  TwitterIcon,
} from '@components/static/desktop-icons'
import { entryHref } from '@lib/types'
import { windowStyles } from '@lib/window-styles'
import {
  FOLDERS,
  postTransitionName,
  type DesktopPost,
  type WindowId,
} from './data'

/**
 * The resting desktop: menubar, icon grid and the two widgets.
 *
 * `app/pages/home.tsx` renders this with React at build time and the desktop
 * island renders it again with Preact as its first hydration pass, so the two
 * must agree element for element. Handlers are the only thing that varies, and
 * event listeners are not markup.
 *
 * Nothing here calls `track()`. Every clickable carries `data-track` plus the
 * payload keys the runtime's delegated analytics listener reads off `dataset`,
 * so the four events fire identically with the island loaded, still loading, or
 * disabled entirely -- and exactly once, since only one listener sends them.
 */

export interface ChromeHandlers {
  /** Opens a folder window. Absent on the server and below 768px. */
  onFolder?: (id: WindowId, event: MouseEvent) => void
  onCalculator?: (event: MouseEvent) => void
  onProfile?: (event: MouseEvent) => void
  onPost?: (post: DesktopPost, event: MouseEvent) => void
  /** Warms the window's iframe before the reader commits to opening it. */
  onPostHover?: (post: DesktopPost) => void
  onPostHoverEnd?: () => void
  /** Live clock text. The server renders '' and the inline script fills it in. */
  clock?: string
}

interface DesktopItem {
  id: string
  name: string
  icon: ReactNode
  href?: string
  external?: boolean
  /** Analytics `section`, which is the window id rather than the label. */
  section?: string
  onClick?: (event: MouseEvent) => void
}

const HOVER_BG = { '--hover-bg': 'rgba(255, 255, 255, 0.05)' } as CSSProperties
const ICON_COLOR: CSSProperties = { color: 'var(--fg)', opacity: 0.8 }

function DesktopIcon({ item }: { item: DesktopItem }) {
  const content = (
    <div
      className="flex flex-col items-center gap-2 3xl:gap-3 p-3 3xl:p-4 rounded-lg transition-colors duration-200 cursor-pointer relative"
      style={HOVER_BG}
    >
      <div
        className="h-12 3xl:h-16 flex items-center justify-center transition-colors 3xl:scale-125"
        style={ICON_COLOR}
      >
        {item.icon}
      </div>
      <span
        className="text-xs 3xl:text-sm font-mono text-center whitespace-nowrap min-w-20 3xl:min-w-24"
        style={ICON_COLOR}
      >
        {item.name}
      </span>
      {item.external && (
        <div className="absolute top-1 right-1 3xl:top-2 3xl:right-2">
          <ExternalLinkIcon />
        </div>
      )}
    </div>
  )

  if (item.href) {
    return item.external ? (
      <a href={item.href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    ) : (
      <a
        href={item.href}
        data-track={item.section && 'nav_click'}
        data-section={item.section}
        onClick={item.onClick}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type="button"
      aria-label={`Open ${item.name}`}
      data-track={item.section && 'nav_click'}
      data-section={item.section}
      onClick={item.onClick}
    >
      {content}
    </button>
  )
}

function folderItem(
  id: (typeof FOLDERS)[number]['id'],
  name: string,
  handlers: ChromeHandlers,
): DesktopItem {
  const folder = FOLDERS.find((item) => item.id === id)
  if (!folder) {
    throw new Error(`Unknown desktop folder: ${id}`)
  }

  return {
    id: folder.id,
    name,
    icon: folder.file ? <FileIcon /> : <FolderIconDefault />,
    href: folder.route,
    section: folder.id,
    onClick: handlers.onFolder
      ? (event: MouseEvent) => handlers.onFolder?.(folder.id, event)
      : undefined,
  }
}

function buildItems(handlers: ChromeHandlers): DesktopItem[] {
  return [
    folderItem('about', 'ABOUT.MD', handlers),
    {
      id: 'linkedin',
      name: 'linkedin',
      icon: <LinkedInIcon />,
      href: 'https://www.linkedin.com/in/marcoslourinho/',
      external: true,
    },
    {
      id: 'instagram',
      name: 'instagram',
      icon: <InstagramIcon />,
      href: 'https://www.instagram.com/marcos.lourinho',
      external: true,
    },
    {
      id: 'twitter',
      name: 'X',
      icon: <TwitterIcon />,
      href: 'https://x.com/marcoslourinho',
      external: true,
    },
    {
      id: 'github',
      name: 'github',
      icon: <GitHubIcon />,
      href: 'https://github.com/marcoslourinho',
      external: true,
    },
    folderItem('notes', 'notes', handlers),
    folderItem('books', 'books', handlers),
    folderItem('videos', 'videos', handlers),
    folderItem('blog-list', 'blogs', handlers),
    folderItem('projects', 'projects', handlers),
  ]
}

const CARD_CLASS =
  'block px-4 3xl:px-5 py-3 3xl:py-4 hover:bg-[var(--list-hover)] transition-colors group'
const FOOTER_CLASS =
  'block px-4 3xl:px-5 py-2 3xl:py-3 text-center text-xs 3xl:text-sm font-mono text-[var(--gray)] hover:text-[var(--fg)] hover:bg-[var(--list-hover)] transition-colors border-t border-[var(--border-color)]'
const WIDGET_CLASS =
  'border border-[var(--border-color)] rounded-lg overflow-hidden backdrop-blur-sm'
const WIDGET_BG: CSSProperties = { backgroundColor: 'var(--bg-widget)' }
const WIDGET_HEAD_CLASS =
  'border-b border-[var(--border-color)] px-4 3xl:px-5 py-3 3xl:py-4'
const WIDGET_TITLE_CLASS =
  'text-xs 3xl:text-sm font-mono font-semibold text-[var(--fg)] uppercase'

function WidgetProfile({ handlers }: { handlers: ChromeHandlers }) {
  return (
    <div className={WIDGET_CLASS} style={WIDGET_BG}>
      <div className="border-b border-[var(--border-color)] px-4 3xl:px-5 py-4 3xl:py-5 flex items-center gap-3.5 3xl:gap-4">
        <a
          href="/profile.jpg"
          aria-label="Open profile photo"
          onClick={handlers.onProfile}
          className="shrink-0 rounded-full overflow-hidden transition-opacity duration-200 hover:opacity-80"
        >
          <img
            src="/profile.jpg"
            alt="Marcos Lourinho"
            width={80}
            height={80}
            className="size-20 3xl:size-24 rounded-full object-cover object-[50%_28%] block"
          />
        </a>
        <div className="min-w-0">
          <h2 className="text-sm 3xl:text-base font-mono font-semibold text-[var(--fg)] uppercase">
            Marcos Lourinho
          </h2>
          <div className="mt-1 font-mono text-[var(--gray)]">
            <div className="text-sm 3xl:text-base">
              Head of Engineering at{' '}
              <a
                href="https://exitlag.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--fg)] hover:text-[var(--gray)] transition-colors"
              >
                @exitlag
              </a>
            </div>
            <div className="mt-2 text-xs 3xl:text-sm">
              Hosted in <span className="text-[var(--fg)]">São Paulo, SP.</span>
            </div>
          </div>
        </div>
      </div>
      <p className="px-4 3xl:px-5 py-4 3xl:py-5 text-xs 3xl:text-sm font-mono text-[var(--gray)] leading-relaxed">
        Entre projetos, reuniões e cafés, compartilho por aqui o que acontece
        além do código: experimentos, desafios de gestão, conteúdos, decisões e
        os bastidores de quem constrói negócios, produtos de software e times de
        engenharia.
      </p>
    </div>
  )
}

function PostRow({
  post,
  handlers,
}: {
  post: DesktopPost
  handlers: ChromeHandlers
}) {
  const external = post.isThirdParty
  const href = entryHref(post)

  const body = (
    <>
      <div className="flex items-center gap-2 mb-1">
        <FileIcon className="w-4 h-4 text-[var(--gray)] flex-shrink-0 group-hover:text-[var(--fg)] transition-colors" />
        <h3 className="text-sm 3xl:text-base font-mono text-[var(--fg)] group-hover:text-[var(--gray)] transition-colors">
          {post.title}
        </h3>
      </div>
      <p className="text-xs 3xl:text-sm text-[var(--gray)]">
        {post.date}
        {external && <span className="ml-2 opacity-50">· external</span>}
      </p>
    </>
  )

  if (external) {
    return (
      <li>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={CARD_CLASS}
        >
          {body}
        </a>
      </li>
    )
  }

  return (
    <li>
      <a
        href={href}
        className={CARD_CLASS}
        data-track="blog_click"
        data-slug={post.slug}
        data-vt-name={postTransitionName(post)}
        onClick={
          handlers.onPost
            ? (event: MouseEvent) => handlers.onPost?.(post, event)
            : undefined
        }
        onMouseEnter={
          handlers.onPostHover ? () => handlers.onPostHover?.(post) : undefined
        }
        onMouseLeave={handlers.onPostHoverEnd}
      >
        {body}
      </a>
    </li>
  )
}

export function WidgetRecentPosts({
  posts,
  handlers,
}: {
  posts: DesktopPost[]
  handlers: ChromeHandlers
}) {
  return (
    <div className={WIDGET_CLASS} style={WIDGET_BG}>
      <div className={WIDGET_HEAD_CLASS}>
        <h2 className={WIDGET_TITLE_CLASS}>Engineering Notes</h2>
      </div>
      <ul className="divide-y divide-[var(--border-color)]">
        {posts.map((post) => (
          <PostRow key={post.slug} post={post} handlers={handlers} />
        ))}
      </ul>
      <a
        href="/notes"
        className={FOOTER_CLASS}
        data-track="nav_click"
        data-section="notes"
        data-source="widget"
      >
        View all notes →
      </a>
    </div>
  )
}

const EXPERIENCES = [
  {
    id: 'exitlag-hoe',
    title: 'Head of Engineering',
    href: 'https://www.exitlag.com/',
    description:
      'Atualmente lidero um time de 22 pessoas em 3 squads na vertical de engenharia de sistemas. Sustentando aplicações que transacionam +90% da receita global e suportam a operação da empresa.',
    tags: ['Exitlag', '2025', 'Hoje'],
  },
  {
    id: 'exitlag-mdm',
    title: 'Mobile Development Manager',
    href: 'https://www.exitlag.com/mobile',
    description:
      'Liderei o squad de desenvolvimento do produto mobile, escalando o crescimento da receita diária dos apps de Android e iOS em +483%.',
    tags: ['Exitlag', '2024', '2025'],
  },
  {
    id: 'g4-hoe',
    title: 'Head of Engineering',
    href: 'https://g4business.com/?utm_source=direct&utm_medium=none',
    description:
      'Equity partner e líder de vertical, com 21 engenheiros em 4 squads, escalei as plataformas de educação que levaram a empresa de R$50 milhões a +R$350 milhões de faturamento em 4 anos.',
    tags: ['G4', '2023', '2024'],
  },
  {
    id: 'g4-tl',
    title: 'Tech Lead',
    href: 'https://g4business.com/g4-skills?utm_source=google&utm_campaign=adsgg_g4_bau437_sc_skills_bofu_selfcheckout-outros_venda_branded_ecommerce&utm_content=bau437_skills_kw-frase&utm_medium=cpc&utm_term=g4+skills&campaign_id=23689189326&adset_id=201536180344&content_id=802259705881',
    description:
      'Founding engineer do produto G4 Skills, liderei o desenvolvimento da plataforma de educação B2B baseada em trilhas e diagnósticos personalizados que foi de 0 a +R$60 milhões de ARR em 3 anos.',
    tags: ['G4', '2021', '2022'],
  },
  {
    id: 'emperium-hot',
    title: 'Head of Technology',
    href: 'https://redesfiepa.org.br/home/',
    description:
      'Co-founder da consultoria, liderei um time de 15 pessoas no modelo de squad as a service no desenvolvimento de múltiplas plataformas B2B que movimentaram juntas +R$1,5 bi em negócios no Pará.',
    tags: ['Emperium', '2019', '2020'],
  },
] as const

const EXPERIENCE_TAG_CLASS =
  'inline-block px-1.5 3xl:px-2 py-0.5 3xl:py-1 text-xs 3xl:text-sm bg-black/10 dark:bg-white/10 text-[var(--gray)] rounded border border-[var(--border-color)]'

const LINKEDIN_EXPERIENCE =
  'https://www.linkedin.com/in/marcoslourinho/details/experience/'

export function WidgetExperiences() {
  return (
    <div className={WIDGET_CLASS} style={WIDGET_BG}>
      <div className={WIDGET_HEAD_CLASS}>
        <h2 className={WIDGET_TITLE_CLASS}>Experiences</h2>
      </div>
      <ul className="divide-y divide-[var(--border-color)]">
        {EXPERIENCES.map((experience) => (
          <li key={experience.id}>
            <a
              href={experience.href}
              target="_blank"
              rel="noopener noreferrer"
              className={CARD_CLASS}
            >
              <h3 className="text-sm 3xl:text-base font-mono text-[var(--fg)] group-hover:text-[var(--gray)] transition-colors mb-1">
                {experience.title}
              </h3>
              <p className="text-xs 3xl:text-sm text-[var(--gray)] mb-2">
                {experience.description}
              </p>
              <div className="flex flex-wrap gap-1 3xl:gap-1.5">
                {experience.tags.map((tag) => (
                  <span key={tag} className={EXPERIENCE_TAG_CLASS}>
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </li>
        ))}
      </ul>
      <a
        href={LINKEDIN_EXPERIENCE}
        target="_blank"
        rel="noopener noreferrer"
        className={FOOTER_CLASS}
        data-track="nav_click"
        data-section="experience"
        data-source="widget"
      >
        Ver trajetória completa →
      </a>
    </div>
  )
}

export interface DesktopChromeProps {
  posts: DesktopPost[]
  handlers?: ChromeHandlers
  /** Windows, snap previews and the preload iframe. Empty on the server. */
  children?: ReactNode
}

export function DesktopChrome({
  posts,
  handlers = {},
  children,
}: DesktopChromeProps) {
  return (
    <div className="h-screen bg-(--bg) text-(--fg) overflow-hidden flex flex-col">
      <h1 className="sr-only">Marcos Lourinho&apos;s website</h1>
      <header
        className="h-10 3xl:h-12 border-b border-(--border-color) flex items-center px-4 3xl:px-6 gap-4 3xl:gap-6 text-xs 3xl:text-sm font-mono sticky top-0 z-10"
        style={windowStyles.translucentBg}
      >
        <span className="text-(--gray)" aria-hidden>
          ~
        </span>
        <div className="ml-auto flex items-center gap-4">
          <ThemeToggle />
          <button
            type="button"
            data-open-palette
            className="text-(--gray) hover:text-(--fg) transition-colors p-1"
            aria-label="Search (⌘K)"
            title="Search (⌘K)"
          >
            <SearchIcon />
          </button>
          <time id="menubar-clock" className="text-(--gray)">
            {handlers.clock ?? ''}
          </time>
        </div>
      </header>

      <main className="flex-1 p-8 3xl:p-12 overflow-auto relative">
        <div className="flex flex-col lg:flex-row gap-8 3xl:gap-12 relative z-10">
          <div className="flex flex-col gap-8 3xl:gap-12 w-fit shrink-0">
            <div className="w-0 min-w-full">
              <WidgetProfile handlers={handlers} />
            </div>
            <nav aria-label="Desktop applications">
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-10 3xl:gap-14 w-fit">
                {buildItems(handlers).map((item) => (
                  <DesktopIcon key={item.id} item={item} />
                ))}
              </div>
            </nav>
          </div>

          <aside className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 3xl:gap-10 max-w-6xl 3xl:max-w-7xl items-start">
            <WidgetRecentPosts posts={posts} handlers={handlers} />
            <WidgetExperiences />
          </aside>
        </div>
      </main>

      {children}
    </div>
  )
}
