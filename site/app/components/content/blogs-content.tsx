import { ExternalLinkIcon } from '@components/desktop/icons'

interface Article {
  title: string
  author: string
  why: string
  href: string
  thumb: string
}

const ARTICLES: Article[] = [
  {
    title: 'The Product Strategy Stack',
    author: 'Reforge',
    why: 'Como acredito que empresas deveriam conectar as estratégias de negócio e produto.',
    href: 'https://www.reforge.com/blog/the-product-strategy-stack',
    thumb:
      'https://framerusercontent.com/images/qJMyRVjSxOXnWDfI7dmpB6twFxw.jpg?width=2500&height=1406',
  },
  {
    title: 'Making The Leap from Individual Contributor to Engineering Manager',
    author: 'Reforge',
    why: 'Skills que um gestor precisa desenvolver durante a transição para a liderança.',
    href: 'https://www.reforge.com/blog/from-ic-to-engineering-manager',
    thumb:
      'https://framerusercontent.com/images/r6JJLh93tfrMufUGyE3H1n9Dc.png?width=1500&height=844',
  },
  {
    title: 'How Duolingo reignited user growth',
    author: 'Jorge Mazal',
    why: 'Uma estratégia excepcional que gerou um crescimento de +350% no Duolingo.',
    href: 'https://www.lennysnewsletter.com/p/how-duolingo-reignited-user-growth',
    thumb:
      'https://substack-post-media.s3.amazonaws.com/public/images/acd78b4f-7ef1-4ab9-84a3-903e83308449_1456x970.png',
  },
  {
    title: '6 Steps for Setting High-Leverage OKRs',
    author: 'Reforge',
    why: 'Como o Google nos ensina a pensar objetivos através de OKRs.',
    href: 'https://www.reforge.com/blog/okr-guide',
    thumb:
      'https://framerusercontent.com/images/0VHuPxRXWiGWkWTmkb0nKc7Acg.png?width=1999&height=1125',
  },
  {
    title: 'When a Team Member Underperforms—but Has Organizational Capital',
    author: 'Harvard Business Review',
    why: 'Eu gostaria de ter aprendido isso antes de começar a liderar pessoas.',
    href: 'https://hbr.org/2026/09/when-a-team-member-underperforms-but-has-organizational-capital',
    thumb:
      'https://hbr.org/resources/images/article_assets/2026/09/Sep26_18_AI.jpg',
  },
]

function ArticleCard({ article }: { article: Article }) {
  return (
    <li>
      <a
        href={article.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-3 rounded hover:bg-[var(--list-hover)] transition-colors border border-[var(--border-color)] group"
      >
        <div className="flex items-start gap-3">
          <img
            src={article.thumb}
            alt=""
            width={128}
            height={72}
            className="w-32 h-[4.5rem] object-cover rounded border border-[var(--border-color)] flex-shrink-0 bg-[var(--lighter-gray)]"
          />
          <div className="flex-1 min-w-0">
            <h2 className="font-mono text-sm font-semibold text-[var(--fg)] group-hover:text-[var(--gray)] transition-colors">
              {article.title}
            </h2>
            <p className="text-sm text-[var(--gray)] mt-0.5">
              {article.author}
            </p>
            <p className="text-sm text-[var(--gray)] mt-1">{article.why}</p>
          </div>
          <ExternalLinkIcon />
        </div>
      </a>
    </li>
  )
}

export function BlogsContent() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-mono font-bold mb-2 text-[var(--fg)]">
        blogs/
      </h1>
      <p className="mb-8 text-[var(--gray)]">
        Artigos que eu tenho certeza que vão te ajudar a ser melhor.
      </p>

      <ul className="space-y-2">
        {ARTICLES.map((article) => (
          <ArticleCard key={article.href} article={article} />
        ))}
      </ul>
    </div>
  )
}
