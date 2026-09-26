const LINK = "text-[var(--link)] hover:opacity-80 underline transition-opacity";

function ExtLink({ href, children }: { href: string; children: string }) {
  return (
    <a className={LINK} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

const HEADING = "text-xl font-mono font-bold mb-3 text-[var(--fg)]";
const KICKER = "mb-4 italic";
const P = "mb-4";

export function AboutContent() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-mono font-bold mb-8 text-[var(--fg)]">
        ABOUT.md
      </h1>

      <div className="space-y-6 text-[var(--gray)] leading-relaxed">
        <section>
          <h2 className={HEADING}>Marcos Lourinho</h2>

          <p className="mt-4">
            Há mais de uma década, eu navego entre códigos, projetos, problemas
            e times de tecnologia. Minha obsessão sempre esteve em{" "}
            <strong className="text-[var(--fg)]">
              construir soluções, processos e equipes capazes de mover negócios.
            </strong>
          </p>
        </section>

        <section>
          <h2 className={HEADING}>
            INIT <code className="font-mono">~/origin</code>
          </h2>

          <p className={KICKER}>Onde tudo começou.</p>

          <p className={P}>
            Nasci em 1993, cresci em Belém do Pará e me formei em Ciência da
            Computação em 2015. Mas minha história com programação começou bem
            antes, em 2009. Comecei gastando horas hospedando scripts nos
            antigos blogspots (Blogger). Mesmo sem entender direito, eu já
            brincava com <code className="font-mono">HTML4</code>,{" "}
            <code className="font-mono">XHTML</code>,{" "}
            <code className="font-mono">CSS2</code> e{" "}
            <code className="font-mono">jQuery</code> (sim, antes mesmo de
            aprender JavaScript hahaha).
          </p>

          <p className={P}>
            Com o tempo, descobri que gostava tanto de construir coisas que
            embarquei no universo de criação de games com RPG Maker, criando
            mapas em pixel art, personagens e batalhas por turnos usando
            programação básica com <code className="font-mono">Ruby/RGSS</code>{" "}
            (eu gostaria de dizer que foi legal, mas não. Detesto Ruby até
            hoje).
          </p>

          <p className={P}>
            A faculdade de computação me trouxe experiências muito diferentes.
            Naveguei por linguagens formais e autômatos, grafos, algoritmos
            genéticos, busca combinatória e até pela aventura maluca de
            construir um compilador para COBOL no sexto período (se você estava
            lá comigo, sabe muito bem do que estou falando). Mas, na real, foi a{" "}
            <strong className="text-[var(--fg)]">Engenharia de Software</strong>{" "}
            que me inspirou a seguir a carreira que tenho hoje. O estudo de
            processos, artefatos, UML, design patterns, arquitetura e a nobre
            arte de <em>"construir e entregar"</em> projetos nasceu ali.
          </p>

          <p className={P}>
            Minha carreira profissional começou em 2012, com um estágio em uma
            fábrica de software (era não remunerado, mas tudo bem, eu também não
            sabia quase nada na época kkk). Às vezes, a vontade de acelerar a
            carreira com o <em>"aprender fazendo"</em> faz a gente topar certas
            aventuras. E, sério, aquela valeu muito a pena, pois foi a partir
            dali que os desafios de verdade começaram a surgir.
          </p>

          <p className={P}>
            Depois de alguns estágios, vieram bons anos de desafios na área de
            tecnologia, passando por bancos, startups de mobilidade, software
            houses, consultorias, marketplaces, plataformas de saúde, educação e
            outros setores. Nessa jornada, abri empresa, fechei empresa, mudei
            de cidade, construí produtos, contratei pessoas, formei times, fiz
            meu primeiro exit e, claro, aprendi muito sobre negócios, gestão e
            tecnologia com pessoas incríveis. Foram experiências tão valiosas
            que tenho certeza de que ainda vão render boas histórias em alguns
            posts por aqui.
          </p>

          <p className={P}>
            Entre tantos projetos, acertos, vacilos, cafés, commits, bugs,
            releases, reuniões, entrevistas, noites sem dormir e uns quilos a
            mais (que já resolvi, ainda bem), fui construindo uma trajetória
            movida pela obsessão de criar coisas que realmente fazem os negócios
            evoluírem.
          </p>

          <p className={P}>
            Hoje, carrego histórias que só quem{" "}
            <em className="text-[var(--fg)]">"esteve na arena"</em> pode contar.
            Porque é lá, entre a poeira, o suor e as cicatrizes, que a gente
            descobre o verdadeiro valor de{" "}
            <strong className="text-[var(--fg)]">
              tentar, errar, aprender e continuar construindo.
            </strong>
          </p>
        </section>

        <section>
          <h2 className={HEADING}>
            ATK <code className="font-mono">~/work</code>
          </h2>

          <p className={KICKER}>At the keyboard.</p>

          <p className={P}>
            Depois que fiz a transição de programador para gestor, passei a
            dedicar boa parte do meu tempo à montar times de tecnologia. Quando
            entendi de verdade o conceito de{" "}
            <em className="text-[var(--fg)]">leverage</em>, descobri o poder de
            multiplicar minha capacidade de execução por meio de equipes
            formadas por pessoas tão obcecadas quanto eu em{" "}
            <strong className="text-[var(--fg)]">
              construir, resolver problemas e fazer as coisas acontecerem.
            </strong>
          </p>

          <p className={P}>
            Hoje, minha rotina mistura estratégia, arquitetura de software,
            priorização de projetos, processos e, principalmente, pessoas. Passo
            boa parte do tempo acompanhando os projetos de perto, removendo
            barreiras, desenvolvendo engenheiros, formando times e conectando
            diferentes áreas para que as coisas aconteçam.
          </p>

          <p className={P}>
            Gosto de estar próximo dos desafios técnicos, participar das
            decisões importantes e criar as condições para que os times tenham{" "}
            <strong className="text-[var(--fg)]">
              autonomia, clareza e capacidade de execução.
            </strong>{" "}
            Meu foco está em garantir que a engenharia avance na direção certa e
            que nossas entregas gerem valor real para os produtos e para o
            negócio.
          </p>

          <p className={P}>
            Em 2024, me juntei à{" "}
            <ExtLink href="https://www.exitlag.com/">ExitLag</ExtLink>, para
            começar a escrever um novo capítulo dessa carreira: sustentando a
            operação de um produto global em uma indústria muito mais hardcore
            do que todas que já enfrentei em mais de uma década nas trincheiras.
            Ansioso pelas aventuras às quais esse desafio vai me levar.
          </p>

          <p>
            No fim das contas, continuo investindo energia na mesma coisa que me
            fez começar a programar lá em 2009:{" "}
            <strong className="text-[var(--fg)]">
              resolver problemas e construir coisas.
            </strong>{" "}
            Só que agora os desafios são um pouco maiores e envolvem muito mais
            gente.
          </p>
        </section>

        <section>
          <h2 className={HEADING}>
            AFK <code className="font-mono">~/life</code>
          </h2>

          <p className={KICKER}>Away from keyboard.</p>

          <p className={P}>
            Longe do teclado, tento manter a vida em movimento o máximo que
            consigo. Sou casado há nove anos com uma mulher incrível, católico
            praticante, lutador de jiu-jitsu, entusiasta de boxe, jogador de
            poker, colecionador e apaixonado por cinema, quadrinhos, animais,
            videogames e um bom café.
          </p>

          <p className={P}>
            É engraçado escrever sobre interesses pessoais, pois isso te faz
            refletir sobre o quanto seus hobbies moldam a sua personalidade. Às
            vezes, estou experimentando um esporte novo, assistindo à versão
            estendida de algum filme com comentários do diretor, decidindo se
            vale a pena pagar para ver no river ou tentando entender como
            estabilizar o cem quilos no tatame.
          </p>

          <p className={P}>
            No fundo, todos eles alimentam algo que também me move na
            engenharia:{" "}
            <strong className="text-[var(--fg)]">
              a curiosidade de enxergar além do óbvio e aprender a pensar antes
              de agir.
            </strong>
          </p>
        </section>

        <hr className="border-[var(--border-color)]" />

        <section>
          <h2 className={HEADING}>
            EOF <code className="font-mono">~/repository</code>
          </h2>

          <p className={KICKER}>End of file.</p>

          <p className={KICKER}>Um repositório público de insights.</p>

          <p className={P}>
            No fim, este site é só mais uma extensão da minha curiosidade. Um
            espaço para registrar ideias, compartilhar os bastidores, projetos,
            experimentações e dividir o que aprendo pelo caminho.
          </p>

          <p className="font-semibold text-[var(--fg)]">
            Sem a pretensão de ter todas as respostas, mas com muita vontade de
            continuar construindo, aprendendo e dividindo o que vale a pena.
          </p>
        </section>
      </div>
    </div>
  );
}
