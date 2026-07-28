# Roadmap

## Curto prazo

- **Registrar o segundo cliente de verdade** — o teste real do template (copiar
  `data/_template/`, preencher, registrar, subir) só foi feito com um cliente fictício de
  verificação durante a migração. Vale fazer com um cliente real assim que houver um.
- **Atualizar o Next.js** — `npm audit` acusa 3 vulnerabilidades altas na versão atual
  (16.2.0), todas corrigidas em 16.2.12+. Não foi atualizado nesta rodada porque bump de versão
  de framework merece teste dedicado (pode mudar comportamento de rotas/build), não algo pra
  misturar com uma limpeza de dependências. Rodar `npm audit` de novo depois de atualizar pra
  confirmar.

## Médio prazo

- **Migração pro Supabase** — arquitetura e schema já esboçados em `docs/supabase.md`, nada
  integrado ainda de propósito. Faz sentido quando existir um motivo real (ex.: um admin
  editando clientes sem PR), não antes.
- **Endurecer a validação de código de acesso** — hoje `lib/access-code.ts` compara a senha
  inteiramente no navegador (sem sessão/cookie). Suficiente pro nível de proteção atual
  (evitar vazamento acidental de link), mas se algum cliente precisar de garantia real de
  acesso, mover pra uma Route Handler com cookie assinado é o caminho já anotado no próprio
  arquivo.
- **Script de upload pro R2** — hoje o upload de vídeo novo é 100% manual (painel Cloudflare).
  Um script simples (`rclone`/AWS SDK apontando pro endpoint R2) que já aplica a convenção de
  pastas (`clients/<slug>/videos/`) reduziria erro humano ao cadastrar cliente novo.

## Longo prazo / precisa de decisão de produto antes

- **Cor de destaque**: só a cor primária (`accentColor`) é parametrizada — tons derivados
  (hover, contraste, gradiente do easter egg) são literais calibrados à mão pra Pascoal
  (detalhes em `data/README.md`). Generalizar isso com `color-mix()` só vale a pena quando um
  cliente com cor bem diferente do dourado atual entrar — antes disso é abstração sem caso de
  uso real pra validar.
- **Auditoria de contraste (WCAG)** — não foi feita nesta rodada por falta de ferramenta visual
  no ambiente onde este trabalho foi executado. As melhorias de acessibilidade aplicadas foram
  as verificáveis por código (label em input, focus trap, navegação por teclado) — contraste de
  cor precisa de inspeção visual/ferramenta dedicada (ex. Lighthouse, axe).
- **Padrão dialog/backdrop dos overlays** — `PhotoLightbox`/`VideoLightbox` usam o mesmo
  elemento como `role="dialog"` e como área de clique-fora-pra-fechar. Funciona bem na prática
  (focus trap e Escape já cobrem o essencial), mas o padrão WCAG "correto" separaria isso em
  duas camadas (backdrop + painel do dialog). Baixa prioridade — é refinamento, não bug.
- **Galeria de fotos além de alguns clientes**: hoje as fotos ficam commitadas em
  `public/gallery/<slug>/`. Funciona bem pro volume atual; se o número de clientes/fotos
  crescer muito, o repo git cresce junto. Quando isso virar dor de verdade, migrar fotos pro R2
  (ou Supabase Storage) é uma extensão natural do que já existe pros vídeos — não é um redesign.

## Já resolvido nesta rodada (não é mais roadmap, registrado aqui só como referência)

- Thumbnails da Galeria agora passam pelo otimizador de imagem embutido do Next
  (`optimizedGallerySrc` em `lib/gallery.ts`) em vez de servir o JPEG original — resolve o que
  antes era listado aqui como limitação de performance.
