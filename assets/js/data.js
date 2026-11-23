/* =========================================================
   COMPRA QUE RENDE — Camada de dados
   ---------------------------------------------------------
   Catálogo de exemplo, dados de contato e os helpers que o
   resto do site usa para ler tudo isso.

   Os produtos daqui são a rede de segurança: se o servidor não
   responder, o site abre com eles e continua navegável. O
   catálogo de verdade vem do banco, pela API.
   ========================================================= */

/* ---------------------------------------------------------
   Dados de contato

   Não há campo de e-mail de propósito: o atendimento é só por
   WhatsApp, e não existe endereço de e-mail em lugar nenhum do
   site.
   --------------------------------------------------------- */
const CONTATO = {
  whatsapp:     '5511994073209',
  whatsappFmt:  '(11) 99407-3209',
  mensagem:     'Olá! Vim pelo site Compra que Rende e quero saber mais sobre os produtos.',
  endereco:     'Av. Paulista, 807 — Conj. 2315, Bela Vista',
  cidade:       'São Paulo — SP',
  cep:          '01311-915',
  instagram:    'https://instagram.com/gabrielgaspar009',
  instagramFmt: '@gabrielgaspar009',
  facebook:     'https://facebook.com/gabrielgaspar',
  facebookFmt:  'Gabriel Gaspar',
  dominio:      'compraquerende.com.br'
};

/* ---------------------------------------------------------
   Categorias — tiradas dos temas que o cliente citou:
   renda, educação, saúde, segurança, desenvolvimento
   pessoal e empreendedorismo.
   --------------------------------------------------------- */
const CATEGORIAS = [
  { id: 'todos',     nome: 'Todos',                 icone: '🛒' },
  { id: 'renda',     nome: 'Renda Extra',           icone: '💰' },
  { id: 'negocios',  nome: 'Empreendedorismo',      icone: '🚀' },
  { id: 'saude',     nome: 'Saúde & Bem-Estar',     icone: '💚' },
  { id: 'educacao',  nome: 'Educação & Carreira',   icone: '🎓' },
  { id: 'pessoal',   nome: 'Desenvolvimento Pessoal', icone: '🎯' }
];

/* Tipos de produto — o cliente vende curso, e-book e guia */
const TIPOS = {
  curso: { nome: 'Curso',  icone: '🎬' },
  ebook: { nome: 'E-book', icone: '📘' },
  guia:  { nome: 'Guia',   icone: '📄' }
};

/* Fundo usado quando o produto não tem imagem cadastrada, um
   por categoria. É o que faz o catálogo nunca aparecer furado. */
const CAPAS = {
  renda:     'radial-gradient(circle at 25% 20%, rgba(255,197,49,.55), transparent 58%), linear-gradient(140deg,#1B1405,#0A1A0D)',
  negocios:  'radial-gradient(circle at 25% 20%, rgba(25,224,92,.45), transparent 55%), radial-gradient(circle at 80% 80%, rgba(255,197,49,.4), transparent 55%), linear-gradient(140deg,#0B1A10,#1A1405)',
  saude:     'radial-gradient(circle at 25% 20%, rgba(25,224,92,.55), transparent 58%), linear-gradient(140deg,#06210F,#0D1A06)',
  seguranca: 'radial-gradient(circle at 25% 20%, rgba(25,224,92,.35), transparent 55%), linear-gradient(140deg,#0A1512,#141A0B)',
  educacao:  'radial-gradient(circle at 25% 20%, rgba(255,197,49,.45), transparent 55%), linear-gradient(140deg,#181205,#0A1A12)',
  pessoal:   'radial-gradient(circle at 25% 20%, rgba(255,197,49,.4), transparent 55%), linear-gradient(140deg,#151206,#0A160C)'
};

/* ---------------------------------------------------------
   PRODUTOS

   Catálogo de exemplo, em faixa de baixo custo (R$ 19,90 a
   R$ 47) — é o posicionamento do site, e produto muito acima
   disso desafina o conjunto.

   Estes dados são só a rede de segurança para quando o
   servidor não responde. O catálogo de verdade é cadastrado
   pelo painel e fica no banco.
   --------------------------------------------------------- */
const PRODUTOS = [
  {
    id: 'p001',
    slug: 'renda-extra-do-zero',
    titulo: 'Renda Extra do Zero',
    subtitulo: 'O caminho prático para começar a faturar online sem investir nada',
    tipo: 'curso',
    categoria: 'renda',
    descricaoCurta: 'Do primeiro passo à primeira venda, explicado para quem nunca vendeu nada na internet.',
    preco: 27.90,
    precoDe: 97.00,
    linkHotmart: 'https://pay.hotmart.com/SEU-CODIGO-AQUI',
    capa: null,
    badge: 'mais vendido',
    destaque: true,
    ativo: true,
    aulas: 24, horas: 4, paginas: null,
    nivel: 'Iniciante',
    alunos: 3128,
    nota: 4.9,
    beneficios: [
      'Acesso vitalício ao conteúdo',
      'Certificado de conclusão',
      'Atualizações gratuitas',
      'Suporte pelo WhatsApp',
      'Assista pelo celular'
    ],
    paraQuem: [
      'Quem nunca vendeu nada online e não sabe por onde começar',
      'Quem precisa de uma renda extra sem largar o emprego',
      'Quem já tentou e travou na primeira dificuldade'
    ],
    modulos: [
      { titulo: 'Como o digital funciona de verdade', desc: 'Sem promessa de milhão: onde o dinheiro realmente circula.' },
      { titulo: 'Escolhendo o que vender',            desc: 'Três filtros simples para não perder tempo com o nicho errado.' },
      { titulo: 'Sua primeira oferta',                desc: 'Como vender mesmo sem ter produto próprio.' },
      { titulo: 'Divulgação sem gastar',              desc: 'As fontes de tráfego gratuito que ainda funcionam.' },
      { titulo: 'Da primeira venda à constância',     desc: 'O que fazer depois que o primeiro real entra.' }
    ]
  },
  {
    id: 'p002',
    slug: 'guia-golpes-pix-whatsapp',
    titulo: 'Guia Contra Golpes no Pix e WhatsApp',
    subtitulo: 'Como reconhecer e evitar as fraudes mais comuns do Brasil',
    tipo: 'guia',
    categoria: 'seguranca',
    descricaoCurta: 'Os 14 golpes que mais fazem vítima hoje, com o passo a passo para se proteger e o que fazer se cair.',
    preco: 12.90,
    precoDe: 39.90,
    linkHotmart: 'https://pay.hotmart.com/SEU-CODIGO-AQUI',
    capa: null,
    badge: 'novo',
    destaque: true,
    ativo: true,
    aulas: null, horas: null, paginas: 48,
    nivel: 'Todos os níveis',
    alunos: 1902,
    nota: 4.8,
    beneficios: [
      'PDF para baixar e imprimir',
      'Leitura em menos de 1 hora',
      'Checklist de segurança para o celular',
      'Modelo de boletim de ocorrência',
      'Atualizações gratuitas'
    ],
    paraQuem: [
      'Quem usa Pix e WhatsApp no dia a dia',
      'Quem quer proteger pais e avós de golpe',
      'Quem já quase caiu e ficou com medo'
    ],
    modulos: [
      { titulo: 'Os 14 golpes mais comuns',   desc: 'Como cada um funciona, com print de conversa real.' },
      { titulo: 'Blindando seu WhatsApp',     desc: 'Verificação em duas etapas e as configurações que ninguém ativa.' },
      { titulo: 'Pix seguro',                 desc: 'Limites, chaves e o que o banco pode devolver.' },
      { titulo: 'Caí no golpe. E agora?',     desc: 'As primeiras 2 horas decidem se você recupera o dinheiro.' }
    ]
  },
  {
    id: 'p003',
    slug: 'emagrecer-sem-dieta-maluca',
    titulo: 'Emagrecer Sem Dieta Maluca',
    subtitulo: 'Um protocolo de hábitos para a vida real, sem passar fome',
    tipo: 'curso',
    categoria: 'saude',
    descricaoCurta: 'Método de 90 dias baseado em rotina, não em sofrimento. Feito para quem tem pouco tempo.',
    preco: 19.90,
    precoDe: 67.00,
    linkHotmart: 'https://pay.hotmart.com/SEU-CODIGO-AQUI',
    capa: null,
    badge: null,
    destaque: true,
    ativo: true,
    aulas: 18, horas: 3, paginas: null,
    nivel: 'Iniciante',
    alunos: 5407,
    nota: 4.9,
    beneficios: [
      'Acesso vitalício ao conteúdo',
      'Cardápios prontos para 12 semanas',
      'Lista de compras semanal',
      'Treinos em casa sem equipamento',
      'Suporte pelo WhatsApp'
    ],
    paraQuem: [
      'Quem já tentou várias dietas e sempre voltou ao peso',
      'Quem tem rotina corrida e pouco tempo',
      'Quem quer resultado duradouro, não milagre de 7 dias'
    ],
    modulos: [
      { titulo: 'Por que você reganha peso',     desc: 'O ciclo do efeito sanfona e como quebrá-lo.' },
      { titulo: 'Montando o prato',              desc: 'Um método visual simples, sem contar caloria.' },
      { titulo: 'Movimento que cabe na rotina',  desc: 'Vinte minutos que você consegue manter.' },
      { titulo: 'Sono e estresse',               desc: 'Os fatores invisíveis que travam o emagrecimento.' }
    ]
  },
  {
    id: 'p004',
    slug: 'organize-seu-dinheiro',
    titulo: 'Organize Seu Dinheiro em 30 Dias',
    subtitulo: 'Saia do vermelho mesmo ganhando pouco',
    tipo: 'ebook',
    categoria: 'renda',
    descricaoCurta: 'Um plano de 30 dias para enxergar para onde o salário vai, quitar dívida e sobrar no fim do mês.',
    preco: 9.90,
    precoDe: 34.90,
    linkHotmart: 'https://pay.hotmart.com/SEU-CODIGO-AQUI',
    capa: null,
    badge: 'oferta',
    destaque: true,
    ativo: true,
    aulas: null, horas: null, paginas: 62,
    nivel: 'Iniciante',
    alunos: 6721,
    nota: 4.9,
    beneficios: [
      'PDF para baixar e imprimir',
      'Planilha de controle pronta',
      'Simulador de quitação de dívidas',
      'Atualizações gratuitas'
    ],
    paraQuem: [
      'Quem não sabe para onde o salário vai',
      'Quem está endividado e quer um plano de saída',
      'Quem quer começar a guardar mesmo ganhando pouco'
    ],
    modulos: [
      { titulo: 'O raio-x honesto',         desc: 'Sua situação real em uma hora de trabalho.' },
      { titulo: 'Saindo das dívidas',       desc: 'Ordem de quitação e como negociar de verdade.' },
      { titulo: 'Reserva de emergência',    desc: 'Quanto e onde guardar quando sobra pouco.' },
      { titulo: 'O mês que se paga',        desc: 'O sistema de envelopes adaptado para o Pix.' }
    ]
  },
  {
    id: 'p005',
    slug: 'vender-pelo-whatsapp',
    titulo: 'Vender pelo WhatsApp',
    subtitulo: 'Transforme sua lista de contatos em clientes',
    tipo: 'curso',
    categoria: 'negocios',
    descricaoCurta: 'Scripts, catálogo e atendimento para quem vende ou quer começar a vender pelo celular.',
    preco: 24.90,
    precoDe: 87.00,
    linkHotmart: 'https://pay.hotmart.com/SEU-CODIGO-AQUI',
    capa: null,
    badge: null,
    destaque: true,
    ativo: true,
    aulas: 21, horas: 4, paginas: null,
    nivel: 'Iniciante',
    alunos: 2840,
    nota: 4.8,
    beneficios: [
      'Acesso vitalício ao conteúdo',
      '40 scripts de atendimento prontos',
      'Modelo de catálogo no WhatsApp Business',
      'Suporte pelo WhatsApp'
    ],
    paraQuem: [
      'Autônomos que vendem por indicação',
      'Quem revende produtos e quer organizar',
      'Quem trava na hora de falar preço'
    ],
    modulos: [
      { titulo: 'WhatsApp Business do jeito certo', desc: 'Catálogo, etiquetas e respostas rápidas.' },
      { titulo: 'Abordagem sem ser chato',          desc: 'Como puxar conversa e não ser bloqueado.' },
      { titulo: 'Falando de preço',                 desc: 'O momento certo e a frase que não assusta.' },
      { titulo: 'Fechamento e pós-venda',           desc: 'Como transformar uma venda em três.' }
    ]
  },
  {
    id: 'p006',
    slug: 'curriculo-que-chama-atencao',
    titulo: 'Currículo que Chama Atenção',
    subtitulo: 'Passe pela triagem e chegue na entrevista',
    tipo: 'guia',
    categoria: 'educacao',
    descricaoCurta: 'O que o recrutador olha nos primeiros 7 segundos, com modelos prontos para copiar.',
    preco: 14.90,
    precoDe: 44.90,
    linkHotmart: 'https://pay.hotmart.com/SEU-CODIGO-AQUI',
    capa: null,
    badge: null,
    destaque: false,
    ativo: true,
    aulas: null, horas: null, paginas: 38,
    nivel: 'Todos os níveis',
    alunos: 1394,
    nota: 4.7,
    beneficios: [
      'PDF para baixar e imprimir',
      '5 modelos de currículo editáveis',
      'Guia de LinkedIn incluso',
      'Roteiro para entrevista'
    ],
    paraQuem: [
      'Quem manda currículo e nunca recebe resposta',
      'Quem está voltando ao mercado depois de um tempo',
      'Quem quer mudar de área'
    ],
    modulos: [
      { titulo: 'Os 7 segundos',       desc: 'O que o recrutador lê antes de descartar.' },
      { titulo: 'Escrevendo a experiência', desc: 'Resultado no lugar de lista de tarefas.' },
      { titulo: 'Sem experiência?',    desc: 'Como montar o primeiro currículo.' }
    ]
  },
  {
    id: 'p007',
    slug: 'disciplina-sem-motivacao',
    titulo: 'Disciplina Sem Motivação',
    subtitulo: 'Como manter a rotina quando a vontade acaba',
    tipo: 'curso',
    categoria: 'pessoal',
    descricaoCurta: 'Sistemas simples para quem começa tudo e não termina nada.',
    preco: 17.90,
    precoDe: 57.00,
    linkHotmart: 'https://pay.hotmart.com/SEU-CODIGO-AQUI',
    capa: null,
    badge: null,
    destaque: false,
    ativo: true,
    aulas: 15, horas: 3, paginas: null,
    nivel: 'Todos os níveis',
    alunos: 2210,
    nota: 4.7,
    beneficios: [
      'Acesso vitalício ao conteúdo',
      'Caderno de exercícios em PDF',
      'Rotina matinal guiada em áudio',
      'Certificado de conclusão'
    ],
    paraQuem: [
      'Quem começa tudo e não termina nada',
      'Quem se sente ocupado mas não sai do lugar',
      'Quem quer trocar motivação por sistema'
    ],
    modulos: [
      { titulo: 'O mito da motivação',    desc: 'Por que esperar vontade é receita de fracasso.' },
      { titulo: 'Arquitetura de hábitos', desc: 'Desenhe o ambiente e o hábito acontece sozinho.' },
      { titulo: 'Voltando aos trilhos',   desc: 'O protocolo de 24h depois da recaída.' }
    ]
  },
  {
    id: 'p008',
    slug: 'seguranca-digital-familia',
    titulo: 'Segurança Digital para a Família',
    subtitulo: 'Proteja seus filhos e seus pais na internet',
    tipo: 'guia',
    categoria: 'seguranca',
    descricaoCurta: 'Configurações, conversas e limites para cada idade, do celular da criança ao do avô.',
    preco: 16.90,
    precoDe: 49.90,
    linkHotmart: 'https://pay.hotmart.com/SEU-CODIGO-AQUI',
    capa: null,
    badge: null,
    destaque: false,
    ativo: true,
    aulas: null, horas: null, paginas: 54,
    nivel: 'Todos os níveis',
    alunos: 876,
    nota: 4.8,
    beneficios: [
      'PDF para baixar e imprimir',
      'Checklist por faixa etária',
      'Guia de controle parental passo a passo',
      'Atualizações gratuitas'
    ],
    paraQuem: [
      'Pais de crianças e adolescentes',
      'Quem cuida de pessoa idosa',
      'Quem quer organizar as senhas da casa'
    ],
    modulos: [
      { titulo: 'O celular da criança',  desc: 'Controle parental sem virar vigilância.' },
      { titulo: 'Adolescente e redes',   desc: 'Conversa que funciona melhor que bloqueio.' },
      { titulo: 'Protegendo os idosos',  desc: 'Os golpes que miram especificamente eles.' }
    ]
  },
  {
    id: 'p009',
    slug: 'doces-e-salgados-para-vender',
    titulo: 'Doces e Salgados para Vender',
    subtitulo: 'Receitas testadas, custo calculado e preço de venda pronto',
    tipo: 'ebook',
    categoria: 'negocios',
    descricaoCurta: '30 receitas que rendem, com planilha de custo e sugestão de preço para cada uma.',
    preco: 22.90,
    precoDe: 69.90,
    linkHotmart: 'https://pay.hotmart.com/SEU-CODIGO-AQUI',
    capa: null,
    badge: null,
    destaque: false,
    ativo: true,
    aulas: null, horas: null, paginas: 88,
    nivel: 'Iniciante',
    alunos: 3915,
    nota: 4.9,
    beneficios: [
      'PDF para baixar e imprimir',
      'Planilha de custo por receita',
      'Etiquetas prontas para imprimir',
      'Grupo de dúvidas no WhatsApp'
    ],
    paraQuem: [
      'Quem quer vender comida em casa',
      'Quem já vende mas não sabe se tem lucro',
      'Quem precisa de renda rápida'
    ],
    modulos: [
      { titulo: 'As 30 receitas',        desc: 'Testadas, com rendimento exato.' },
      { titulo: 'Calculando o custo',    desc: 'Quanto custa de verdade cada unidade.' },
      { titulo: 'Preço e embalagem',     desc: 'Quanto cobrar sem espantar o cliente.' },
      { titulo: 'Onde vender',           desc: 'Vizinhança, WhatsApp e encomenda.' }
    ]
  },
  {
    id: 'p010',
    slug: 'dormir-melhor-em-21-dias',
    titulo: 'Dormir Melhor em 21 Dias',
    subtitulo: 'Para quem vive cansado mesmo dormindo 8 horas',
    tipo: 'ebook',
    categoria: 'saude',
    descricaoCurta: 'Protocolo de higiene do sono explicado em linguagem simples, com diário para acompanhar.',
    preco: 12.90,
    precoDe: 39.90,
    linkHotmart: 'https://pay.hotmart.com/SEU-CODIGO-AQUI',
    capa: null,
    badge: null,
    destaque: false,
    ativo: true,
    aulas: null, horas: null, paginas: 44,
    nivel: 'Todos os níveis',
    alunos: 1187,
    nota: 4.7,
    beneficios: [
      'PDF para baixar e imprimir',
      'Áudios de relaxamento guiado',
      'Diário de sono para 21 dias',
      'Checklist do quarto ideal'
    ],
    paraQuem: [
      'Quem demora a pegar no sono',
      'Quem acorda várias vezes de madrugada',
      'Quem trabalha em turnos'
    ],
    modulos: [
      { titulo: 'Como o sono funciona',  desc: 'Ciclos e por que a hora de deitar importa.' },
      { titulo: 'Higiene do sono',       desc: 'As 12 regras que resolvem a maioria dos casos.' },
      { titulo: 'Mente que não desliga', desc: 'Técnicas para parar o pensamento acelerado.' }
    ]
  }
];

/* ---------------------------------------------------------
   Texto de quem edita, indo para dentro de HTML

   Quase toda lista desenhada neste projeto e montada com template
   string e jogada num innerHTML: cards, chips, FAQ, depoimentos,
   passos, rodape. O texto vem do painel, entao um "<" digitado ali
   chega aqui como marcacao.

   Na pratica o estrago comum nao e ataque, e tipografia: um "&" num
   titulo, umas aspas num depoimento, e o bloco sai torto sem erro
   nenhum no console. O caso grave existe tambem - quem entrar no
   painel deixaria de so mudar o link da Cakto e passaria a rodar
   script em todo visitante - e as duas razoes pedem a mesma linha.

   textContent resolveria, mas obrigaria a montar no e por no, e o
   projeto inteiro e feito de template string. Entao escapa-se aqui,
   no valor, onde da para ver que foi feito.
   --------------------------------------------------------- */
function esc(v){
  return String(v == null ? '' : v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}


/* ---------------------------------------------------------
   Helpers
   --------------------------------------------------------- */
const DB = {
  /* ---------------------------------------------------------
     Categorias e formatos = os fixos daqui + os que o cliente
     criou pelo painel.

     Os criados moram no conteudo do site (chaves catalogo.*),
     junto com os textos, porque sao a mesma natureza de dado:
     coisa que o dono edita e que precisa sobreviver a uma
     publicacao. Nao ha tabela nova no servidor por causa disto.

     Sao getters, e nao valores prontos, por causa da ordem de
     carga: este arquivo entra antes do conteudo.js e antes de a
     API responder. Lido na hora do uso, o painel pode criar uma
     categoria e a proxima tela ja a enxerga.
     --------------------------------------------------------- */
  _extras(chave){
    /* try/catch, e nao um teste de existencia: o Site e um const no
       conteudo.js, e const antes de executar nao responde nem a
       typeof - lanca. Se este arquivo for lido sozinho, ou antes do
       conteudo.js, o catalogo abre so com as opcoes de fabrica. */
    let l;
    try { l = Site.get(chave); } catch(e){ return []; }
    return Array.isArray(l) ? l.filter(c => c && c.id && c.nome) : [];
  },

  get categorias(){
    return CATEGORIAS.concat(this._extras('catalogo.categorias'));
  },

  get tipos(){
    const todos = Object.assign({}, TIPOS);
    this._extras('catalogo.formatos').forEach(f => {
      todos[f.id] = { nome: f.nome, icone: f.icone || '📦' };
    });
    return todos;
  },

  contato: CONTATO,

  /* Só os produtos marcados como ativos. O servidor já filtra
     para quem não está logado; aqui é a mesma regra, para o modo
     sem servidor e para o painel, que recebe a lista inteira. */
  listar(){
    return this._merge().filter(p => p.ativo);
  },

  destaques(){
    return this.listar().filter(p => p.destaque);
  },

  porSlug(slug){
    return this._merge().find(p => p.slug === slug) || null;
  },

  porId(id){
    return this._merge().find(p => p.id === id) || null;
  },

  filtrar(categoria, termo, tipo){
    const t = (termo || '').trim().toLowerCase();
    return this.listar().filter(p => {
      const okCat  = !categoria || categoria === 'todos' || p.categoria === categoria;
      const okTipo = !tipo || tipo === 'todos' || p.tipo === tipo;
      const okTxt  = !t
        || p.titulo.toLowerCase().includes(t)
        || p.descricaoCurta.toLowerCase().includes(t)
        || (p.subtitulo || '').toLowerCase().includes(t)
        || this.nomeCategoria(p.categoria).toLowerCase().includes(t);
      return okCat && okTipo && okTxt;
    });
  },

  ordenar(lista, criterio){
    const l = lista.slice();
    switch (criterio){
      case 'menor-preco': return l.sort((a, b) => a.preco - b.preco);
      case 'maior-preco': return l.sort((a, b) => b.preco - a.preco);
      case 'avaliacao':   return l.sort((a, b) => b.nota - a.nota);
      case 'vendidos':    return l.sort((a, b) => b.alunos - a.alunos);
      default:            return l.sort((a, b) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0));
    }
  },

  nomeCategoria(id){
    const c = this.categorias.find(c => c.id === id);
    return c ? c.nome : id;
  },

  iconeCategoria(id){
    const c = this.categorias.find(c => c.id === id);
    return c ? c.icone : '📦';
  },

  nomeTipo(id){
    const t = this.tipos[id];
    return t ? t.nome : 'Produto';
  },

  /* Tres telas faziam DB.tipos[p.tipo].icone direto. Com formato
     fixo isso nunca falhava; com formato criado no painel, um id
     desconhecido — produto antigo, formato apagado — derruba a
     pagina inteira no ponto. Aqui devolve um icone generico. */
  iconeTipo(id){
    const t = this.tipos[id];
    return t ? t.icone : '📦';
  },

  /* Curso mostra aulas e horas; e-book e guia mostram páginas */
  metaDe(p){
    /* Produto afiliado nem sempre informa aulas, horas ou páginas: some o que faltar */
    if (p.tipo === 'curso'){
      return [p.aulas && `${p.aulas} aulas`, p.horas && `${p.horas}h de vídeo`, p.nivel].filter(Boolean);
    }
    return [p.paginas && `${p.paginas} páginas`, 'PDF para baixar', p.nivel].filter(Boolean);
  },

  /* Escapa o endereço para caber dentro de url(...) DENTRO de um
     atributo style. São três fechamentos possíveis, e o encodeURI
     sozinho deixa os três passarem:

       "   fecha o atributo HTML
       '   fecha a string do CSS
       )   fecha o url()

     A primeira versão disto devolvia url("...") com aspas duplas, e
     isso quebrava todo style="background:..." — o navegador lia
     style="background:url(" e descartava o resto. Passou despercebido
     por meses porque os produtos de exemplo têm capa nula e caem no
     gradiente, que não tem aspas: a primeira capa de verdade do
     projeto foi também a primeira a passar por aqui. */
  _cssSeguro(url){
    return encodeURI(url)
      .replace(/"/g, '%22')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29');
  },

  /* Só o url(...), para quem já tem o resto da declaração pronta.
     Devolve '' quando o produto não tem capa. */
  capaUrl(p, largura){
    if (!p.capa) return '';

    let url = p.capa;
    /* Endereço de serviço de imagem que aceita transformação no
       caminho: pede já no tamanho da tela. Capa enviada pelo
       painel vai como está — ele reduz antes de enviar. */
    if (largura && url.includes('/upload/') && url.includes('cloudinary')){
      url = url.replace('/upload/', `/upload/w_${largura},c_limit,q_auto,f_auto/`);
    }
    return `url('${this._cssSeguro(url)}')`;
  },

  /* Declaração inteira de background. Sem capa, devolve o gradiente
     da categoria — é o que faz o catálogo nunca aparecer furado. */
  capa(p, largura){
    const imagem = this.capaUrl(p, largura);
    return imagem ? `${imagem} center/cover`
                  : (CAPAS[p.categoria] || CAPAS.renda);
  },

  /* ---------------------------------------------------------
     Catálogo vindo do servidor.
     Enquanto não chega — ou se o servidor estiver fora —, o site
     usa os produtos de exemplo daqui e abre normalmente.

     Lista vazia NÃO é o mesmo que servidor fora. O banco nasceu
     com estes mesmos 10 exemplos dentro (servidor/produtos.json),
     então quando o cliente apagar todos é porque quis: fazer os
     exemplos reaparecerem seria desfazer o que ele acabou de
     fazer, com produtos que ele não tem como apagar.
     --------------------------------------------------------- */
  _remotos: null,

  definirRemoto(lista){
    this._remotos = Array.isArray(lista) ? lista : null;
  },

  usandoRemoto(){ return !!this._remotos; },

  _merge(){
    if (this._remotos) return this._remotos;
    return this._local();
  },

  /* Produtos de exemplo mais as edições feitas no navegador.
     Só entra em cena quando o servidor não respondeu. */
  _local(){
    const ler = (k, fb) => {
      try { return JSON.parse(localStorage.getItem(k) || fb); }
      catch(e){ return JSON.parse(fb); }
    };
    const extras    = ler('cqr_produtos', '[]');
    const removidos = ler('cqr_removidos', '[]');
    const editados  = ler('cqr_edicoes', '{}');

    return PRODUTOS
      .filter(p => !removidos.includes(p.id))
      .map(p => editados[p.id] ? Object.assign({}, p, editados[p.id]) : p)
      .concat(extras);
  }
};

/* ---------------------------------------------------------
   Formatação
   --------------------------------------------------------- */
const fmtBRL = v => Number(v || 0).toLocaleString('pt-BR', {
  style: 'currency', currency: 'BRL', minimumFractionDigits: 2
});

/* Link do WhatsApp com mensagem pronta */
function linkWhats(texto){
  const msg = encodeURIComponent(texto || CONTATO.mensagem);
  /* O numero vem do painel e entra cru numa URL. Numero de telefone
     so tem digito; o resto, se aparecer, e engano ou coisa pior. */
  const numero = String(CONTATO.whatsapp || '').replace(/\D/g, '');
  return `https://wa.me/${numero}?text=${msg}`;
}

/* ---------------------------------------------------------
   Depoimentos
   --------------------------------------------------------- */
const DEPOIMENTOS = [
  {
    nome: 'Juliana Prado', papel: 'Comprou Renda Extra do Zero', nota: 5,
    texto: 'Paguei menos de trinta reais sem esperar muita coisa, confesso. Em 47 dias fiz minha primeira venda no digital. É direto ao ponto e não promete milagre nenhum.',
    cor: 'linear-gradient(135deg,#19E05C,#0FB847)'
  },
  {
    nome: 'Marcos Vinícius', papel: 'Comprou Guia Contra Golpes', nota: 5,
    texto: 'Comprei pensando na minha mãe. Duas semanas depois ela recebeu exatamente o golpe da página 12 e reconheceu na hora. Só isso já valeu os doze reais.',
    cor: 'linear-gradient(135deg,#FFC531,#F0A400)'
  },
  {
    nome: 'Patrícia Neves', papel: 'Comprou Emagrecer Sem Dieta Maluca', nota: 5,
    texto: 'Perdi 11 kg em 4 meses sem passar fome e sem academia. O que mais gostei é que não tem dieta proibindo tudo — tem método que cabe na rotina com dois filhos.',
    cor: 'linear-gradient(135deg,#19E05C,#FFC531)'
  }
];

/* ---------------------------------------------------------
   FAQ
   Nenhuma resposta menciona e-mail de contato: o atendimento
   é por WhatsApp.
   --------------------------------------------------------- */
const FAQS = [
  {
    q: 'Como recebo o produto depois de comprar?',
    a: 'O pagamento é processado pela Cakto, plataforma de pagamento de produtos digitais. Assim que a compra é aprovada, a própria Cakto envia o acesso — em geral em menos de 5 minutos no cartão ou no Pix, e em até 2 dias úteis no boleto.'
  },
  {
    q: 'Por quanto tempo tenho acesso?',
    a: 'O acesso é vitalício. Você compra uma vez e acessa quantas vezes quiser, pelo tempo que quiser, incluindo as atualizações futuras do material sem pagar nada a mais.'
  },
  {
    q: 'E se eu não gostar? Tem garantia?',
    a: 'Sim. Todos os produtos têm 7 dias de garantia incondicional, previstos no Código de Defesa do Consumidor. Se dentro desse prazo você achar que não é para você, pede o reembolso direto na Cakto e recebe 100% do valor de volta, sem precisar justificar.'
  },
  {
    q: 'Por que os preços são tão baixos?',
    a: 'Porque é exatamente essa a proposta. Trabalhamos com infoprodutos de baixo custo para que o preço não seja o motivo de alguém deixar de aprender algo útil. Conteúdo prático, direto, sem enrolação e sem custar o valor de uma prestação.'
  },
  {
    q: 'Quais são as formas de pagamento?',
    a: 'Cartão de crédito com parcelamento, Pix e boleto bancário. Tudo no checkout da Cakto. Como os valores são baixos, na maioria dos produtos o Pix sai na hora e o acesso é imediato.'
  },
  {
    q: 'Preciso ter experiência ou conhecimento prévio?',
    a: 'Na maior parte dos produtos, não. Cada página informa o nível — quase tudo é feito para iniciante absoluto e começa explicando o básico antes de avançar.'
  },
  {
    q: 'O pagamento é seguro?',
    a: 'É. Nós não processamos nem armazenamos dados de cartão: toda a transação acontece dentro da Cakto, que é certificada e usa criptografia de ponta a ponta. Seus dados financeiros nunca passam por este site.'
  },
  {
    q: 'Qual a diferença entre curso, e-book e guia?',
    a: 'Curso é conteúdo em vídeo, dividido em aulas, que você assiste no computador ou no celular. E-book e guia são materiais em PDF, para ler na tela ou imprimir. A página de cada produto mostra qual é o formato, a quantidade de aulas ou de páginas e o tempo estimado.'
  },
  {
    q: 'Tenho uma dúvida antes de comprar. Como falo com vocês?',
    a: 'Pelo WhatsApp. É o nosso canal de atendimento e a gente responde em horário comercial. O botão verde fica sempre visível no canto da tela.'
  }
];
