/* =========================================================
   COMPRA QUE RENDE — Camada de dados

   Única porta de saída do site para o servidor. O resto do
   código usa DB e Site, e não sabe que existe backend — trocar
   de backend é reescrever este arquivo, sem tocar nas páginas
   nem no painel.

   O servidor é Flask + SQLite, na mesma máquina que serve o site
   (servidor/app.py). Estar no mesmo domínio é de propósito:
   o cookie de sessão fica sendo de primeira parte, então não
   há CORS para configurar nem token circulando no JavaScript.
   ========================================================= */

const BASE = '/api';

/* Promessa que nunca resolve não lança erro, fica pendurada — e
   as páginas desenham depois do await. Sem este limite, um
   servidor lento (não fora do ar: lento) deixaria o visitante
   diante de um catálogo vazio, sem mensagem nenhuma. */
const LIMITE_MS = 8000;

/* Quanto tempo o navegador reaproveita a resposta antes de
   perguntar de novo. Uma visita que abre quatro páginas gasta
   uma consulta, não quatro.

   Meio minuto, e não mais: o sessionStorage sobrevive ao F5, então
   um cache longo faz quem acabou de editar pelo painel abrir o site
   e ver o conteúdo antigo — sem entender por que recarregar não
   adianta. Meio minuto ainda cobre a visita que clica por várias
   páginas seguidas, que é o caso que o cache existe para atender. */
const CACHE_SEGUNDOS = 30;

let sessao = null;      /* quem está logado, depois de usuarioAtual() */
let respondeu = false;  /* o servidor já deu sinal de vida nesta visita? */


/* ---------------------------------------------------------
   Conversa com o servidor

   credentials same-origin manda o cookie de sessão junto.
   AbortController é o que realmente corta a espera: sem ele
   o fetch ignora qualquer Promise.race e segue rodando.
   --------------------------------------------------------- */
async function pedir(caminho, opcoes = {}){
  const freio = new AbortController();
  const relogio = setTimeout(() => freio.abort(), LIMITE_MS);

  try {
    const r = await fetch(BASE + caminho, {
      credentials: 'same-origin',
      signal: freio.signal,
      headers: opcoes.corpo ? { 'Content-Type': 'application/json' } : undefined,
      method: opcoes.metodo || 'GET',
      body: opcoes.corpo ? JSON.stringify(opcoes.corpo) : undefined
    });

    const json = await r.json().catch(() => null);
    respondeu = true;

    if (!r.ok){
      return { ok: false, status: r.status, erro: (json && json.erro) || `Erro ${r.status}.` };
    }
    return { ok: true, dados: json };

  } catch (erro){
    const demorou = erro.name === 'AbortError';
    return {
      ok: false,
      rede: true,
      erro: demorou
        ? 'O servidor demorou demais para responder.'
        : 'Sem conexão com o servidor.'
    };
  } finally {
    clearTimeout(relogio);
  }
}


/* ---------------------------------------------------------
   Cache
   --------------------------------------------------------- */
export const Cache = {
  KEY: 'cqr_cache',

  /* O cache é por aba (sessionStorage), mas quem edita usa duas: o
     painel numa, o site na outra. Limpar só a do painel deixava a
     outra mostrando o conteúdo velho, e de fora isso parece que o
     salvar não funcionou.

     Esta marca é gravada no localStorage, que TODAS as abas do mesmo
     endereço enxergam. Qualquer cache anterior a ela é descartado.
     Só isso já resolve, sem escutar evento nem sincronizar nada. */
  MARCA: 'cqr_mudou_em',

  ler(){
    try {
      const c = JSON.parse(sessionStorage.getItem(this.KEY) || 'null');
      if (!c) return null;
      if (Date.now() - c.em > CACHE_SEGUNDOS * 1000) return null;

      const mudou = Number(localStorage.getItem(this.MARCA) || 0);
      if (mudou > c.em) return null;

      return c;
    } catch(e){ return null; }
  },

  gravar(produtos, conteudo){
    try {
      sessionStorage.setItem(this.KEY,
        JSON.stringify({ em: Date.now(), produtos, conteudo }));
    } catch(e){}
  },

  limpar(){
    try { sessionStorage.removeItem(this.KEY); } catch(e){}
    /* A marca fica para as outras abas verem. Se o localStorage
       estiver bloqueado, o cache de 30 segundos ainda vence sozinho. */
    try { localStorage.setItem(this.MARCA, String(Date.now())); } catch(e){}
  }
};


/* =========================================================
   Carrega catálogo e textos, e entrega para DB e Site.

   Se o servidor não responder, devolve sem erro e o site abre
   com os dados de exemplo de data.js.

   Mas catálogo VAZIO não é servidor fora: o banco já nasceu com
   os 10 exemplos dentro, então lista vazia quer dizer que o
   cliente apagou tudo — e o site tem que respeitar isso, senão
   ele apaga e os produtos voltam sozinhos.
   ========================================================= */
export async function iniciar(){
  const guardado = Cache.ler();
  if (guardado){
    aplicar(guardado.produtos, guardado.conteudo);
    return { remoto: true, doCache: true, produtos: guardado.produtos.length };
  }

  /* Site estático (sem servidor próprio): catálogo e textos são
     arquivos fixos em /api/. Para mudar produto, edite api/produtos.json. */
  const [rp, rc] = await Promise.all([
    pedir('/produtos.json'),
    pedir('/conteudo.json')
  ]);

  if (!rp.ok){
    console.warn('[api] catálogo não veio, usando dados locais:', rp.erro);
    return { remoto: false, motivo: rp.erro };
  }

  const produtos = rp.dados || [];
  const conteudo = (rc.ok && rc.dados) || {};

  Cache.gravar(produtos, conteudo);
  aplicar(produtos, conteudo);

  return { remoto: true, produtos: produtos.length };
}

function aplicar(produtos, conteudo){
  /* A lista passa como veio, inclusive vazia. Já o conteúdo vazio
     é o caso normal: os textos padrão estão escritos no HTML, e o
     banco só guarda o que o cliente mudou. */
  if (Array.isArray(produtos)) DB.definirRemoto(produtos);
  if (conteudo && Object.keys(conteudo).length) Site.definirRemoto(conteudo);
}


/* =========================================================
   AUTENTICAÇÃO

   A sessão é um cookie httponly: JavaScript nenhum consegue
   lê-lo, então um XSS no painel não rouba o acesso. Quem
   decide o que pode ser gravado é o servidor — o código do
   navegador é apenas sugestão.
   ========================================================= */
export async function entrar(email, senha){
  const r = await pedir('/login', { metodo: 'POST', corpo: { email, senha } });
  if (!r.ok) return { ok: false, erro: r.erro };

  sessao = { email: r.dados.email, nome: r.dados.nome };
  return { ok: true };
}

export async function sair(){
  await pedir('/logout', { metodo: 'POST' });
  sessao = null;
  Cache.limpar();
  return { ok: true };
}

/* Espera a resposta do servidor antes de decidir. admin.html
   depende disso: sem a espera, o painel piscaria a tela de
   login antes de reconhecer a sessão que já existe. */
export async function usuarioAtual(){
  const r = await pedir('/eu');
  sessao = (r.ok && r.dados) ? r.dados : null;
  return sessao;
}

/* A sessão é um cookie, e cookie não avisa quando muda.
   Consultar de minuto em minuto cobre o caso que importa: a
   sessão cair ou vencer com o painel aberto. */
export function observarLogin(aoMudar){
  const checar = async () => {
    const antes = sessao && sessao.email;
    const agora = await usuarioAtual();
    if (antes !== (agora && agora.email)) aoMudar(agora);
  };
  const t = setInterval(checar, 60000);
  return () => clearInterval(t);
}

/* Não existe envio de e-mail neste servidor, e montar isso para
   um painel de uma pessoa só não se justifica. Quem troca a
   senha é quem administra o servidor, pelo semear.py. */
export async function recuperarSenha(){
  return {
    ok: false,
    erro: 'A troca de senha é feita por quem administra o site. ' +
          'Entre em contato para redefinir.'
  };
}


/* =========================================================
   ESCRITA
   Toda gravação limpa o cache, para a tela seguinte mostrar
   o que realmente ficou gravado e não o que supomos.
   ========================================================= */
export async function salvarProduto(dados){
  const r = await pedir('/produtos', { metodo: 'POST', corpo: dados });
  if (!r.ok) return { ok: false, erro: traduzir(r) };
  Cache.limpar();
  return { ok: true, id: r.dados.id };
}

export async function excluirProduto(id){
  const r = await pedir(`/produtos/${encodeURIComponent(id)}`, { metodo: 'DELETE' });
  if (!r.ok) return { ok: false, erro: traduzir(r) };
  Cache.limpar();
  return { ok: true };
}

export async function salvarConteudo(tudo){
  const r = await pedir('/conteudo', { metodo: 'PUT', corpo: tudo });
  if (!r.ok) return { ok: false, erro: traduzir(r) };
  Cache.limpar();
  return { ok: true };
}

function traduzir(r){
  if (r.status === 401){
    return 'Sua sessão terminou. Entre de novo para salvar.';
  }
  return r.erro;
}


/* =========================================================
   Estado, para as telas saberem com o que estão falando.

   configurado é sempre true: a API faz parte do site, não é um
   serviço externo que se liga depois. Falha de rede aparece como
   erro na hora de salvar, que é mais honesto do que o painel
   fingir que gravou.
   ========================================================= */
export function situacao(){
  return {
    configurado: true,
    conectado:   respondeu,
    modoLocal:   false,
    projeto:     'servidor próprio'
  };
}
