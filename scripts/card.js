const IdGenerator = (function () {
  let id = 0;
  return {
    current: () => id,
    next: () => id++
  };
})();

let cardSelectedColor;
const cards = [
  {id: IdGenerator.next(), title: "test1", description: "two hours", 'data-color':'green', createdAt: new Date('2021-08-20'), trashed: false,},
  {id: IdGenerator.next(), title: "test2", description: "two hours", 'data-color':'green', createdAt: new Date('2021-07-20'), trashed: false,},
  {id: IdGenerator.next(), title: "test3", description: "two hours", 'data-color':'blue',  createdAt: new Date('2021-09-12'), trashed: true,},
  {id: IdGenerator.next(), title: "test4", description: "three hours", 'data-color':'purple',  createdAt: new Date('1994-12-02'), trashed: false,},
  {id: IdGenerator.next(), title: "test5", description: "four hours", 'data-color':'pink',  createdAt: new Date('2001-11-01'), trashed: true}
];

const form = document.querySelector('.note-form');
const palette_colors = document.querySelector('.colors-palette');
form.addEventListener('submit', pushCard);

const formCard = document.querySelector('.card.card--form.background--white')

const colorOptionListener = function(){
  const colorOptions = document.querySelectorAll('#colorOption');
  colorOptions.forEach(color => color.addEventListener('click', displayColors));
}

const colorize = document.querySelector('.colorize')

function displayColors(e){
  const palette = document.createElement('div')
  palette.className = "colors-palette background--white"

  palette.innerHTML = `<div class="color-palette background--white border-grey"></div><div class="color-palette background--red"></div><div class="color-palette background--orange"></div><div class="color-palette background--yellow"></div><div class="color-palette background--green"></div><div class="color-palette background--cyan"></div><div class="color-palette background--light-blue"></div><div class="color-palette background--blue"></div><div class="color-palette background--purple"></div><div class="color-palette background--pink"></div>`

  const baseNode = e.target

  if(!document.querySelector('.colors-palette.background--white')){
    baseNode.before(palette);
  }

  palette.addEventListener('click', (e) => selectColor(e,palette))
}

function selectColor(e, palette){
  const type = e.target.closest('.card').dataset.type
  if(type !== 'form'){
    const currentCard = e.target.closest('.card')
    currentCard.className = "card " + e.target.className.split(' ')[1];
  }

  else{
    const selectedColor = e.target.className.split(' ')[1].split('--')[1]
    cardSelectedColor = selectedColor;
  }
  palette.remove();
}

const deleteListener = function(){
  const softDeleteButtonList = document.querySelectorAll('#softDelete')
  softDeleteButtonList.forEach(button => button.addEventListener('click', deleteCard))
}

function showCards(){

  let currentCards = cards.filter(obj => obj.trashed === false);
  if (currentCards.length>0){
  let newestCards = currentCards.sort((a,b)=> b.createdAt - a.createdAt);
  return '<div class = "main--content--cards">' + newestCards.map(card => `<div class="card background--${card["data-color"]}">
                    <div class="content">
                    <div class="title">${card.title}</div>
                    <div class="body">${card.description}</div>
                    </div>
                    <div class="icons">
                      <div class="icon" id = "colorOption"><img src="img/palette.svg" alt=""></div>
                      <div class="icon js-delete" id = "softDelete"><img data-id= "${card.id}" src="img/trash.svg" alt=""></div>
                    </div>
                  </div>`).join("") + '</div>'
  }else{
    return '<div class = "empty--title"><div>No notes to keep</div></div>';
  }
}

function pushCard(e){
  e.preventDefault()
  const elements = e.target.elements
  const title = elements.title.value
  const body = elements.description.value
  const color = cardSelectedColor || 'white'
  const myNote = {id: IdGenerator.next(), title: title, description: body, 'data-color': color, createdAt: new Date(), trashed: false}
  if(title && body) {
      cards.push(myNote)
  }

  elements.title.value = ''
  elements.description.value = ''
  cardSelectedColor = ''

  DOMHandler.load(showCards());
}

function deleteCard(e){
  e.preventDefault()
  let target = e.target.dataset.id
  cards.find((card) => card.id === parseInt(target)).trashed = true
  DOMHandler.load(showCards());
}


trashCardsView();

DOMHandler.load(showCards());
