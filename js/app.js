document.addEventListener('DOMContentLoaded', function () {

    // GLOBAL DATA

    // Deck of cards. (Current static state of elements)
    const deck = document.querySelector('.deck');
    console.log(deck); // Confirmination console message.

    // Deck of cards upon interaction. (Dynamic elements storage.)
    let clickedCards = [];

    // Container for matching cards
    let matchedCards = [];

    // Cards.
    const cards = document.getElementsByClassName('card');
    console.log(cards); //Confirmination console message.

    // Restart button.
    const restartButton = document.querySelector('.restart');
    console.log(restartButton); // Confirmination console message.

    // Moves counter.
    let moves = document.querySelector('.moves');
    console.log(moves); // Confirmination console message.

    // Number of moves.
    let numMoves;

    // Stars indicator.
    let stars = document.getElementById('starCounter');
    console.log(stars); // Confirmination console message.

    // Contains star's original state.
    let starContainer = stars.innerHTML;

    // FUNCTIONS

    // On load reset board.
    window.onload = reset();

    // Animate elements. (cards)
    deck.addEventListener('click', function (e) {

        // Event delegation. (click listener)
        const eClick = e.target;
        console.log(eClick); // Confirmination message to console. 

        // Condition for clicking elements. (cards)
        if (eClick.classList.contains('card') && !eClick.classList.contains('match') && clickedCards.length < 2 && !clickedCards.includes(eClick)) {

            // Toggle class of 'open' and 'show'
            pickCard(eClick);

            // Deposit elements in array. (cards)
            depositCard(eClick);

            // Condition for checking element selection. (cards matching)
            clickedCards.length === 2 ? ifMatch() : console.log(`No match.`);
        }

        //  Condition if matchedCards.length is 16 
        if (matchedCards.length === 16) {

            // Temporary winning message. (Todo: Create scoreboard to replace the alert.)
            alert(`You win!`);
        }

        // Condition for matching elements. (cards)
        function ifMatch() {

            // Conditional for checking the 2 selected elements. (cards)
            if (clickedCards[0].innerHTML === clickedCards[1].innerHTML) {

                // Toggle .match class with elements that clicked.
                clickedCards[0].classList.toggle('match');
                clickedCards[1].classList.toggle('match');

                // Deposit matching elements.
                matchedCards.push(clickedCards[0]);
                matchedCards.push(clickedCards[1]);
                console.log(matchedCards.length); // Confirmination message to console.

                clickedCards = []; // Clear array so the next match can sequence.

                console.log(`Matching cards!`); // Confirmination message to console for a match.

            } else if (clickedCards[0].innerHTML !== clickedCards[1].innerHTML) {

                // Toggle invalid immediately to selected elements.
                invalid(clickedCards[0]);
                invalid(clickedCards[1]);

                // Timer for element class toggle. (cards)
                setTimeout(() => {

                    // Toggle invalid again after timer.
                    invalid(clickedCards[0]);
                    invalid(clickedCards[1]);

                    // Toggle open and show classes.
                    pickCard(clickedCards[0]);
                    pickCard(clickedCards[1]);

                    // Clear array so the next match can sequence. 
                    clickedCards = [];

                }, 550);

                // Subtract amount of moves left.
                numMoves = parseInt(moves.innerHTML, 10) - 1;
                moves.innerHTML = numMoves;

                console.log(numMoves); // Confirmination message to conssole.

                starCount();

                // Conditional for moves at 0.
                if (numMoves === 0) {

                    // Temporary lose game indicator. (Todo: Replace temporary indicator with a scoreboard.)
                    setTimeout(() => {

                        // Losing message prompt on the client.
                        alert(`You lose`);

                        // Reload li elements. (stars)
                        reloadStars();

                        // Reset move counter
                        moves.innerHTML = `3`;

                        // Remove matching elements. (cards)
                        for (const card of cards) {

                            // Conditional for matching elements leftover on board.
                            if (card.classList.contains('match')) {

                                // Remove classes for the remaining matching elements.
                                card.classList.remove('match', 'open', 'show');
                            }
                        }

                    }, 250);

                    // Other functions to execute after firsts timer clears.
                    // setTimeout(() => {

                    //     // Element (cards) randomization upon losing game conditions.
                    //     randomize();

                    // }, 500);

                } 

                // Logging false match to message to console.
                console.log(`No match found.`)

            };
        }

        // Star count
        function starCount() {

            // Remove the amount of elements = moves. (stars)
            stars.removeChild(stars.lastElementChild);
        }

        // Element toggle invalid element selection
        function invalid(eClick) {

            // Toggle classs for invalid.
            eClick.classList.toggle('invalid');
        }

        // Element toggle class function.
        function pickCard(eClick) {

            // Toggle class add/remove to elements. (cards)
            eClick.classList.toggle('open');
            eClick.classList.toggle('show');
        }

        // Deposit clicked cards
        function depositCard(eClick) {

            // Adding target delegation to clickedCards array.
            clickedCards.push(eClick);

            console.log(clickedCards); // Confirmination message.
        }
    });

    // Restart board state.
    restartButton.addEventListener('click', function (e) {

        // Iteration for removing classes to restart.
        reset();

        // Reset move counter
        moves.innerHTML = `3`;

        // Reload li elements. (stars)
        reloadStars();

        // Confirmination console message.
        console.log(`Restart button clicked!`);
    })

    // Removing all classes for elements. (cards)
    function reset() {

        // Iteration for removing classes to restart.
        for (const card of cards) {
            card.classList.remove('match', 'open', 'show');
        }

        // Randomize elements. (cards)
        // randomize();
    }

    // Reload stars
    function reloadStars() {

        // Reload previous information state.
        stars.innerHTML = starContainer;

        console.log(stars) // Confirmination console message.
    }

    // Randomize the children elements of the .deck class.
    // function randomize() {

    //     // New deck container
    //     const newDeck = Array.from(document.querySelectorAll('.deck li'));
    //     console.log('cards to shuffle', newDeck); // Shuffle element by id (container for card elements.)

    //     // Container for shuffled cards.
    //     const randomizedDeck = shuffle(newDeck);
    //     console.log('cards that are shuffled', randomizedDeck); // Confirmination message to console.

    //     // Replace the old nodeList with new one.
    //     for (const card of newDeck) {
    //         deck.appendChild(card);
    //     }

    //     console.log(`Randomized cards activated`); // Confirmination console message.
    // }

    /*
     * Display the cards on the page
     *   - shuffle the list of cards using the provided "shuffle" method below
     *   - loop through each card and create its HTML
     *   - add each card's HTML to the page
     */

    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
})
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
