import { ExternalLinkIcon } from '@components/desktop/icons'

interface Video {
  title: string
  author: string
  why: string
  href: string
  thumb: string
}

function youtubeThumb(id: string): string {
  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
}

const VIDEOS: Video[] = [
  {
    title: 'Are you a giver or a taker?',
    author: 'Adam Grant',
    why: 'Aqui aprendi uma mentalidade que pode mudar sua forma de gerar valor.',
    href: 'https://www.youtube.com/watch?v=YyXRYgjQXX0',
    thumb: youtubeThumb('YyXRYgjQXX0'),
  },
  {
    title: 'The Cantillon Effect | Why The Rich Stays Rich',
    author: 'Sketchinance',
    why: 'Ninguém vai te ensinar isso a respeito de dinheiro, aprenda sozinho.',
    href: 'https://www.youtube.com/watch?v=th8mH8ywdTY',
    thumb: youtubeThumb('th8mH8ywdTY'),
  },
  {
    title: 'On Recruiting',
    author: 'Naval Ravikant',
    why: 'Uma reflexão sobre contratar gente boa.',
    href: 'https://www.youtube.com/watch?v=S8x978NnZSI&t=602s',
    thumb: youtubeThumb('S8x978NnZSI'),
  },
  {
    title: 'Motivação para estudar',
    author: 'Clóvis de Barros',
    why: 'Se isso aqui não te ajudar a aprender coisas difíceis, nada vai.',
    href: 'https://www.youtube.com/watch?v=TRPBY_lxJfE',
    thumb: youtubeThumb('TRPBY_lxJfE'),
  },
  {
    title: 'O que é a dopamina?',
    author: 'Eslen Delanogare',
    why: 'Esse vídeo me ensinou como a motivação realmente funciona no cérebro.',
    href: 'https://www.youtube.com/watch?v=7NqRAmy1mLw',
    thumb: youtubeThumb('7NqRAmy1mLw'),
  },
]

function VideoCard({ video }: { video: Video }) {
  return (
    <li>
      <a
        href={video.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-3 rounded hover:bg-[var(--list-hover)] transition-colors border border-[var(--border-color)] group"
      >
        <div className="flex items-start gap-3">
          <img
            src={video.thumb}
            alt=""
            width={128}
            height={72}
            className="w-32 h-[4.5rem] object-cover rounded border border-[var(--border-color)] flex-shrink-0 bg-[var(--lighter-gray)]"
          />
          <div className="flex-1 min-w-0">
            <h2 className="font-mono text-sm font-semibold text-[var(--fg)] group-hover:text-[var(--gray)] transition-colors">
              {video.title}
            </h2>
            <p className="text-sm text-[var(--gray)] mt-0.5">{video.author}</p>
            <p className="text-sm text-[var(--gray)] mt-1 line-clamp-2">
              {video.why}
            </p>
          </div>
          <ExternalLinkIcon />
        </div>
      </a>
    </li>
  )
}

export function VideosContent() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-mono font-bold mb-2 text-[var(--fg)]">
        videos/
      </h1>
      <p className="mb-8 text-[var(--gray)]">
        Vídeos que eu tenho certeza que vão te ajudar a ser melhor.
      </p>

      <ul className="space-y-2">
        {VIDEOS.map((video) => (
          <VideoCard key={video.href} video={video} />
        ))}
      </ul>
    </div>
  )
}
