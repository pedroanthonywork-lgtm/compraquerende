/* =========================================================
   COMPRA QUE RENDE — Conteúdo editável do site
   ---------------------------------------------------------
   Este arquivo é o MAPA de tudo que o cliente pode alterar
   no painel. Cada campo aqui vira um input em admin.html e,
   no site, é aplicado no elemento que tiver data-cms="chave".

   Como funciona:
     1. O HTML já traz o texto padrão escrito (bom para SEO
        e para o site funcionar se o JS falhar).
     2. Se existir um valor salvo pelo painel, Site.aplicar()
        substitui o texto do HTML por ele.
     3. Nada salvo = o HTML original continua valendo.

   ========================================================= */

const SCHEMA = [

/* =========================================================
   1. MARCA
   ========================================================= */
{
  id: 'marca', nome: 'Marca', icone: '🎨',
  desc: 'Nome, assinatura e logotipo. Aparecem em todas as páginas.',
  campos: [
    { k:'marca.nome1',   label:'Nome — primeira parte', tipo:'texto', padrao:'COMPRA',
      onde:'Cabeçalho e rodapé' },
    { k:'marca.nome2',   label:'Nome — parte destacada em amarelo', tipo:'texto', padrao:'QUE RENDE',
      onde:'Cabeçalho e rodapé' },
    { k:'marca.tagline', label:'Assinatura', tipo:'texto', padrao:'cursos que geram resultados',
      onde:'Embaixo do nome, no cabeçalho' }
  ]
},

/* =========================================================
   2. FAIXA DO TOPO E MENU
   ========================================================= */
{
  id: 'topo', nome: 'Faixa do topo e menu', icone: '📌',
  desc: 'A tarja colorida acima do menu e os nomes dos itens de navegação.',
  campos: [
    { k:'topo.ativo',     label:'Mostrar a faixa do topo', tipo:'bool', padrao:true },
    { k:'topo.texto',     label:'Texto da faixa', tipo:'texto',
      padrao:'📚 Cursos, e-books e guias a partir de R$ 9,90 — com 7 dias de garantia.',
      onde:'Topo de todas as páginas' },
    { k:'topo.linkTexto', label:'Texto do link da faixa', tipo:'texto', padrao:'Ver produtos' },
    { k:'topo.linkUrl',   label:'Para onde o link vai', tipo:'texto', padrao:'produtos.html' },

    { k:'menu.inicio',    label:'Menu — item 1', tipo:'texto', padrao:'Início' },
    { k:'menu.produtos',  label:'Menu — item 2', tipo:'texto', padrao:'Produtos' },
    { k:'menu.como',      label:'Menu — item 3', tipo:'texto', padrao:'Como funciona' },
    { k:'menu.duvidas',   label:'Menu — item 4', tipo:'texto', padrao:'Dúvidas' },
    { k:'menu.contato',   label:'Menu — item 5', tipo:'texto', padrao:'Contato' },
    { k:'menu.botao',     label:'Botão do cabeçalho', tipo:'texto', padrao:'Ver produtos' }
  ]
},

/* =========================================================
   3. HERO (primeira dobra da home)
   ========================================================= */
{
  id: 'hero', nome: 'Primeira dobra (hero)', icone: '⭐',
  desc: 'A primeira coisa que a pessoa vê. É onde a maioria decide se fica ou sai.',
  campos: [
    { k:'hero.eyebrow',  label:'Etiqueta pequena acima do título', tipo:'texto', padrao:'A partir de R$ 9,90' },
    { k:'hero.titulo',   label:'Título — parte fixa', tipo:'texto', padrao:'Conhecimento que cabe no bolso e' },
    { k:'hero.palavras', label:'Título — palavras que se alternam', tipo:'lista',
      padrao:['rende na prática','vira renda extra','muda a rotina','abre caminho'],
      onde:'Efeito de máquina de escrever, no fim do título',
      ajuda:'Uma por linha. Evite frases muito longas: elas precisam caber numa linha no celular.' },
    { k:'hero.subtitulo', label:'Texto de apoio', tipo:'area',
      padrao:'Cursos, e-books e guias sobre renda extra, empreendedorismo, saúde, segurança e carreira. Conteúdo direto ao ponto e 7 dias de garantia — porque preço não deveria impedir ninguém de aprender.' },
    { k:'hero.promessa',  label:'Frase de posicionamento', tipo:'area',
      padrao:'Não prometemos milhões. Oferecemos conhecimento, oportunidades e caminhos reais para você buscar uma renda extra.',
      onde:'Caixa destacada com a barra dourada' },

    { k:'hero.btn1Texto', label:'Botão principal — texto', tipo:'texto', padrao:'Ver todos os produtos →' },
    { k:'hero.btn1Link',  label:'Botão principal — link',  tipo:'texto', padrao:'produtos.html' },
    { k:'hero.btn2Texto', label:'Botão secundário — texto', tipo:'texto', padrao:'Como funciona' },
    { k:'hero.btn2Link',  label:'Botão secundário — link',  tipo:'texto', padrao:'#como-funciona' },

    { k:'hero.badge1',    label:'Selo flutuante de cima',   tipo:'texto', padrao:'Acesso liberado após o pagamento' },
    { k:'hero.badge2',    label:'Selo flutuante de baixo',  tipo:'texto', padrao:'🛡️ 7 dias de garantia' },

    { k:'hero.produtoId', label:'Produto em destaque no card', tipo:'produto', padrao:'p004',
      onde:'O cartão grande à direita, com o fundo animado',
      ajuda:'Escolha qual infoproduto aparece nesse card. Preço, categoria, título e link são puxados automaticamente do cadastro dele.' },
    { k:'hero.btnCardTexto', label:'Texto do botão do card', tipo:'texto', padrao:'Quero este' }
  ]
},

/* =========================================================
   4. PILARES
   ========================================================= */
{
  id: 'pilares', nome: 'Os quatro pilares', icone: '🏛️',
  desc: 'A faixa logo abaixo do hero, com os quatro temas da marca (os mesmos do logo).',
  campos: [
    { k:'pilares.itens', label:'Pilares', tipo:'grupo',
      sub:[
        { k:'icone', label:'Ícone (emoji)', tipo:'texto' },
        { k:'titulo', label:'Título', tipo:'texto' },
        { k:'texto', label:'Descrição curta', tipo:'texto' }
      ],
      padrao:[
        { icone:'🎓', titulo:'Cursos Online',    texto:'Aprenda no seu ritmo' },
        { icone:'💰', titulo:'Ganhe Dinheiro',   texto:'Transforme conhecimento em renda' },
        { icone:'💚', titulo:'Saúde e Bem-Estar',texto:'Mais qualidade de vida' },
        { icone:'🎯', titulo:'Resultados Reais', texto:'Invista em você e no seu futuro' }
      ]
    }
  ]
},

/* =========================================================
   5. FAIXA CORRENDO
   ========================================================= */
{
  id: 'marquee', nome: 'Faixa correndo', icone: '➡️',
  desc: 'A tarja com os benefícios que desliza sem parar.',
  campos: [
    { k:'marquee.ativo', label:'Mostrar a faixa', tipo:'bool', padrao:true },
    { k:'marquee.itens', label:'Itens da faixa', tipo:'lista',
      padrao:['✓ A partir de R$ 9,90','✓ Acesso vitalício','✓ 7 dias de garantia',
              '✓ Pagamento seguro Cakto','✓ Pix, cartão ou boleto','✓ Atendimento por WhatsApp',
              '✓ Acesse pelo celular','✓ Atualizações grátis'],
      ajuda:'Um por linha. Entre 6 e 10 funciona melhor.' }
  ]
},

/* =========================================================
   6. SEÇÕES DA HOME
   ========================================================= */
{
  id: 'categorias', nome: 'Seção Categorias', icone: '🗂️',
  desc: 'A grade de temas logo depois dos pilares.',
  campos: [
    { k:'cat.ativo',     label:'Mostrar esta seção', tipo:'bool', padrao:true },
    { k:'cat.eyebrow',   label:'Etiqueta', tipo:'texto', padrao:'Navegue por tema' },
    { k:'cat.titulo',    label:'Título', tipo:'texto', padrao:'O que você quer aprender hoje?' }
  ]
},
{
  id: 'destaques', nome: 'Seção Destaques', icone: '🔥',
  desc: 'Os produtos marcados como "destaque" no cadastro aparecem aqui.',
  campos: [
    { k:'dest.ativo',     label:'Mostrar esta seção', tipo:'bool', padrao:true },
    { k:'dest.eyebrow',   label:'Etiqueta', tipo:'texto', padrao:'Mais procurados' },
    { k:'dest.titulo',    label:'Título', tipo:'texto', padrao:'Os mais vendidos da semana' },
    { k:'dest.subtitulo', label:'Subtítulo', tipo:'area',
      padrao:'Escolhidos por quem já comprou — nota alta e conteúdo que sai do papel.' },
    { k:'dest.botao',     label:'Texto do botão no fim', tipo:'texto', padrao:'Ver todos os produtos →' }
  ]
},
{
  id: 'como', nome: 'Seção Como funciona', icone: '🧭',
  desc: 'Os quatro passos que explicam a compra.',
  campos: [
    { k:'como.ativo',     label:'Mostrar esta seção', tipo:'bool', padrao:true },
    { k:'como.eyebrow',   label:'Etiqueta', tipo:'texto', padrao:'Simples assim' },
    { k:'como.titulo',    label:'Título', tipo:'texto', padrao:'Do clique ao conteúdo na mão' },
    { k:'como.subtitulo', label:'Subtítulo', tipo:'texto',
      padrao:'Sem burocracia, sem mensalidade escondida, sem pegadinha.' },
    { k:'como.passos',    label:'Passos', tipo:'grupo',
      sub:[
        { k:'titulo', label:'Título do passo', tipo:'texto' },
        { k:'texto',  label:'Explicação', tipo:'area' }
      ],
      padrao:[
        { titulo:'Escolha o produto',    texto:'Veja o conteúdo completo, o formato e o que dizem as pessoas antes de decidir. Nada é escondido.' },
        { titulo:'Compre com segurança', texto:'O pagamento acontece dentro da Cakto, com Pix, cartão ou boleto. Seus dados nunca passam por aqui.' },
        { titulo:'Receba na hora',       texto:'Compra aprovada, acesso liberado em seguida. No Pix e no cartão costuma levar menos de 5 minutos.' },
        { titulo:'Use e aplique',        texto:'Acesse no celular ou no computador. E com 7 dias para desistir se não for o que esperava.' }
      ]
    }
  ]
},
{
  id: 'depoimentos', nome: 'Seção Depoimentos', icone: '💬',
  desc: 'Os textos da seção. Os depoimentos em si ficam na aba Depoimentos.',
  campos: [
    { k:'dep.ativo',     label:'Mostrar esta seção', tipo:'bool', padrao:true },
    { k:'dep.eyebrow',   label:'Etiqueta', tipo:'texto', padrao:'Quem já comprou' },
    { k:'dep.titulo',    label:'Título', tipo:'texto', padrao:'Resultados de gente igual a você' },
    { k:'dep.subtitulo', label:'Subtítulo', tipo:'area',
      padrao:'Depoimentos enviados por clientes. Resultados variam conforme a dedicação e o contexto de cada pessoa.',
      ajuda:'Esse aviso protege você juridicamente. Recomendo não remover.' },
    { k:'dep.itens', label:'Depoimentos', tipo:'grupo',
      ajuda:'Publique apenas depoimento que existiu de verdade. Depoimento inventado é publicidade enganosa pelo CDC e pode derrubar seu produto na Cakto.',
      sub:[
        { k:'nome',  label:'Nome da pessoa', tipo:'texto' },
        { k:'papel', label:'O que ela comprou', tipo:'texto' },
        { k:'nota',  label:'Estrelas (1 a 5)', tipo:'num' },
        { k:'texto', label:'Depoimento', tipo:'area' }
      ],
      padrao:[
        { nome:'Juliana Prado', papel:'Comprou Renda Extra do Zero', nota:5,
          texto:'Paguei menos de trinta reais sem esperar muita coisa, confesso. Em 47 dias fiz minha primeira venda no digital. É direto ao ponto e não promete milagre nenhum.' },
        { nome:'Marcos Vinícius', papel:'Comprou Guia Contra Golpes', nota:5,
          texto:'Comprei pensando na minha mãe. Duas semanas depois ela recebeu exatamente o golpe da página 12 e reconheceu na hora. Só isso já valeu os doze reais.' },
        { nome:'Patrícia Neves', papel:'Comprou Emagrecer Sem Dieta Maluca', nota:5,
          texto:'Perdi 11 kg em 4 meses sem passar fome e sem academia. O que mais gostei é que não tem dieta proibindo tudo — tem método que cabe na rotina com dois filhos.' }
      ]
    }
  ]
},
{
  id: 'sobre', nome: 'Seção Sobre', icone: 'ℹ️',
  desc: 'O bloco que conta por que a empresa existe.',
  campos: [
    { k:'sobre.ativo',   label:'Mostrar esta seção', tipo:'bool', padrao:true },
    { k:'sobre.eyebrow', label:'Etiqueta', tipo:'texto', padrao:'Por que existimos' },
    { k:'sobre.titulo',  label:'Título', tipo:'texto', padrao:'Transformar conhecimento em oportunidade' },
    { k:'sobre.p1',      label:'Primeiro parágrafo', tipo:'area',
      padrao:'A ideia do Compra Que Rende nasceu de uma realidade cada vez mais presente na vida dos brasileiros: o custo de vida subindo, o mercado de trabalho mudando e a necessidade de buscar novas fontes de renda.' },
    { k:'sobre.p2',      label:'Segundo parágrafo', tipo:'area',
      padrao:'Ao mesmo tempo, informação confiável continua cara ou difícil de achar. Foi por isso que criamos uma plataforma de infoprodutos de baixo custo — conteúdo acessível sobre renda, educação, desenvolvimento pessoal, saúde e segurança.' },
    { k:'sobre.lista',   label:'Lista de diferenciais', tipo:'lista',
      padrao:['Preço baixo de propósito: conhecimento não deveria ser privilégio',
              'Curadoria antes de entrar no catálogo',
              'Conteúdo prático, para aplicar no dia a dia',
              'Pagamento pela Cakto, plataforma segura de pagamentos',
              '7 dias de garantia em tudo, sem precisar justificar',
              'Atendimento humano pelo WhatsApp, antes e depois da compra'],
      ajuda:'Um por linha. O ✓ verde é colocado automaticamente.' },
    { k:'sobre.botao',   label:'Texto do botão', tipo:'texto', padrao:'Conhecer o catálogo' }
  ]
},
{
  id: 'faq', nome: 'Seção Dúvidas', icone: '❓',
  desc: 'Os textos da seção. As perguntas ficam na aba Perguntas frequentes.',
  campos: [
    { k:'faq.ativo',   label:'Mostrar esta seção', tipo:'bool', padrao:true },
    { k:'faq.eyebrow', label:'Etiqueta', tipo:'texto', padrao:'Dúvidas frequentes' },
    { k:'faq.titulo',  label:'Título', tipo:'texto', padrao:'Antes de comprar, você quer saber' },
    { k:'faq.ctaTexto',label:'Texto acima do botão', tipo:'texto', padrao:'Ficou alguma dúvida?' },
    { k:'faq.ctaBotao',label:'Texto do botão de WhatsApp', tipo:'texto', padrao:'💬 Falar no WhatsApp' },
    { k:'faq.itens',   label:'Perguntas e respostas', tipo:'grupo',
      ajuda:'Boa FAQ derruba objeção antes dela virar desistência. Escreva as perguntas que mais chegam no seu WhatsApp.',
      sub:[
        { k:'q', label:'Pergunta', tipo:'texto' },
        { k:'a', label:'Resposta', tipo:'area' }
      ],
      padrao:[
        { q:'Como recebo o produto depois de comprar?',
          a:'O pagamento é processado pela Cakto, plataforma de pagamento de produtos digitais. Assim que a compra é aprovada, a própria Cakto envia o acesso — em geral em menos de 5 minutos no cartão ou no Pix, e em até 2 dias úteis no boleto.' },
        { q:'Por quanto tempo tenho acesso?',
          a:'O acesso é vitalício. Você compra uma vez e acessa quantas vezes quiser, pelo tempo que quiser, incluindo as atualizações futuras do material sem pagar nada a mais.' },
        { q:'E se eu não gostar? Tem garantia?',
          a:'Sim. Todos os produtos têm 7 dias de garantia incondicional, previstos no Código de Defesa do Consumidor. Se dentro desse prazo você achar que não é para você, pede o reembolso direto na Cakto e recebe 100% do valor de volta, sem precisar justificar.' },
        { q:'Por que os preços são tão baixos?',
          a:'Porque é exatamente essa a proposta. Trabalhamos com infoprodutos de baixo custo para que o preço não seja o motivo de alguém deixar de aprender algo útil. Conteúdo prático, direto, sem enrolação e sem custar o valor de uma prestação.' },
        { q:'Quais são as formas de pagamento?',
          a:'Cartão de crédito com parcelamento, Pix e boleto bancário. Tudo no checkout da Cakto. Como os valores são baixos, na maioria dos produtos o Pix sai na hora e o acesso é imediato.' },
        { q:'Preciso ter experiência ou conhecimento prévio?',
          a:'Na maior parte dos produtos, não. Cada página informa o nível — quase tudo é feito para iniciante absoluto e começa explicando o básico antes de avançar.' },
        { q:'O pagamento é seguro?',
          a:'É. Nós não processamos nem armazenamos dados de cartão: toda a transação acontece dentro da Cakto, que é certificada e usa criptografia de ponta a ponta. Seus dados financeiros nunca passam por este site.' },
        { q:'Qual a diferença entre curso, e-book e guia?',
          a:'Curso é conteúdo em vídeo, dividido em aulas, que você assiste no computador ou no celular. E-book e guia são materiais em PDF, para ler na tela ou imprimir. A página de cada produto mostra qual é o formato, a quantidade de aulas ou de páginas e o tempo estimado.' },
        { q:'Tenho uma dúvida antes de comprar. Como falo com vocês?',
          a:'Pelo WhatsApp. É o nosso canal de atendimento e a gente responde em horário comercial. O botão verde fica sempre visível no canto da tela.' }
      ]
    }
  ]
},
{
  id: 'ctafinal', nome: 'Chamada final', icone: '🎯',
  desc: 'O último bloco antes do rodapé.',
  campos: [
    { k:'cta.ativo',     label:'Mostrar esta seção', tipo:'bool', padrao:true },
    { k:'cta.eyebrow',   label:'Etiqueta', tipo:'texto', padrao:'Comece hoje' },
    { k:'cta.titulo',    label:'Título (linha 1)', tipo:'texto', padrao:'Custa menos que um lanche.' },
    { k:'cta.titulo2',   label:'Título (linha 2, colorida)', tipo:'texto', padrao:'Pode valer muito mais.' },
    { k:'cta.subtitulo', label:'Texto de apoio', tipo:'area',
      padrao:'Produtos a partir de R$ 9,90, com 7 dias para testar e pedir o dinheiro de volta se não for para você.' },
    { k:'cta.botao',     label:'Texto do botão', tipo:'texto', padrao:'Ver todos os produtos' }
  ]
},

/* =========================================================
   7. PÁGINA PRODUTOS
   ========================================================= */
{
  id: 'pgProdutos', nome: 'Página Produtos', icone: '🛒',
  desc: 'Textos do catálogo completo.',
  campos: [
    { k:'pp.topo',       label:'Faixa do topo', tipo:'texto',
      padrao:'📚 Todos os produtos com 7 dias de garantia — não gostou, devolvemos o valor.' },
    { k:'pp.titulo',     label:'Título da página', tipo:'texto', padrao:'Todos os produtos' },
    { k:'pp.subtitulo',  label:'Subtítulo', tipo:'area',
      padrao:'Cursos, e-books e guias de baixo custo. Escolha pelo tema, pelo formato ou pelo preço.' },
    { k:'pp.ajudaTitulo',label:'Bloco de ajuda — título', tipo:'texto', padrao:'Não sabe qual escolher?' },
    { k:'pp.ajudaTexto', label:'Bloco de ajuda — texto', tipo:'area',
      padrao:'Me conta o que você procura pelo WhatsApp que eu te indico o produto certo — ou te digo se nenhum serve.' },
    { k:'pp.ajudaBotao', label:'Bloco de ajuda — botão', tipo:'texto', padrao:'💬 Pedir uma indicação' }
  ]
},

/* =========================================================
   8. PÁGINA DE PRODUTO
   ========================================================= */
{
  id: 'pgProduto', nome: 'Página de produto', icone: '📄',
  desc: 'Os textos fixos que aparecem em TODAS as páginas de produto.',
  campos: [
    { k:'pd.tituloCurso', label:'Título da seção de conteúdo — cursos', tipo:'texto', padrao:'O que você vai aprender' },
    { k:'pd.tituloEbook', label:'Título da seção de conteúdo — e-books e guias', tipo:'texto', padrao:'O que tem dentro' },
    { k:'pd.tituloQuem',  label:'Título da seção de público', tipo:'texto', padrao:'Para quem é' },
    { k:'pd.botaoComprar',label:'Texto do botão de compra', tipo:'texto', padrao:'Comprar agora →' },
    { k:'pd.parcelamento',label:'Linha abaixo do preço', tipo:'texto', padrao:'à vista no Pix · ou parcelado no cartão' },

    { k:'pd.garantiaSelo',  label:'Selo da garantia', tipo:'texto', padrao:'7 DIAS GARANTIA' },
    { k:'pd.garantiaTitulo',label:'Garantia — título', tipo:'texto', padrao:'Risco zero para você' },
    { k:'pd.garantiaTexto', label:'Garantia — texto', tipo:'area',
      padrao:'Comprou, acessou e achou que não é para você? Pede o reembolso dentro de 7 dias direto na Cakto e recebe 100% do valor de volta — sem precisar justificar e sem letra miúda.' },

    { k:'pd.ajudaTitulo', label:'Caixa de dúvida — título', tipo:'texto', padrao:'Ficou com dúvida sobre este produto?' },
    { k:'pd.ajudaTexto',  label:'Caixa de dúvida — texto', tipo:'texto',
      padrao:'Chama no WhatsApp antes de comprar. Se não for para você, a gente fala.' },
    { k:'pd.ajudaBotao',  label:'Caixa de dúvida — botão', tipo:'texto', padrao:'💬 Perguntar' },

    { k:'pd.seguranca',   label:'Aviso de compra segura', tipo:'texto',
      padrao:'🔒 Compra segura processada pela Cakto' },
    { k:'pd.formasPgto',  label:'Formas de pagamento', tipo:'texto', padrao:'Pix · Cartão · Boleto' },
    { k:'pd.relacionados',label:'Título dos relacionados', tipo:'texto', padrao:'Quem viu este também levou' }
  ]
},

/* =========================================================
   9. PÁGINA CONTATO
   ========================================================= */
{
  id: 'pgContato', nome: 'Página Contato', icone: '📞',
  desc: 'O cliente pediu para NÃO existir contato por e-mail. Por isso não há campo de e-mail em lugar nenhum.',
  campos: [
    { k:'pc.eyebrow',   label:'Etiqueta', tipo:'texto', padrao:'Atendimento' },
    { k:'pc.titulo',    label:'Título', tipo:'texto', padrao:'Fale com a gente pelo WhatsApp' },
    { k:'pc.texto',     label:'Texto de apoio', tipo:'area',
      padrao:'É o nosso canal de atendimento. Pode chamar para tirar dúvida antes de comprar, pedir indicação de produto ou resolver qualquer coisa depois da compra.' },
    { k:'pc.botao',     label:'Botão principal', tipo:'texto', padrao:'💬 Abrir conversa no WhatsApp' },
    { k:'pc.horario',   label:'Horário de atendimento', tipo:'texto',
      padrao:'Respondemos em horário comercial, de segunda a sexta.' },
    { k:'pc.atalhosTitulo', label:'Título dos atalhos', tipo:'texto', padrao:'Já sei do que preciso' },
    { k:'pc.atalhos',   label:'Atalhos de assunto', tipo:'grupo',
      sub:[
        { k:'ico',  label:'Ícone (emoji)', tipo:'texto' },
        { k:'txt',  label:'O que aparece no site', tipo:'texto' },
        { k:'msg',  label:'Mensagem que abre no WhatsApp', tipo:'area' }
      ],
      padrao:[
        { ico:'🧭', txt:'Qual produto é melhor para mim?', msg:'Olá! Queria uma indicação: qual produto de vocês combina mais com o que eu preciso?' },
        { ico:'💳', txt:'Dúvida sobre pagamento',          msg:'Olá! Tenho uma dúvida sobre as formas de pagamento.' },
        { ico:'📥', txt:'Comprei e não recebi o acesso',   msg:'Olá! Comprei um produto e ainda não recebi o acesso. Podem verificar?' },
        { ico:'↩️', txt:'Quero pedir reembolso',           msg:'Olá! Gostaria de pedir o reembolso dentro dos 7 dias de garantia.' },
        { ico:'📄', txt:'Sobre o conteúdo do material',    msg:'Olá! Queria saber mais sobre o conteúdo de um dos produtos antes de comprar.' },
        { ico:'🤝', txt:'Quero vender meu infoproduto aqui', msg:'Olá! Tenho um infoproduto e gostaria de saber como colocá-lo no catálogo de vocês.' }
      ]
    }
  ]
},

/* =========================================================
   10. CONTATO E REDES
   ========================================================= */
{
  id: 'contato', nome: 'Contato e redes', icone: '📱',
  desc: 'Vale para o site inteiro: botão flutuante, rodapé e página de contato.',
  campos: [
    { k:'ct.whatsapp',  label:'WhatsApp (só números, com 55 e DDD)', tipo:'tel', padrao:'5511994073209',
      ajuda:'Exemplo: 5511994073209. O site monta o link wa.me sozinho.' },
    { k:'ct.whatsFmt',  label:'WhatsApp como aparece escrito', tipo:'texto', padrao:'(11) 99407-3209' },
    { k:'ct.mensagem',  label:'Mensagem padrão do WhatsApp', tipo:'area',
      padrao:'Olá! Vim pelo site Compra que Rende e quero saber mais sobre os produtos.' },
    { k:'ct.instagram', label:'Instagram (endereço completo)', tipo:'url', padrao:'https://instagram.com/gabrielgaspar009' },
    { k:'ct.instaFmt',  label:'Instagram como aparece escrito', tipo:'texto', padrao:'@gabrielgaspar009' },
    { k:'ct.facebook',  label:'Facebook (endereço completo)', tipo:'url', padrao:'https://facebook.com/gabrielgaspar' },
    { k:'ct.faceFmt',   label:'Facebook como aparece escrito', tipo:'texto', padrao:'Gabriel Gaspar' },
    { k:'ct.endereco',  label:'Endereço', tipo:'texto', padrao:'Av. Paulista, 807 — Conj. 2315, Bela Vista' },
    { k:'ct.cidade',    label:'Cidade e estado', tipo:'texto', padrao:'São Paulo — SP' },
    { k:'ct.cep',       label:'CEP', tipo:'texto', padrao:'01311-915' }
  ]
},

/* =========================================================
   11. RODAPÉ
   ========================================================= */
{
  id: 'rodape', nome: 'Rodapé', icone: '🦶',
  desc: 'Aparece no fim de todas as páginas.',
  campos: [
    { k:'rod.descricao', label:'Descrição da empresa', tipo:'area',
      padrao:'Infoprodutos de baixo custo com conteúdo prático sobre renda, educação, saúde, segurança e desenvolvimento pessoal. Atendemos todo o Brasil.' },
    { k:'rod.tituloNav', label:'Título da coluna 2', tipo:'texto', padrao:'Navegue' },
    { k:'rod.tituloCat', label:'Título da coluna 3', tipo:'texto', padrao:'Categorias' },
    { k:'rod.tituloAte', label:'Título da coluna 4', tipo:'texto', padrao:'Atendimento' },
    { k:'rod.copyright', label:'Linha de copyright', tipo:'texto',
      padrao:'Compra Que Rende. Todos os direitos reservados.',
      ajuda:'O ano é colocado automaticamente na frente.' },
    { k:'rod.pagamento', label:'Selo de pagamento', tipo:'texto', padrao:'Pagamentos processados por Cakto 🔒' },
    { k:'rod.aviso',     label:'Aviso legal', tipo:'area',
      padrao:'Este site não é afiliado ao Facebook, Google ou Instagram. Os produtos são comercializados e entregues pela plataforma Cakto, responsável pelo processamento dos pagamentos e pela entrega dos produtos, que são de produtores parceiros. Os resultados citados em depoimentos são individuais e não representam garantia de resultado — dependem do esforço, da dedicação e do contexto de cada pessoa.',
      ajuda:'Recomendo fortemente não apagar. É o que protege você de reclamação sobre promessa de resultado.' }
  ]
},

/* =========================================================
   12. SEO
   ========================================================= */
{
  id: 'seo', nome: 'Busca no Google (SEO)', icone: '🔍',
  desc: 'O título e a descrição que aparecem no resultado de busca.',
  campos: [
    { k:'seo.titulo',    label:'Título da página inicial', tipo:'texto',
      padrao:'Compra Que Rende — Cursos e e-books a partir de R$ 9,90',
      ajuda:'Até 60 caracteres. Acima disso o Google corta.' },
    { k:'seo.descricao', label:'Descrição da página inicial', tipo:'area',
      padrao:'Infoprodutos de baixo custo: cursos online, e-books e guias sobre renda extra, empreendedorismo, saúde, segurança e educação. Compra segura pela Cakto, com 7 dias de garantia.',
      ajuda:'Entre 120 e 160 caracteres.' },
    { k:'seo.palavras',  label:'Palavras-chave', tipo:'texto',
      padrao:'compras, infoprodutos, cursos online baratos, e-book renda extra, curso low ticket' }
  ]
},

/* =========================================================
   13. CATEGORIAS E FORMATOS

   As listas suspensas do cadastro de infoproduto. As opcoes
   de fabrica (Renda Extra, Curso, E-book...) estao no
   data.js e nao aparecem aqui: aqui ficam so as criadas
   pelo cliente, que e o que precisa ser guardado.

   Quem cria normalmente e a opcao "criar nova" do proprio
   cadastro de produto. Este grupo existe para o depois:
   corrigir um nome escrito errado, trocar o icone, remover
   o que nao usa mais.
   ========================================================= */
{
  id: 'catalogo', nome: 'Categorias e formatos', icone: '🏷️',
  desc: 'As opções que você criou nas listas suspensas do cadastro de infoproduto.',
  campos: [
    { k:'catalogo.categorias', label:'Categorias que você criou', tipo:'grupo',
      ajuda:'O código é o que liga os infoprodutos a esta categoria — o nome e o ícone você troca à vontade, o código não. Remover uma categoria não apaga produto nenhum: os que estavam nela passam a aparecer sem categoria, e é só escolher outra no cadastro.',
      sub:[
        { k:'nome',   label:'Nome', tipo:'texto' },
        { k:'icone',  label:'Ícone (emoji)', tipo:'texto' },
        { k:'id',     label:'Código', tipo:'codigo' }
      ],
      padrao:[] },

    { k:'catalogo.formatos', label:'Formatos que você criou', tipo:'grupo',
      ajuda:'Formato é o tipo de entrega: curso, e-book, guia. Os que você criar mostram o campo de páginas no cadastro, como o e-book.',
      sub:[
        { k:'nome',   label:'Nome', tipo:'texto' },
        { k:'icone',  label:'Ícone (emoji)', tipo:'texto' },
        { k:'id',     label:'Código', tipo:'codigo' }
      ],
      padrao:[] }
  ]
}

];

/* =========================================================
   MOTOR
   ========================================================= */
const Site = {
  KEY: 'cqr_conteudo',

  /* Índice chave → campo, montado uma vez */
  _mapa: (() => {
    const m = {};
    SCHEMA.forEach(g => g.campos.forEach(c => { m[c.k] = c; }));
    return m;
  })(),

  /* ---------------------------------------------------------
     Conteúdo vindo do servidor. Quando existe, manda nele.
     Sem ele, vale o que estiver salvo no navegador; sem nada,
     valem os padrões declarados no SCHEMA acima.
     --------------------------------------------------------- */
  _remoto: null,

  definirRemoto(obj){
    this._remoto = (obj && Object.keys(obj).length) ? obj : null;
  },

  usandoRemoto(){ return !!this._remoto; },

  _salvos(){
    if (this._remoto) return this._remoto;
    try { return JSON.parse(localStorage.getItem(this.KEY) || '{}'); }
    catch(e){ return {}; }
  },

  /* Valor atual: o que foi salvo, ou o padrão */
  get(k){
    const salvos = this._salvos();
    if (Object.prototype.hasOwnProperty.call(salvos, k)) return salvos[k];
    return this._mapa[k] ? this._mapa[k].padrao : undefined;
  },

  /* Só o que foi alterado — usado por aplicar() para não
     sobrescrever o HTML à toa */
  foiAlterado(k){
    return Object.prototype.hasOwnProperty.call(this._salvos(), k);
  },

  /* Quando o conteúdo veio do servidor, alterar em memória não
     basta: o painel precisa ver o valor novo na hora. Por isso
     escrevemos nos dois lugares, e o botão Salvar manda para o
     servidor depois. */
  set(k, v){
    if (this._remoto) this._remoto[k] = v;
    const salvos = this._locais();
    salvos[k] = v;
    this._gravarLocal(salvos);
  },

  setVarios(obj){
    if (this._remoto) Object.assign(this._remoto, obj);
    this._gravarLocal(Object.assign(this._locais(), obj));
  },

  restaurar(k){
    if (this._remoto) delete this._remoto[k];
    const salvos = this._locais();
    delete salvos[k];
    this._gravarLocal(salvos);
  },

  _locais(){
    try { return JSON.parse(localStorage.getItem(this.KEY) || '{}'); }
    catch(e){ return {}; }
  },

  _gravarLocal(obj){
    try { localStorage.setItem(this.KEY, JSON.stringify(obj)); } catch(e){}
  },

  restaurarTudo(){
    this._remoto = null;
    try { localStorage.removeItem(this.KEY); } catch(e){}
  },

  campo(k){ return this._mapa[k]; },

  /* Quantos campos o cliente já personalizou */
  totalAlterados(){ return Object.keys(this._salvos()).length; },

  /* =========================================================
     Aplica os valores salvos no HTML.
     Só mexe no que foi realmente alterado — assim o texto
     escrito no HTML continua sendo a fonte da verdade.

     Uso no HTML:
       <h1 data-cms="hero.titulo">Texto padrão</h1>
       <a  data-cms="hero.btn1Texto" data-cms-href="hero.btn1Link">...</a>
       <section data-cms-sec="como.ativo">...</section>
     ========================================================= */
  aplicar(raiz){
    const ctx = raiz || document;

    /* Texto */
    ctx.querySelectorAll('[data-cms]').forEach(el => {
      const k = el.dataset.cms;
      if (!this.foiAlterado(k)) return;
      const v = this.get(k);
      if (v === undefined || v === null) return;
      if (el.dataset.cmsHtml === 'sim') el.innerHTML = v;
      else el.textContent = v;
    });

    /* Atributo href */
    ctx.querySelectorAll('[data-cms-href]').forEach(el => {
      const k = el.dataset.cmsHref;
      if (!this.foiAlterado(k)) return;
      el.setAttribute('href', this.get(k));
    });

    /* Mostrar / esconder seção inteira */
    ctx.querySelectorAll('[data-cms-sec]').forEach(el => {
      const k = el.dataset.cmsSec;
      if (!this.foiAlterado(k)) return;
      el.hidden = !this.get(k);
    });
  }
};

/* Contato vem do painel quando alterado, senão do data.js.
   Mantém tudo num lugar só para o resto do código não precisar saber. */
function contatoAtual(){
  return {
    whatsapp:     Site.get('ct.whatsapp'),
    whatsappFmt:  Site.get('ct.whatsFmt'),
    mensagem:     Site.get('ct.mensagem'),
    instagram:    Site.get('ct.instagram'),
    instagramFmt: Site.get('ct.instaFmt'),
    facebook:     Site.get('ct.facebook'),
    facebookFmt:  Site.get('ct.faceFmt'),
    endereco:     Site.get('ct.endereco'),
    cidade:       Site.get('ct.cidade'),
    cep:          Site.get('ct.cep')
  };
}
