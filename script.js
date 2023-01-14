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

    dataCards.sort(comparador);

    while(numCards < 4 || numCards > 14 || resto!==0){
        numCards = parseInt(prompt(`
        Com quantas cartas gostaria de jogar?\n
        Obs: min. 4 e max. 14
        `));
        resto = numCards % 2;
    }
qtdImagens = numCards/2;

let listaEmbaralhada = [];
while (i < qtdImagens) {
    listaEmbaralhada.push(dataCards[i]);
    i++;
}

listaEmbaralhada = listaEmbaralhada.concat(listaEmbaralhada);
listaEmbaralhada = listaEmbaralhada.sort(comparador);



    let cards = ``;

    for (let i = 0; i < numCards; i++){
        cards += `
        <button class="card click" onclick="virarCarta(this)">
            <div class="front">
                <img src="./assets/back.png"/>
            </div>
            <div class="back">
                <img src="${listaEmbaralhada[i]}"/>
            </div>
        </button>
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

    carta.classList.add('virar');
    //carta.classList.remove('click');
    blockSelectCard();

    

    cardsClicados.push(carta);
    cardRepeat(carta);
    

    if(cardsClicados.length === 2){

        blockClick();

        let card1 = cardsClicados[0].children[1].children[0].getAttribute('src');
        let card2 = cardsClicados[1].children[1].children[0].getAttribute('src');
        

        if (card1 !== card2) {
            desvirar();
        }
        
        if (card1 === card2) {
            cardsClicados[0].classList.remove('click');
            cardsClicados[1].classList.remove('click');
            cardsClicados = [];
            activeClick()
        }
        
    }
    verificacion()
}

function verificacion(){
    const selecionados = document.querySelectorAll('.virar').length;
    
    if (selecionados === numCards){
        setTimeout( function (){alert(`Você ganhou em ${jogadas} jogadas!`)},500);
    }
}

function desvirar(){


    setTimeout(function(){

    cardsClicados[0].classList.remove('virar');
    cardsClicados[1].classList.remove('virar');
    cardsClicados = [];
    },1000);

    activeClick();

}

function blockClick(){
    const cards = document.querySelectorAll('.click');
        cards.forEach(card => card.disabled = true);
}

function blockSelectCard(){
    const cardClick = document.querySelectorAll('.virar');
    cardClick.forEach(card => card.disabled = true);
}
function activeClick(){
    setTimeout(function(){
        const cards = document.querySelectorAll('.click');
        cards.forEach(card => card.disabled = false);
    },1500)
    
}
function cardRepeat(item){
    if(cardsClicados[0] === cardsClicados[1]){
        cardsClicados.pop();
    }
}

//TODO: Implementar o Bonus.