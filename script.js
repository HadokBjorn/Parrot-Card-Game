const listCards = document.querySelector('.container-cards');
let cardsClicados = [];
let jogadas = 0;
let numCards = 0;
let par = 0;


function addCard(){
    let resto = 0;
    let i = 0;
    let qtdImagens = 0;

    let dataCards = [
        `./assets/fiestaparrot.gif`,
        `./assets/bobrossparrot.gif`,
        `./assets/explodyparrot.gif`,
        `./assets/metalparrot.gif`,
        `./assets/revertitparrot.gif`,
        `./assets/tripletsparrot.gif`,
        `./assets/unicornparrot.gif`,
    ];
// embaralhando as cartas
    dataCards.sort(comparador);

// Pedindo para o jogador a quantidade de cartas que ele quer jogar
    while(numCards < 4 || numCards > 14 || resto!==0){
        numCards = parseInt(prompt(`
        Com quantas cartas gostaria de jogar?\n
        Obs: min. 4 e max. 14
        `));
        resto = numCards % 2;
    }
qtdImagens = numCards/2;
//pegando as imagens
let listaEmbaralhada = [];
while (i < qtdImagens) {
    listaEmbaralhada.push(dataCards[i]);
    i++;
}
// embaralhando as cartas
listaEmbaralhada = listaEmbaralhada.concat(listaEmbaralhada);
listaEmbaralhada = listaEmbaralhada.sort(comparador);

dataCards = dataCards.sort(comparador);

//adicionando as cartas no html

    let cards = ``;

    for (let i = 0; i < numCards; i++){
        cards += `
        <li class="card" onclick="virarCarta(this)">
            <div class="front">
                <img src="./assets/back.png"/>
            </div>
            <div class="back">
                <img src="${listaEmbaralhada[i]}"/>
            </div>
        </li>
        `
    }
    listCards.innerHTML += cards;
}
addCard();

function comparador() { 
	return Math.random() - 0.5; 
}

function virarCarta(carta){

    jogadas++;
    console.log(jogadas);

    carta.classList.add('virar');

    cardsClicados.push(carta);

    if(cardsClicados.length === 2){
        let card1 = cardsClicados[0].children[1].children[0].getAttribute('src');
        let card2 = cardsClicados[1].children[1].children[0].getAttribute('src');
        if (card1 !== card2) {
            desvirar();
        }
        if (card1 === card2) {
            cardsClicados = [];
        }
        
    }
    verificacion()
}

function verificacion(){
    const selecionados = document.querySelectorAll('.virar').length;
    
    if (selecionados === numCards){
        setTimeout( function (){alert(`Você ganhou em ${jogadas} jogadas!`)},1000);
    }
}

function desvirar(){

    setTimeout(function(){
    cardsClicados[0].classList.remove('virar');
    cardsClicados[1].classList.remove('virar');
    cardsClicados = [];
    },1000);

}