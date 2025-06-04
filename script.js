 // Corações caindo
    const coracoesContainer = document.querySelector('.coracoes');
    setInterval(() => {
      const coracao = document.createElement('div');
      coracao.classList.add('coracao');
      coracao.style.left = Math.random() * 100 + 'vw';
      coracao.style.fontSize = Math.random() * 20 + 10 + 'px';
      coracao.textContent = '❤️';
      coracoesContainer.appendChild(coracao);
      setTimeout(() => coracao.remove(), 6000);
    }, 300);

    // Mostrar mensagem secreta
    function mostrarMensagemSecreta() {
      const mensagem = document.getElementById('mensagemOculta');
      mensagem.style.display = 'block';
    }

    
    

    const textoCarta = `Minha querida,

Desde o momento em que nossos caminhos se cruzaram, minha vida ganhou um brilho que eu nunca havia imaginado. Você é meu sorriso nos dias difíceis, minha calma nas tempestades e a alegria constante que faz o meu coração bater mais forte.

Cada instante ao seu lado é um presente precioso. Amo cada detalhe seu — seu jeito de olhar, de sorrir, de cuidar, e até as pequenas manias que só eu conheço. Com você, aprendi que o amor é mais que palavras, é carinho, cumplicidade e parceria.

Neste Dia dos Namorados, quero reafirmar meu compromisso de estar ao seu lado, apoiar seus sonhos e construir uma história linda, cheia de momentos inesquecíveis e amor verdadeiro.

Você é meu presente, minha inspiração, meu tudo. Te amo hoje, amanhã e para sempre.

Com todo meu amor,
[Bruno Igreja]`;

  const mensagemElemento = document.getElementById('mensagem');
  let indice = 0;

  function digitar() {
    if (indice < textoCarta.length) {
      mensagemElemento.textContent += textoCarta.charAt(indice);
      indice++;
      setTimeout(digitar, 50);
    }
  }

  digitar();

  // Joguinho simples: clicar em corações

   const fotos = [
    './assets/WhatsApp Image 2025-06-03 at 20.50.10 (1).jpeg',
    './assets/WhatsApp Image 2025-06-03 at 20.50.11.jpeg',
    './assets/WhatsApp Image 2025-06-03 at 20.50.12.jpeg',
    './assets/WhatsApp Image 2025-06-03 at 21.01.18 (2).jpeg',
    './assets/WhatsApp Image 2025-06-03 at 21.01.18 (3).jpeg'
  ];

  let cartas = [];
  let primeiraCarta = null;
  let segundaCarta = null;
  let bloqueio = false;
  let acertos = 0;

  const memoriaDiv = document.getElementById('memoria');

  function embaralhar(array) {
    for(let i = array.length -1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function criarCartas() {
    cartas = fotos.concat(fotos); // pares duplicados
    embaralhar(cartas);
    memoriaDiv.innerHTML = '';
    cartas.forEach((foto, index) => {
      const carta = document.createElement('div');
      carta.classList.add('carta-memoria');
      carta.style.position = 'relative';
      carta.style.width = '';
      carta.style.height = '';
      carta.style.cursor = 'pointer';
      carta.style.borderRadius = '12px';
      carta.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
      carta.style.backgroundColor = '#ffb6c1';
      carta.style.display = 'flex';
      carta.style.alignItems = 'center';
      carta.style.justifyContent = 'center';
      carta.style.userSelect = 'none';
      carta.dataset.foto = foto;

      // Frente (carta virada)
      const frente = document.createElement('div');
      frente.style.position = 'absolute';
      frente.style.width = '';
      frente.style.height = '';
      frente.style.backfaceVisibility = 'hidden';
      frente.style.borderRadius = '12px';
      frente.style.backgroundColor = '#ff69b4';
      frente.style.display = 'flex';
      frente.style.alignItems = 'center';
      frente.style.justifyContent = 'center';
      frente.style.fontSize = '2rem';
      frente.style.color = 'white';
      frente.textContent = '❤️';

      // Verso (imagem)
      const verso = document.createElement('img');
      verso.src = foto;
      verso.style.position = 'absolute';
      verso.style.width = '';
      verso.style.height = '';
      verso.style.borderRadius = '12px';
      verso.style.backfaceVisibility = 'hidden';
      verso.style.transform = 'rotateY(180deg)';
      verso.style.objectFit = 'cover';

      carta.appendChild(frente);
      carta.appendChild(verso);

      // Efeito virar carta com CSS
      carta.style.transformStyle = 'preserve-3d';
      carta.style.transition = 'transform 0.6s';

      carta.addEventListener('click', () => virarCarta(carta));

      memoriaDiv.appendChild(carta);
    });
  }

  function virarCarta(carta) {
    if(bloqueio) return;
    if(carta === primeiraCarta) return;

    carta.style.transform = 'rotateY(180deg)';

    if(!primeiraCarta) {
      primeiraCarta = carta;
      return;
    }

    segundaCarta = carta;
    bloqueio = true;

    if(primeiraCarta.dataset.foto === segundaCarta.dataset.foto) {
      acertos++;
      primeiraCarta.removeEventListener('click', () => virarCarta);
      segundaCarta.removeEventListener('click', () => virarCarta);
      resetarJogada();
      if(acertos === fotos.length) {
        setTimeout(() => alert('Parabéns! Você encontrou todos os pares do nosso amor! 💖'), 500);
      }
    } else {
      setTimeout(() => {
        primeiraCarta.style.transform = 'rotateY(0deg)';
        segundaCarta.style.transform = 'rotateY(0deg)';
        resetarJogada();
      }, 1000);
    }
  }

  function resetarJogada() {
    [primeiraCarta, segundaCarta] = [null, null];
    bloqueio = false;
  }

  function iniciarMemoria() {
    acertos = 0;
    resetarJogada();
    criarCartas();
  }

  iniciarMemoria();