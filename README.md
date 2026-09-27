<h1 align="center">marcoslourinho.com</h1>

<p align="center">
  Código-fonte e build do meu site pessoal, publicado via GitHub Pages em
  <a href="https://marcoslourinho.com">marcoslourinho.com</a>.
</p>

<p align="center">
  <a href="https://github.com/marcoslourinho/marcoslourinho.github.io/actions/workflows/deploy.yml"><img alt="Deploy" src="https://github.com/marcoslourinho/marcoslourinho.github.io/actions/workflows/deploy.yml/badge.svg"></a>
  <a href="site/LICENSE"><img alt="Licença MIT" src="https://img.shields.io/badge/licen%C3%A7a-MIT-blue.svg"></a>
  <a href="https://marcoslourinho.com"><img alt="Site" src="https://img.shields.io/badge/site-marcoslourinho.com-black.svg"></a>
</p>

---

## O que é isso

Um site estático gerado por um **gerador próprio**, sem framework web e sem
servidor: React e MDX renderizam todas as rotas para HTML em tempo de build, e o
navegador recebe esse HTML, uma folha de estilo inlinada e um runtime de ~2 KB
que hidrata as poucas partes interativas como ilhas Preact. Nenhum `fetch` em
runtime, nenhuma variável de ambiente, nenhum segredo.

O projeto é um fork do site do [Max Leiter](https://maxleiter.com)
([MaxLeiter/maxleiter.com](https://github.com/MaxLeiter/maxleiter.com)),
distribuído sob a licença MIT. O gerador, a arquitetura e boa parte dos
componentes vêm de lá; o conteúdo, a identidade e o fluxo de deploy no GitHub
Pages são meus.

**Stack:** TypeScript · React 19 · MDX · Tailwind 4 · esbuild · Shiki · pnpm.
Roda em Node 24 ou Bun, com saída byte-idêntica nos dois.

## Como o repositório está organizado

Este repositório faz duas coisas ao mesmo tempo: guarda o **código-fonte** do
site e serve o **resultado do build**. O GitHub Pages está configurado para
servir a branch `master` a partir da raiz (`/`), então tudo o que está na raiz
(exceto as pastas abaixo) é artefato gerado e **não deve ser editado à mão**.

```
.
├── site/                  # código-fonte do site — é aqui que o trabalho acontece
│   ├── build.ts           # o build inteiro
│   ├── framework/         # o gerador: conteúdo, render, assets, feeds, OG images
│   ├── app/               # páginas, componentes, ilhas interativas, estilos
│   ├── posts/             # posts do blog (MDX)
│   ├── notes/             # notas curtas (MDX)
│   ├── public/            # arquivos copiados como estão (favicons, fotos, etc.)
│   ├── docs/              # ARCHITECTURE.md e o snapshot usado pelo gate
│   ├── template-content/  # posts/notas originais do template, só como referência
│   └── LICENSE            # licença MIT (Max Leiter)
├── legacy-site/           # backup do site antigo (HTML/CSS puro), referência histórica
├── .github/workflows/     # deploy.yml: build + publicação automática
├── CNAME                  # domínio próprio (marcoslourinho.com)
├── .nojekyll              # impede o GitHub Pages de processar a saída com Jekyll
└── (raiz)                 # saída do build — o que o GitHub Pages entrega
```

Documentação mais detalhada:

- [`site/README.md`](site/README.md) — comandos e estrutura do gerador
- [`site/docs/ARCHITECTURE.md`](site/docs/ARCHITECTURE.md) — como o site é
  construído e o log de decisões
- [`site/CLAUDE.md`](site/CLAUDE.md) — convenções e armadilhas para quem (ou o
  que) for mexer no código
- [`legacy-site/README.md`](legacy-site/README.md) — o site anterior

## Rodando localmente

Pré-requisitos: [pnpm](https://pnpm.io/) 9.15.9 (a versão está fixada em
`packageManager`) e **Node 24** ou **[Bun](https://bun.sh/)**. O servidor de
desenvolvimento (`pnpm dev`) e os scripts `test`, `gate` e `snapshot` usam Bun;
o `pnpm build` roda em Node puro.

```bash
git clone https://github.com/marcoslourinho/marcoslourinho.github.io.git
cd marcoslourinho.github.io/site
pnpm install
pnpm dev        # http://localhost:3000, com rebuild e live reload
```

Comandos disponíveis dentro de `site/`:

| Comando            | O que faz                                                          |
| ------------------ | ------------------------------------------------------------------ |
| `pnpm dev`         | observa, reconstrói e serve localmente com live reload             |
| `pnpm build`       | build de produção em Node — é o que a Action de deploy executa     |
| `pnpm build:bun`   | o mesmo build em Bun; mais rápido, saída idêntica                  |
| `pnpm check`       | typecheck com `tsc --noEmit`                                       |
| `pnpm lint`        | lint com oxlint + formatação com oxfmt                             |
| `pnpm test`        | checagem da plataforma (feeds, OG images, subsets de fonte, etc.)  |
| `pnpm gate`        | builda e compara a saída com o snapshot em `docs/snapshot.json`    |
| `pnpm snapshot`    | reescreve o snapshot, quando a mudança na saída é intencional      |

A saída do build vai para `site/.vercel/output/static/` (formato
[Vercel Build Output API](https://vercel.com/docs/build-output-api/v3)); é
exatamente esse diretório que a Action copia para a raiz do repositório.

## Escrevendo conteúdo

Posts ficam em `site/posts/`, notas em `site/notes/`. Ambos são arquivos MDX
com frontmatter YAML. O build valida o frontmatter e falha com uma mensagem
clara se algo estiver errado (título ausente, data que `new Date()` não lê,
slug com caractere inválido, slug duplicado).

```mdx
---
title: Título do post
description: Uma frase que aparece na listagem e nas meta tags.
slug: titulo-do-post
date: Sep 27, 2026
tags: [lideranca, produto]
---

Conteúdo em Markdown, com componentes React se precisar.
```

Regras que valem saber:

- `slug` é obrigatório em posts e só aceita letras, dígitos, `.`, `_` e `-`.
- `published: false` tira o arquivo do site, do feed, do sitemap e do índice
  de busca.
- Notas aceitam `type` (padrão `note`) para variar a apresentação.
- Feed RSS (`feed.xml`), `sitemap.xml`, `robots.txt` e `search-index.json`
  são gerados automaticamente a partir do conteúdo publicado.

## Deploy

O deploy é 100% automático e roda em
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. Todo push em `master` que altere algo em `site/` (ou o próprio workflow)
   dispara a Action. Também dá para disparar manualmente em *Actions →
   Deploy site → Run workflow*.
2. A Action instala as dependências, roda `pnpm build` em `site/` e copia o
   conteúdo de `site/.vercel/output/static/` para a raiz do repositório,
   preservando `site/`, `legacy-site/`, `.github/`, `README.md`, `.gitignore`,
   `.nojekyll` e `CNAME`.
3. O resultado é commitado como `chore: deploy site build [skip ci]` e enviado
   para `master`. O GitHub Pages publica em seguida.

Na prática, o fluxo do dia a dia é: editar dentro de `site/`, `git commit`,
`git push`. Não existe passo manual de deploy.

## Usando este projeto como base para o seu site

Fique à vontade — a licença permite. Um roteiro para adaptar:

1. **Faça um fork** (ou use como template) e renomeie para
   `<seu-usuario>.github.io` se quiser publicar no GitHub Pages da conta.
2. **Configure o GitHub Pages** em *Settings → Pages* para servir a branch
   `master`, pasta `/ (root)`.
3. **Troque a identidade do site:**
   - `site/framework/content/index.ts` — `SITE` (URL, título, autor) e a lista
     `externalPosts` (posts externos exibidos na listagem; remova ou substitua).
   - `site/framework/render/shell.tsx` — links sociais, `GA_MEASUREMENT_ID`
     (Google Analytics; remova se não usar) e o handle do Twitter/X nas meta
     tags.
   - `site/app/islands/desktop/chrome.tsx` — links das janelas da home.
   - `site/framework/platform/og.ts` — domínio impresso nas imagens Open Graph.
   - `site/public/` — `profile.jpg`, favicons, `llms.txt` e o arquivo de
     verificação do Google Search Console (`googlef5eb....html`).
   - `site/app/pages/content-pages.tsx` e `home.tsx` — textos das páginas
     (`about`, `projects`, `books`…) e da home.
4. **Domínio próprio:** edite `CNAME` com o seu domínio ou apague o arquivo
   para usar `<seu-usuario>.github.io`.
5. **Conteúdo:** apague o que está em `site/notes/` e `site/posts/` e escreva
   o seu. `site/template-content/` e `site/public/knightos/` são heranças do
   template original e podem ser removidos.
6. Rode `pnpm check`, `pnpm lint`, `pnpm test` e `pnpm gate` antes de fazer
   push. Depois de mudar identidade ou páginas, o `gate` vai apontar diferenças
   esperadas — aceite-as com `pnpm snapshot`.

Se preferir hospedar na Vercel em vez do GitHub Pages, `site/` já sai no
formato Build Output API; basta apontar a Vercel para essa pasta e ignorar o
workflow de deploy.

## Créditos e licença

- Gerador, arquitetura e componentes: [Max Leiter](https://maxleiter.com), a
  partir de [MaxLeiter/maxleiter.com](https://github.com/MaxLeiter/maxleiter.com),
  sob a [licença MIT](site/LICENSE) (© 2021 Maxwell Leiter). O aviso de
  copyright original é mantido em `site/LICENSE`, como a licença exige.
- Fontes [Geist](https://vercel.com/font) (Vercel) e o emulador
  [OpenTI](knightos/OpenTI/LICENSE) trazem suas próprias licenças, incluídas
  junto aos arquivos.
- O código deste repositório segue sob a mesma licença MIT. Os textos, fotos e
  demais conteúdos pessoais em `site/posts/`, `site/notes/`, `site/public/` e
  nas páginas são de Marcos Lourinho e não estão cobertos por ela — se usar o
  projeto como base, substitua-os pelos seus.
