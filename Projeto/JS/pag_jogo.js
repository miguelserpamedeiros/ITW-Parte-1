function compareImg(class_img1,class_img2,id_img1,id_img2){
    return class_img1 == class_img2 && id_img1 != id_img2
}

const class1= document.getElementsByClassName('par1');
const class2 = document.getElementsByClassName('par2');
const id1 = document.getElementById('img11');
const id2 = document.getElementById('img7');


if (compareImg(class1,class2,id1,id2)) {
    console.log('As imagens são iguais.');
} else {
    console.log('As imagens são diferentes.');
}


const BOTAO_INICIA_JOGO = "start";

const BOTAO_CANCELAR_JOGO = 'cancel';

const SPAN_TEMPO_JOGO ="spanTempoJogo";

let jogo = {
    inicio: null,
    tentativas: null
  };

let temporizadorTempoJogo = 0;

function defineEventListenersParaElementosHTML() {
  
    document.getElementById(BOTAO_INICIA_JOGO).
    addEventListener("click", iniciaJogo);

    document.getElementById(BOTAO_CANCELAR_JOGO).
    addEventListener("click", cancelaJogo)
  }


function iniciaJogo() {
    jogo.inicio = Math.floor(Date.now() / 1000);
    temporizadorTempoJogo = setInterval(mostraTempoJogo);
  
  }

function mostraTempoJogo(){
    let tempo_at = Math.floor(Date.now() / 1000) - jogo.inicio;
    document.getElementById(SPAN_TEMPO_JOGO).innerHTML = tempo_at;
}
function principal() {

    defineEventListenersParaElementosHTML();
  }

function cancelaJogo() {
    clearInterval(temporizadorTempoJogo);
    document.getElementById(SPAN_TEMPO_JOGO).innerHTML = 0;
  }


window.addEventListener("load", principal);
