const addInProgress = document.getElementById('add-new-in-progress');
const addToDo = document.getElementById('add-new-to-do');
const toDoContainer = document.getElementById('to-do-container');
const inProgressContainer = document.getElementById('in-progress-container');

function createCard() {
  const card = document.createElement('div');
  card.innerHTML = '<p>Hi</p>';
  card.classList.add('card');
  card.draggable = true;
  card.addEventListener('dragstart', dragStart);
  return card;
}

addToDo.addEventListener('click', () => {
  const card = createCard();
  toDoContainer.appendChild(card);
});

addInProgress.addEventListener('click', () => {
  const card = createCard();
  inProgressContainer.appendChild(card);
});

function dragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
  event.target.classList.add('dragging');
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const card = document.querySelector('.dragging');
  if (card) {
    event.target.appendChild(card);
    card.classList.remove('dragging');
  }
}

toDoContainer.addEventListener('dragover', dragOver);
toDoContainer.addEventListener('drop', drop);

inProgressContainer.addEventListener('dragover', dragOver);
inProgressContainer.addEventListener('drop', drop);
