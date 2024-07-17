document.addEventListener('DOMContentLoaded', () => {
  let cards = [...cardArray, ...cardArray]; // Create pairs
  let cardGrid = document.getElementById('cards-grid');
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsMatched = 0;

  // Randomize/shuffle cards
  function shuffleCards() {
    cards.sort(() => 0.5 - Math.random());
    console.log('Cards:', cards);
  }

  // Create a card div for each card
  function createCardGrid() {
    cardGrid.innerHTML = ''; // Clear previous cards
    for (let i = 0; i < cards.length; i++) {
      let card = document.createElement('div');
      card.setAttribute('class', 'card');

      let image = document.createElement('img');
      image.setAttribute('src', 'images/back_cover.png');
      image.setAttribute('class', 'card-image');
      image.setAttribute('data-id', i);
      image.addEventListener('click', flipCard);

      card.appendChild(image);
      cardGrid.appendChild(card);
    }
  }

  // Click event
  function flipCard() {
    document.getElementById('alert-choose').style.display = 'none';
    document.getElementById('alert-match').style.display = 'none';

    let cardId = this.getAttribute('data-id');
    console.log(`Card ID: ${cardId}`);

    this.setAttribute('src', cards[cardId].img);

    cardsChosen.push(cards[cardId].name);
    cardsChosenId.push(cardId);
    console.log(`Cards Chosen ID: ${cardsChosenId}`);
    console.log(`Cards Chosen: ${cardsChosen}`);

    // If there are 2 cards and their ids don't match, go to matchCards function
    if (cardsChosen.length === 2) {
      if (cardsChosenId[0] !== cardsChosenId[1]) {
        document.querySelectorAll('img').forEach(img => img.classList.add('unclickable'));
        setTimeout(matchCards, 300);
      } else {
        document.getElementById('alert-choose').style.display = 'block';
        cardsChosen.pop();
        cardsChosenId.pop();
      }
    }
  }

  // Check if chosen cards match
  function matchCards() {
    let changeCards = document.querySelectorAll('img');
    if (cardsChosen[0] === cardsChosen[1]) {
      document.getElementById('alert-match').style.display = 'block';
      cardsChosenId.forEach(id => changeCards[id].classList.add('disabled'));
      cardsMatched += 2; // Increment the matched cards count
      setTimeout(() => {
        document.getElementById('alert-match').style.display = 'none';
      }, 1500);
    } else {
      document.getElementById('alert-no-match').style.display = 'block';
      cardsChosenId.forEach(id => {
        setTimeout(() => {
          changeCards[id].setAttribute('src', 'images/back_cover.png');
          document.getElementById('alert-no-match').style.display = 'none';
        }, 1500);
      });
    }

    document.querySelectorAll('img').forEach(img => img.classList.remove('unclickable'));
    cardsChosen = [];
    cardsChosenId = [];
    console.log(`Empty cardsChosen: ${cardsChosen} and empty cardsChosenId: ${cardsChosenId}`);

    // Check if all cards are matched
    if (cardsMatched === cards.length) {
      setTimeout(resetGame, 2000); // Wait 2 seconds before resetting the game
    }
  }

  // Reset the game
  function resetGame() {
    cardsMatched = 0;
    shuffleCards();
    createCardGrid();
  }

  shuffleCards();
  createCardGrid();

  // Side navigation functions
  window.openNav = function() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  window.closeNav = function() {
    document.getElementById("mySidenav").style.width = "0";
  }
});
