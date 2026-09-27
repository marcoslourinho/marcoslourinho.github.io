<h1 color="black" align="center">Marcos Lourinho</h1>

### 🚀 Projeto atual: novo site pessoal

Este repositório é o [GitHub Pages](https://marcoslourinho.github.io) da minha
conta e está em transição para uma nova versão do site, construída com um
gerador de site estático próprio (React + MDX renderizados em build time,
sem framework, sem servidor, sem fetch em runtime).

- **Stack**: TypeScript, React, MDX, Tailwind, esbuild, pnpm.
- **Conteúdo**: posts de blog e notas em MDX, com feed RSS, sitemap e busca
  gerados automaticamente no build.
- **Deploy**: 100% automático — todo push para `master` que altera algo em
  `site/` builda o projeto e publica o resultado na raiz do repositório, que é
  o que o GitHub Pages efetivamente serve.

#### Estrutura do repositório

```
.
├── legacy-site/   # backup do site antigo (HTML/CSS puro), mantido como referência histórica
├── site/          # código-fonte do site novo (o que eu edito no dia a dia)
├── .github/       # workflow de build + deploy automático
└── (raiz)         # build gerado automaticamente a partir de site/ — o que o GitHub Pages entrega
```

#### Fluxo de trabalho

1. Edito conteúdo (post, nota, página) dentro de `site/`.
2. `git commit` + `git push` para `master`.
3. A GitHub Action builda `site/` e publica o resultado na raiz do
   repositório automaticamente — sem nenhum passo manual de deploy.

Veja [`legacy-site/README.md`](legacy-site/README.md) para o backup do site
anterior e [`site/README.md`](site/README.md) para os detalhes técnicos do
gerador de site.
