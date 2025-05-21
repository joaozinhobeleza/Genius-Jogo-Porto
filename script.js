const cores = ['verde', 'vermelho', 'amarelo', 'azul'];
let sequenciaJogo = [];
let sequenciaJogador = [];
let nivel = 0;
let podeClicar = false;

const nivelTexto = document.getElementById('nivel');
const btnIniciar = document.getElementById('btn-iniciar');

btnIniciar.addEventListener('click', iniciarJogo);
document.querySelectorAll('.btn-cor').forEach(btn =>
  btn.addEventListener('click', () => verificarClique(btn.id))
);


function iniciarJogo() {
  sequenciaJogo = [];
  nivel = 0;
  proximaRodada();
}


function gerarProximaCor() {
  const cor = cores[Math.floor(Math.random() * 4)];
  sequenciaJogo.push(cor);
}


function mostrarSequencia() {
  podeClicar = false;
  let i = 0;
  sequenciaJogador = [];

  const intervalo = setInterval(() => {
    const cor = sequenciaJogo[i];
    animarBotao(cor);
    tocarSom(cor);
    i++;
    if (i >= sequenciaJogo.length) {
      clearInterval(intervalo);
      podeClicar = true;
    }
  }, 600);
}


function verificarClique(cor) {
  if (!podeClicar) return;

  sequenciaJogador.push(cor);
  animarBotao(cor);
  tocarSom(cor);

  const indice = sequenciaJogador.length - 1;
  if (cor !== sequenciaJogo[indice]) {
    tocarSom('erro');
    nivelTexto.textContent = 'Errou! Reiniciando...';
    podeClicar = false;
    setTimeout(iniciarJogo, 2000);
    return;
  }

  if (sequenciaJogador.length === sequenciaJogo.length) {
    setTimeout(proximaRodada, 1000);
  }
}

function proximaRodada() {
  nivel++;
  nivelTexto.textContent = `Rodada ${nivel}`;
  gerarProximaCor();
  mostrarSequencia();
}

function animarBotao(cor) {
  const btn = document.getElementById(cor);
  btn.classList.add('ativa');
  setTimeout(() => btn.classList.remove('ativa'), 300);
}

function tocarSom(cor) {
  const audio = new Audio(`sons/${cor}.mp3`);
  audio.play();
}
