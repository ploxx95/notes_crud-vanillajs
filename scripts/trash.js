const notesOption=document.querySelector('#notes');
const trashOption=document.querySelector('#trash');
notesOption.addEventListener('click', mainView);

const recoverListener = function(){
  const recoverButtonList = document.querySelectorAll('#recover')
  recoverButtonList.forEach(button => button.addEventListener('click', recoverCard))
}

function mainView(){
  if (trashOption.className == 'sidebar__option option-selected'){
    trashOption.className = 'sidebar__option' 
    notesOption.className = 'sidebar__option option-selected'
  }
  form.style.display='block';
  DOMHandler.load(showCards());
}

function recoverCard(e){
  e.preventDefault()
  let target = e.target.dataset.id
  let foundCard = cards.find((card) => card.id === parseInt(target))
  console.log(foundCard)
  cards.find((card) => card.id === parseInt(target)).trashed = false
  trashView();
}

const trashCardsView = function(){
  const trashOption=document.querySelector('#trash');
  trashOption.addEventListener('click',trashView);
}

const hardDeleteListener= function(){
  const recoverButtonList = document.querySelectorAll('#hard')
  recoverButtonList.forEach(button => button.addEventListener('click', hardDeleteCard))
}

function hardDeleteCard(e){
  let target = e.target.dataset.id;
  index=cards.findIndex((card) => card.id===parseInt(target));
  cards.splice(index,1);
  trashView();
}

function trashView(e){
  form.style.display='none';
  if (notesOption.className == 'sidebar__option option-selected'){
      notesOption.className = 'sidebar__option' 
      trashOption.className = 'sidebar__option option-selected'
  }

  let currentCards = cards.filter(obj => obj.trashed === true);
  let newestCards = currentCards.sort((a,b)=> b.createdAt - a.createdAt);
  let result= '<div class = "main--content--cards">' + newestCards.map(card => `<div class="card background--${card["data-color"]}">
                    <div class="content">
                    <div class="title">${card.title}</div>
                    <div class="body">${card.description}</div>
                    </div>
                    <div class="icons">
                      <div class="icon js-delete" id = "hard"><img data-id= "${card.id}" src="img/trash.svg" alt=""></div>
                      <div class="icon" id = "recover"><img data-id= "${card.id}" src="img/recover.svg" alt=""></div>                     
                    </div>
                  </div>`).join("") + '</div>'


  DOMHandler.load(result);
}

