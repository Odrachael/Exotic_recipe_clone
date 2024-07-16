document.addEventListener('DOMContentLoaded', () => {
  let cards = [...cardArray]
  let cardGrid = document.getElementById('cards-grid')
  let cardsChosen = [];
  let cardsChosenId = [];

  // Create and push duplicates to cards variable (prevent writing duplicates in db.js)
  function createCards() {
    for (let i = 0; i < cardArray.length; i++) {
      cards.push(cardArray[i])
    }
    // Randomize/shuffle cards
    cards.sort(() => 0.5 - Math.random());
    console.log('Cards: ', cards);
  }

  // Create a card div for each card
  function createCardGrid() {
    for (let i = 0; i < cards.length; i++) {
      let card = document.createElement('div', );
      card.setAttribute('class', 'card');

      let image = document.createElement('img');
      image.setAttribute('src', 'images/back_cover.png');
      image.setAttribute('class', 'card-image')
      image.setAttribute('id', i);
      image.addEventListener('click', flipCard);

      card.appendChild(image);
      cardGrid.appendChild(card);
    }
  }

  // Click event
  function flipCard() {
    document.getElementById('alert-choose').style.display = 'none';
    document.getElementById('alert-match').style.display = 'none';
    // document.getElementById('alert-no-match').style.display = 'none';

    let back_id = this.getAttribute('id');
    console.log(`Back ID: ${back_id}`);

    this.setAttribute('src', cards[back_id].img)



    cardsChosen.push(cards[back_id].name);
    cardsChosenId.push(back_id)
    console.log(`Cards Chosen ID: ${cardsChosenId}`);
    console.log(`Cards Chosen: ${cardsChosen}`);



    // If there are 2 cards and their id's don't match, go to matchCards function. 
    if (cardsChosen.length === 2 && cardsChosenId[0] !== cardsChosenId[1]) {
      let unclickable = document.querySelectorAll('img');
      console.log('Unclickable length', unclickable.length);

      for (let i = 0; i < unclickable.length; i++) {
        unclickable[i].setAttribute('class', 'unclickable');
      }

      setTimeout(matchCards, 300);
      // matchCards();
      // If the cards chosen have same ID, remove last item from the chosen arrays
    } else if (cardsChosenId[0] === cardsChosenId[1]) {
      document.getElementById('alert-choose').style.display = 'block';
      cardsChosen.pop(cards[back_id].name);
      cardsChosenId.pop(back_id)
    }
  }

  // Check if chosen cards match
  function matchCards() {
    let changeCards = document.querySelectorAll('img');
    if (cardsChosen[0] === cardsChosen[1]) {
      document.getElementById('alert-match').style.display = 'block';
      // If match, make matching cards display: none
      for (const cardChosenId of cardsChosenId) {
        // changeCards[cardChosenId].setAttribute('src', 'images/white.png')
        changeCards[cardChosenId].setAttribute('class', 'disabled')
      }
      setTimeout(
        () => {
          document.getElementById('alert-match').style.display = 'none';

        }, 1500
      )

    } else {
      document.getElementById('alert-no-match').style.display = 'block';
      for (const cardChosenId of cardsChosenId) {
        console.log('No match cardChosenID: ', cardChosenId);
        // Set a timeout for the mismatched cards to been shown long before being flipped back
        setTimeout(
          () => {
            changeCards[cardChosenId].setAttribute('src', 'images/back_cover.png');
            document.getElementById('alert-no-match').style.display = 'none';

          }, 1500
        )

      }
    }
    //?????
    // let clickable = document.getElementsByClassName('unclickable');
    let clickable = document.getElementsByClassName('unclickable');
    console.log('Clickable again length: ', clickable);

    for (let i = 0; i < clickable.length; i++) {
      clickable[i].setAttribute('class', 'card-image');
    }

    // When there is a match or no match, the cards chosen arrays are emptied
    cardsChosen = [];
    cardsChosenId = [];
    console.log(`Empty cardsChosen: ${cardsChosen} and empyty cardsChosenId ${cardsChosenId}`);


  }

  createCards()
  createCardGrid()
})