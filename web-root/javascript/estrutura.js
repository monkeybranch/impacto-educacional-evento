/*
    Criação: Slider Convite by MonkeyBranch.dev
    Data: Primeiro semestre de 2021
    Conteudo: Arquivo JavaScript
*/
    
// Função responsável por criar e controlar slider
function executarSlider() {
    let lContador = 0;
    let lPermiteTroca = true;
    let lPosicaoX1 = 0;
    let lPosicaoX2 = 0;
    let lPosicaoInicial;
    let lPosicaoFinal;
    let lMovimentoPXTrocaSlide = 50;

    let lDIVSlider = document.getElementById('DIVSlider');
    let lDIVSlides = document.getElementById('DIVSlides');

    let lSPANSlides = DIVSlides.getElementsByClassName('SPANSlide');
    let lQuantidadeSlides = lSPANSlides.length;
    let lLargauraSlide = DIVSlides.getElementsByClassName('SPANSlide')[0].offsetWidth;
    
    let lPrimeiroSlide = lSPANSlides[0];
    let lUltimoSlide = lSPANSlides[lQuantidadeSlides - 1];
    let lPrimeiroSlideClone = lPrimeiroSlide.cloneNode(true);
    let lUltimoSlideClone = lUltimoSlide.cloneNode(true);
  
    // Clona primeiro e ultimo slide
    lDIVSlides.appendChild(lPrimeiroSlideClone);
    lDIVSlides.insertBefore(lUltimoSlideClone, lPrimeiroSlide);
    lDIVSlider.classList.add('loaded');
  
    // Eventos de mouse
    lDIVSlides.onmousedown = iniciarMovimento;
    // Eventos touch
    lDIVSlides.addEventListener('touchstart', iniciarMovimento);
    lDIVSlides.addEventListener('touchend', finalizarMovimento);
    lDIVSlides.addEventListener('touchmove', executarMovimento);
    // Verifica contador ao final da transição
    DIVSlides.addEventListener('transitionend', verificaContador);

    // Inicia arrastar do slide
    function iniciarMovimento(pEvento) {
        pEvento = pEvento || window.event;
        pEvento.preventDefault();
        lPosicaoInicial = lDIVSlides.offsetLeft;

        if (pEvento.type == 'touchstart') {
            lPosicaoX1 = pEvento.touches[0].clientX;
        } else {
            lPosicaoX1 = pEvento.clientX;
            document.onmouseup = finalizarMovimento;
            document.onmousemove = executarMovimento;
        }
    }

    // Executa o movimento de arrastar
    function executarMovimento(pEvento) {
        pEvento = pEvento || window.event;

        if (pEvento.type == 'touchmove') {
            lPosicaoX2 = lPosicaoX1 - pEvento.touches[0].clientX;
            lPosicaoX1 = pEvento.touches[0].clientX;
        } else {
            lPosicaoX2 = lPosicaoX1 - pEvento.clientX;
            lPosicaoX1 = pEvento.clientX;
        }

        lDIVSlides.style.left = (lDIVSlides.offsetLeft - lPosicaoX2) + "px";
    }

    // Finaliza o movimento de arrastar
    function finalizarMovimento() {
        lPosicaoFinal = lDIVSlides.offsetLeft;

        if (lPosicaoFinal - lPosicaoInicial < -lMovimentoPXTrocaSlide) {
            trocaSlide(1);
        } else if (lPosicaoFinal - lPosicaoInicial > lMovimentoPXTrocaSlide) {
            trocaSlide(-1);
        } else {
            lDIVSlides.style.left = (lPosicaoInicial) + "px";
        }

        // Remove eventos do mouse
        document.onmouseup = null;
        document.onmousemove = null;
    }

    // Função que executa efeito de troca do slide
    function trocaSlide(pDirecao) {
        // Adiciona efeito de transição do slide
        lDIVSlides.classList.add('troca');

        // Verifica se esta liberada a troca de slide
        if (lPermiteTroca) {
           if (pDirecao == 1) {
                lDIVSlides.style.left = (lPosicaoInicial - lLargauraSlide) + "px";
                lContador++;      
            } else if (pDirecao == -1) {
                lDIVSlides.style.left = (lPosicaoInicial + lLargauraSlide) + "px";
                lContador--;      
            }
        };

        // Bloqueia troca de slide até verificar contador
        lPermiteTroca = false;
    }

    // Função que verifica contador a cada término de transição
    function verificaContador() {
        // Remove efeito de transição do slide
        lDIVSlides.classList.remove('troca');

        if (lContador == -1) {
            lDIVSlides.style.left = -(lQuantidadeSlides * lLargauraSlide) + "px";
            lContador = lQuantidadeSlides - 1;
        }

        if (lContador == lQuantidadeSlides) {
            lDIVSlides.style.left = -(1 * lLargauraSlide) + "px";
            lContador = 0;
        }

        // Libera troca de slide
        lPermiteTroca = true;
    }
}

// Inicia função do slider
executarSlider();