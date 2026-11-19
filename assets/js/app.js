/* =========================================================
   COMPRA QUE RENDE — Script principal
   Efeitos, componentes compartilhados e login do administrador.
   ========================================================= */

/* ---------------------------------------------------------
   Atalhos
   --------------------------------------------------------- */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const on = (el, ev, fn, opt) => el && el.addEventListener(ev, fn, opt);

/* =========================================================
   1. PRELOADER
   ========================================================= */
window.addEventListener('load', () => {
  const pre = $('.preloader');
  if (pre) setTimeout(() => pre.classList.add('is-done'), 280);
});

/* =========================================================
   2. HEADER — sombra ao rolar + menu mobile
   ========================================================= */
function initHeader(){
  const header = $('.header');
  const burger = $('.burger');
  const menu   = $('.mobile-menu');

  if (header){
    const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (burger && menu){
    on(burger, 'click', () => {
      const open = menu.classList.toggle('is-open');
      burger.innerHTML = open ? '&times;' : '&#9776;';
      document.body.style.overflow = open ? 'hidden' : '';
    });
    $$('a', menu).forEach(a => on(a, 'click', () => {
      menu.classList.remove('is-open');
      burger.innerHTML = '&#9776;';
      document.body.style.overflow = '';
    }));
  }
}

/* =========================================================
   2b. LOGO REAL
   ---------------------------------------------------------
   Enquanto não existe o arquivo do cliente, o site usa o SVG
   desenhado à mão que está no HTML. Assim que você salvar
   o PNG em assets/img/logo-mark.png, esta função troca
   sozinho em TODAS as páginas — sem editar HTML nenhum.

   Arquivos esperados (veja assets/img/LEIA-ME.md):
     logo-mark.png   só o símbolo do carrinho (quadrado)
     logo-full.png   a marca completa, para o rodapé
   ========================================================= */
function initLogo(){
  const testar = (caminho) => new Promise(resolve => {
    const img = new Image();
    img.onload  = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = caminho;
  });

  /* Símbolo do carrinho — cabeçalho e rodapé */
  testar('assets/img/logo-mark.png').then(existe => {
    if (!existe) return;

    $$('.logo').forEach(logo => {
      const svg = $('.logo__mark', logo);
      if (!svg) return;

      const img = document.createElement('img');
      img.className = 'logo__mark logo__mark--img';
      img.src = 'assets/img/logo-mark.png';
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');

      svg.replaceWith(img);
    });
  });

  /* Marca completa — onde houver um elemento [data-logo-full] */
  const alvos = $$('[data-logo-full]');
  if (!alvos.length) return;

  testar('assets/img/logo-full.png').then(existe => {
    if (!existe) return;
    alvos.forEach(el => {
      el.innerHTML = '';
      el.classList.add('has-logo');
      const img = document.createElement('img');
      img.src = 'assets/img/logo-full.png';
      img.alt = 'Compra Que Rende — cursos que geram resultados';
      el.appendChild(img);
    });
  });
}

/* =========================================================
   3. BARRA DE PROGRESSO DE SCROLL
   ========================================================= */
function initScrollProgress(){
  const bar = $('.scroll-progress');
  if (!bar) return;
  const update = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

/* =========================================================
   4. REVEAL ON SCROLL
   ========================================================= */
function initReveal(){
  const alvos = $$('.reveal, .reveal-left, .reveal-right, .reveal-zoom, .reveal-blur, .underline-swipe');
  if (!alvos.length) return;

  if (!('IntersectionObserver' in window)){
    alvos.forEach(el => el.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      setTimeout(() => el.classList.add('is-in'), Number(el.dataset.delay || 0));
      io.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  alvos.forEach(el => io.observe(el));
}

/* =========================================================
   5. CONTADORES ANIMADOS
   ========================================================= */
function initCounters(){
  const nums = $$('[data-count]');
  if (!nums.length || !('IntersectionObserver' in window)){
    nums.forEach(n => n.textContent = n.dataset.count);
    return;
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el      = e.target;
      const alvo    = parseFloat(el.dataset.count);
      const sufixo  = el.dataset.suffix || '';
      const prefixo = el.dataset.prefix || '';
      const dec     = Number(el.dataset.decimals || 0);
      const dur     = 1500;
      const ini     = performance.now();

      const tick = (agora) => {
        const p = Math.min((agora - ini) / dur, 1);
        const val = alvo * (1 - Math.pow(1 - p, 3));   // easeOutCubic
        el.textContent = prefixo +
          val.toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec }) +
          sufixo;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  nums.forEach(n => io.observe(n));
}

/* =========================================================
   6. TILT 3D + SPOTLIGHT
   ========================================================= */
function initTilt(){
  if (window.matchMedia('(max-width: 768px)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  $$('.tilt').forEach(el => {
    /* Ângulo pequeno de propósito: acima de ~3° o texto do card
       começa a ficar difícil de ler enquanto o mouse se move. */
    const MAX = Number(el.dataset.tilt || 2.5);

    on(el, 'mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.transform =
        `perspective(1100px) rotateX(${(0.5 - y) * MAX}deg) rotateY(${(x - 0.5) * MAX}deg) translateY(-4px)`;
    });

    on(el, 'mouseleave', () => { el.style.transform = ''; });
  });

  $$('.spotlight').forEach(el => {
    on(el, 'mousemove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });
}

/* =========================================================
   7. RIPPLE nos botões
   ========================================================= */
function initRipple(){
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const size = Math.max(r.width, r.height);
    const span = document.createElement('span');
    span.className = 'ripple';
    span.style.width = span.style.height = size + 'px';
    span.style.left = (e.clientX - r.left - size / 2) + 'px';
    span.style.top  = (e.clientY - r.top  - size / 2) + 'px';
    btn.appendChild(span);
    setTimeout(() => span.remove(), 620);
  });
}

/* =========================================================
   8. FAQ (acordeão)
   ========================================================= */
/* Um ouvinte no documento, e nao um por botao.

   O acordeao e montado por JavaScript depois que o catalogo chega, e
   por isso cada pagina chamava initFaq() de novo no fim do desenho —
   mas o boot deste arquivo ja tinha chamado uma vez. Quando as duas
   chamadas encontravam a lista montada, o mesmo botao ficava com DOIS
   ouvintes: o primeiro abria, o segundo via a classe recem-posta e
   fechava. Clicar nao fazia nada.

   Nao acontecia sempre. A ordem depende de a resposta da API vir do
   cache de 30 segundos (volta na hora, antes do DOMContentLoaded, e
   quebra) ou da rede (demora, o boot passa com a lista vazia, e
   funciona) — dai abrir, recarregar e ver o bug ir e voltar sozinho.

   Delegacao resolve os dois lados: alcanca item que ainda nem existe,
   entao ninguem precisa religar nada depois de desenhar, e o guarda
   abaixo garante um ouvinte so por mais que chamem. */
function initFaq(){
  if (initFaq.ligado) return;
  initFaq.ligado = true;

  on(document, 'click', (e) => {
    /* closest so existe em Element, e o alvo de um clique nem sempre
       e um - em clique sintetico pode vir o proprio documento. */
    const btn = e.target.closest && e.target.closest('.faq__q');
    if (!btn) return;

    const item = btn.closest('.faq__item');
    const ans  = item && $('.faq__a', item);
    if (!item || !ans) return;

    const aberto = item.classList.contains('is-open');

    $$('.faq__item.is-open').forEach(other => {
      other.classList.remove('is-open');
      const a = $('.faq__a', other);
      if (a) a.style.maxHeight = null;
    });

    if (!aberto){
      item.classList.add('is-open');
      ans.style.maxHeight = ans.scrollHeight + 'px';
    }
  });
}

/* =========================================================
   9. EFEITO MÁQUINA DE ESCREVER
   ========================================================= */
function initTypewriter(){
  const el = $('[data-typewriter]');
  if (!el) return;

  let palavras;
  try { palavras = JSON.parse(el.dataset.typewriter); }
  catch(e){ return; }
  if (!Array.isArray(palavras) || !palavras.length) return;

  /* ---------------------------------------------------------
     O texto muda de largura a cada letra. Se ele ficar no fluxo
     normal, a linha do título rewrapa e empurra a página inteira
     para cima e para baixo.

     Solução: um "fantasma" invisível com a palavra MAIS LARGA
     segura o espaço, e o texto que anima fica sobreposto a ele,
     fora do fluxo. Assim a caixa nunca muda de tamanho.
     --------------------------------------------------------- */
  el.classList.add('tw');
  el.innerHTML =
    '<span class="tw__ghost" aria-hidden="true"></span>' +
    '<span class="tw__live"><span class="tw__txt"></span><b class="tw__caret"></b></span>';

  const ghost = $('.tw__ghost', el);
  const live  = $('.tw__txt', el);

  /* A classe .grad-text pinta o texto com background-clip:text.
     Isso só funciona no elemento que CONTÉM o texto — e o texto
     agora está num filho. Então a classe desce junto com ele,
     senão o filho herda color:transparent e some da tela.

     O cursor fica FORA desse elemento de propósito: background-clip
     recorta os filhos junto com o texto, e o cursor sumiria também. */
  if (el.classList.contains('grad-text')){
    el.classList.remove('grad-text');
    live.classList.add('grad-text');
  }

  /* Mede de verdade em vez de chutar pelo nº de caracteres —
     "muda a rotina" tem menos letras que "vira renda extra"
     mas pode renderizar mais largo dependendo da fonte. */
  function reservarEspaco(){
    let maisLarga = palavras[0], maior = 0;
    palavras.forEach(p => {
      ghost.textContent = p;
      const w = ghost.offsetWidth;
      if (w > maior){ maior = w; maisLarga = p; }
    });
    ghost.textContent = maisLarga;
  }

  reservarEspaco();

  /* A fonte Sora chega depois do primeiro paint e muda as larguras */
  if (document.fonts && document.fonts.ready){
    document.fonts.ready.then(reservarEspaco);
  }

  /* Se a tela mudar de tamanho, remede */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(reservarEspaco, 150);
  });

  /* Quem prefere menos movimento vê só a primeira palavra */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    live.textContent = palavras[0];
    return;
  }

  let iP = 0, iC = 0, apagando = false;

  const loop = () => {
    const atual = palavras[iP];
    live.textContent = atual.slice(0, iC);

    if (!apagando && iC < atual.length){ iC++; setTimeout(loop, 70); }
    else if (!apagando){ apagando = true; setTimeout(loop, 1800); }
    else if (iC > 0){ iC--; setTimeout(loop, 35); }
    else { apagando = false; iP = (iP + 1) % palavras.length; setTimeout(loop, 220); }
  };
  loop();
}

/* =========================================================
   10. CONTADOR REGRESSIVO — só com data REAL
   ---------------------------------------------------------
   O contador exige uma data final de verdade em
   data-until="2026-10-31T23:59". Sem data, ele não aparece.

   Nada de timer que reinicia sozinho a cada visita: prazo que
   não existe é desconto que nunca existiu, e isso é publicidade
   enganosa pelo Código de Defesa do Consumidor.
   ========================================================= */
function initCountdown(){
  $$('[data-until]').forEach(box => {
    const fim = new Date(box.dataset.until).getTime();

    if (!fim || isNaN(fim) || fim <= Date.now()){
      box.hidden = true;
      const aviso = box.closest('[data-oferta]');
      if (aviso) aviso.hidden = true;
      return;
    }

    const campos = {
      d: $('[data-cd="d"]', box),
      h: $('[data-cd="h"]', box),
      m: $('[data-cd="m"]', box),
      s: $('[data-cd="s"]', box)
    };
    const pad = n => String(Math.max(0, n)).padStart(2, '0');

    const tick = () => {
      const resta = fim - Date.now();
      if (resta <= 0){
        box.hidden = true;
        const aviso = box.closest('[data-oferta]');
        if (aviso) aviso.hidden = true;
        clearInterval(timer);
        return;
      }
      const s = Math.floor(resta / 1000);
      if (campos.d) campos.d.textContent = pad(Math.floor(s / 86400));
      if (campos.h) campos.h.textContent = pad(Math.floor((s % 86400) / 3600));
      if (campos.m) campos.m.textContent = pad(Math.floor((s % 3600) / 60));
      if (campos.s) campos.s.textContent = pad(s % 60);
    };

    tick();
    const timer = setInterval(tick, 1000);
  });
}

/* =========================================================
   11. BOTÃO FLUTUANTE DE WHATSAPP
   ---------------------------------------------------------
   O WhatsApp é o único canal de atendimento do site. Não há
   e-mail de contato em lugar nenhum, de propósito.
   ========================================================= */
function initWhatsApp(){
  if ($('.wpp-float')) return;
  if (typeof CONTATO === 'undefined') return;

  const a = document.createElement('a');
  a.className = 'wpp-float';
  a.href = linkWhats();
  a.target = '_blank';
  a.rel = 'noopener';
  a.setAttribute('aria-label', 'Falar no WhatsApp');
  a.innerHTML = `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.4L3 29l6.8-1.8c1.9 1 4 1.6 6.2 1.6 7.2 0 13-5.8 13-13S23.2 3 16 3zm0 23.6c-2 0-3.9-.5-5.6-1.5l-.4-.2-4 1.1 1.1-3.9-.3-.4c-1.1-1.7-1.6-3.7-1.6-5.7C5.2 10 10 5.2 16 5.2S26.8 10 26.8 16 22 26.6 16 26.6z"/>
      <path d="M22 19c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.4c.2.2 2.4 3.7 5.8 5.1 2.9 1.2 3.4 1 4.1.9.7-.1 2.2-.9 2.5-1.7.3-.9.3-1.6.2-1.7-.1-.2-.3-.3-.6-.4z"/>
    </svg>
    <span class="wpp-float__txt">Falar no WhatsApp</span>`;

  document.body.appendChild(a);
}

/* =========================================================
   12. TOAST
   ========================================================= */
function toast(msg){
  let t = $('.toast');
  if (!t){
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  requestAnimationFrame(() => t.classList.add('is-show'));
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('is-show'), 3200);
}

/* =========================================================
   13. CARD DE PRODUTO (reutilizado em várias páginas)
   ========================================================= */
function cardProduto(p, i = 0){
  const badgeCls = p.badge === 'novo' ? 'card__badge--new'
                 : (p.badge ? 'card__badge--hot' : '');
  const badge = p.badge ? `<span class="card__badge ${badgeCls}">${esc(p.badge)}</span>` : '';
  const de    = p.precoDe ? `<span class="price__old">${fmtBRL(p.precoDe)}</span>` : '';
  const off   = p.precoDe ? Math.round((1 - p.preco / p.precoDe) * 100) : 0;

  return `
  <article class="card tilt spotlight reveal" data-delay="${i * 70}">
    <div class="card__media" style="background:${DB.capa(p, 640)}">
      ${badge}
      <span class="card__tipo">${esc(DB.iconeTipo(p.tipo))} ${esc(DB.nomeTipo(p.tipo))}</span>
      ${p.capa ? '' : `<span>${esc(p.titulo)}</span>`}
    </div>
    <div class="card__body">
      <div class="card__cat">${esc(DB.iconeCategoria(p.categoria))} ${esc(DB.nomeCategoria(p.categoria))}</div>
      <h3 class="card__title">${esc(p.titulo)}</h3>
      <p class="card__desc">${esc(p.descricaoCurta)}</p>
      <div class="card__meta">
        ${p.nota ? `<span class="gold-text">★ ${esc(p.nota)}</span>` : ''}
        ${DB.metaDe(p).map(m => `<span>${esc(m)}</span>`).join('')}
      </div>
      <div class="card__foot">
        <div class="price">
          ${de}
          <span class="price__now">${fmtBRL(p.preco)}</span>
          ${off ? `<small class="green-text">${off}% de desconto</small>` : ''}
        </div>
        <a class="btn btn--buy btn--sm" href="produto.html?p=${encodeURIComponent(p.slug || '')}">Ver</a>
      </div>
    </div>
  </article>`;
}

/* =========================================================
   14. SESSÃO NO NAVEGADOR
   ---------------------------------------------------------
   Nada aqui decide acesso a coisa nenhuma. Quem diz se há
   alguém logado é o servidor, e só ele — ver exige_admin() em
   servidor/app.py. Este arquivo é público, e login conferido
   no navegador não protege nada.

   O que ficou não decide acesso a nada: apaga o resto de sessão
   antiga ao sair, e monta as iniciais de um nome para o avatar.
   ========================================================= */
const Auth = {
  KEY: 'cqr_sessao',

  sair(){
    try { localStorage.removeItem(this.KEY); } catch(e){}
    location.href = 'index.html';
  },

  iniciais(nome){
    return String(nome || '?').trim().split(/\s+/).slice(0, 2)
      .map(w => w[0]).join('').toUpperCase();
  }
};

/* =========================================================
   15. RASTREIO DE CLIQUE NO BOTÃO DE COMPRA
   ---------------------------------------------------------
   Acrescenta ?src= no link da Cakto. No painel da Cakto
   você filtra por SRC e vê quanto cada origem vendeu.
   ========================================================= */
function linkHotmart(produto, origem){
  const base = produto.linkHotmart || '#';
  if (base === '#' || base.includes('SEU-CODIGO-AQUI')) return base;
  const sep = base.includes('?') ? '&' : '?';
  return `${base}${sep}src=site-${origem || 'geral'}`;
}

function irParaHotmart(produto, origem){
  const url = linkHotmart(produto, origem);
  if (url === '#' || url.includes('SEU-CODIGO-AQUI')){
    toast('Link da Cakto ainda não configurado para este produto.');
    return;
  }
  /* Se instalar Pixel do Meta ou Google Ads, dispare o evento aqui:
     if (window.fbq)  fbq('track', 'InitiateCheckout', { value: produto.preco, currency: 'BRL' });
     if (window.gtag) gtag('event', 'begin_checkout',  { value: produto.preco, currency: 'BRL' }); */
  window.open(url, '_blank', 'noopener');
}

/* =========================================================
   16. BOOT
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  /* Conteúdo editado no painel entra antes de tudo, para que os
     efeitos já trabalhem em cima do texto definitivo. */
  if (typeof Site !== 'undefined'){
    Object.assign(CONTATO, contatoAtual());
    Site.aplicar();
  }

  initHeader();
  initLogo();
  initScrollProgress();
  initFaq();
  initRipple();
  initTypewriter();
  initCountdown();
  initWhatsApp();
  initReveal();
  initTilt();
  initCounters();
});
