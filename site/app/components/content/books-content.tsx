import { ExternalLinkIcon } from '@components/desktop/icons'

interface Book {
  title: string
  author: string
  why: string
  href: string
  cover: string
}

/**
 * Front-cover-only Google Books image. `id` is a volume id; `isbn` is the
 * 13-digit ISBN with no hyphens (`vid=ISBN…`). Both URLs return just the
 * JPEG, not the reader.
 */
function googleCover(ref: { id: string } | { isbn: string }): string {
  const key = 'id' in ref ? `id=${ref.id}` : `vid=ISBN${ref.isbn}`
  return (
    'https://books.google.com/books/content?' +
    `${key}&printsec=frontcover&img=1&zoom=1`
  )
}

const BOOKS: Book[] = [
  {
    title: "The Manager's Path",
    author: 'Camille Fournier',
    why: 'Me ajudou a navegar a transição de desenvolvedor a líder de engenharia, compreendendo como as responsabilidades mudam à medida que os times crescem.',
    href: 'https://link.amazon/B01VVohhd',
    cover: googleCover({ id: 'FaNaDgAAQBAJ' }),
  },
  {
    title: 'Gestão de Alta Performance',
    author: 'Andrew S. Grove',
    why: 'Me ajudou a entender como transformar o trabalho de um gestor em resultados concretos através de processos, decisões e desenvolvimento de pessoas.',
    href: 'https://link.amazon/B030khqBm',
    // Brazilian edition is not on Google Books; this is High Output Management.
    cover: googleCover({ id: 'piCeCgAAQBAJ' }),
  },
  {
    title: 'Team Topologies',
    author: 'Matthew Skelton e Manuel Pais',
    why: 'Me ajudou a repensar como organizar múltiplos times de engenharia, reduzir dependências e criar condições para entregar software com mais fluidez.',
    href: 'https://link.amazon/B0iEgcYt0',
    cover: googleCover({ id: 'lNVcEQAAQBAJ' }),
  },
  {
    title: 'Do Your Job',
    author: 'Jackson Carter',
    why: 'Me fez refletir sobre como disciplina, clareza de responsabilidades e cultura de equipe se conectam à liderança no esporte e nas organizações.',
    href: 'https://link.amazon/B0hhdoP0R',
    cover: googleCover({ isbn: '9781982996024' }),
  },
  {
    title: 'O lado difícil das situações difíceis',
    author: 'Ben Horowitz',
    why: 'Me mostrou as decisões que ninguém ensina a tomar quando você precisa liderar uma equipe em meio ao caos.',
    href: 'https://link.amazon/B07vMSIA4',
    // Brazilian WMF edition. Open Library redirected through archive.org (~5s).
    cover:
      'https://images-na.ssl-images-amazon.com/images/P/857827976X.01.LZZZZZZZ.jpg',
  },
  {
    title: 'Negocie como se sua vida dependesse disso',
    author: 'Chris Voss e Tahl Raz',
    why: 'Aprendi conselhos e estratégias para grandes negociações e resolução de conflitos com um ex-agente do FBI.',
    href: 'https://link.amazon/B03L09xaP',
    cover:
      'https://images-na.ssl-images-amazon.com/images/P/8543108055.01.LZZZZZZZ.jpg',
  },
  {
    title: 'The Great Mental Models, Volume 1',
    author: 'Shane Parrish e Rhiannon Beaubien',
    why: 'Me ajudou a ampliar o repertório de modelos mentais, questionar suposições e tomar decisões melhores diante de problemas complexos.',
    href: 'https://link.amazon/B0hnFaA26',
    cover: googleCover({ id: 'PknuEAAAQBAJ' }),
  },
  {
    title: 'Código-fonte: Como tudo começou',
    author: 'Bill Gates',
    why: 'A biografia de um dos homens mais inteligentes que já vi, fundador da Microsoft, filantropo e apaixonado por computadores. Me inspirou.',
    href: 'https://link.amazon/B0imjj67x',
    // Companhia das Letras edition; not on Google Books.
    cover:
      'https://cdl-static.s3-sa-east-1.amazonaws.com/covers/200/9788535939958/codigo-fonte.jpg',
  },
  {
    title: 'Como o mundo funciona',
    author: 'Vaclav Smil',
    why: 'Um livro para mentes curiosas. Me ajudou a entender as bases científicas que sustentam nossa civilização e me fez questionar certezas sobre o futuro.',
    href: 'https://link.amazon/B089WWbEl',
    // Brazilian Intrínseca edition; not on Google Books.
    cover:
      'https://images-na.ssl-images-amazon.com/images/P/655560607X.01.LZZZZZZZ.jpg',
  },
]

function BookCard({ book }: { book: Book }) {
  return (
    <li>
      <a
        href={book.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-3 rounded hover:bg-[var(--list-hover)] transition-colors border border-[var(--border-color)] group"
      >
        <div className="flex items-start gap-3">
          <img
            src={book.cover}
            alt=""
            width={64}
            height={96}
            className="w-16 h-24 object-cover rounded border border-[var(--border-color)] flex-shrink-0 bg-[var(--lighter-gray)]"
          />
          <div className="flex-1 min-w-0">
            <h2 className="font-mono text-sm font-semibold text-[var(--fg)] group-hover:text-[var(--gray)] transition-colors">
              {book.title}
            </h2>
            <p className="text-sm text-[var(--gray)] mt-0.5">{book.author}</p>
            <p className="text-sm text-[var(--gray)] mt-1 line-clamp-2">
              {book.why}
            </p>
          </div>
          <ExternalLinkIcon />
        </div>
      </a>
    </li>
  )
}

export function BooksContent() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-mono font-bold mb-2 text-[var(--fg)]">
        books/
      </h1>
      <p className="mb-8 text-[var(--gray)]">
        Livros que me ensinaram muito e precisam ser recomendados.
      </p>

      <ul className="space-y-2">
        {BOOKS.map((book) => (
          <BookCard key={book.href} book={book} />
        ))}
      </ul>
    </div>
  )
}
