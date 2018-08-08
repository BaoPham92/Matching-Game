document.addEventListener('DOMContentLoaded', function () {

    // GLOBAL DATA

    // Deck of cards. (Current static state of elements)
    const deck = document.querySelector('.deck');
    console.log('Current deck list.', deck); // Confirmination console message.

    // Deck of cards upon interaction. (Dynamic elements storage.)
    let clickedCards = [];

    // Container for matching cards
    let matchedCards = [];

    // Cards.
    const cards = document.getElementsByClassName('card');
    console.log('Card elements', cards); //Confirmination console message.

    // Restart button.
    const restartButton = document.querySelector('.restart');
    // console.log(restartButton); // Confirmination console message.

    // Moves counter.
    let moves = document.querySelector('.moves');
    // console.log(moves); // Confirmination console message.

    // Number of moves.
    let numMoves;

    // Stars indicator.
    let stars = document.getElementById('starCounter');
    // console.log(stars.children.length); // Confirmination console message.

    // Contains star's original state.
    let starContainer = stars.innerHTML;

    // Timer element.
    const gameTimer = document.querySelector('.timer');

    // Timer toggle.
    let toggleTime = false;

    // Container for incremented time.
    let timeContainer = 0;

    // Container for timeCounter variable on line 272.
    let timeCounter;

    // X element/button on modal scoreboard.
    const x = document.querySelector('.modal-x');
    // console.log(x); // Confirmination message to console.

    // FUNCTIONS

    // On load reset board.
    window.onload = reset();

    // Animate elements. (cards)
    deck.addEventListener('click', function (e) {

        // Event delegation. (click listener)
        const eClick = e.target;
        console.log(eClick); // Confirmination message to console. 

        // Timer activation. (Game clock.)
        if (clickConditionals(eClick) && toggleTime === false) {

            // Check the boolean of timer.
            if (!toggleTime) {

                // Invoke the timer function.
                timer();

                // Turn boolean to true.
                toggleTime = true;
            }
        }

        // Condition for clicking elements for checking matches. (cards)
        if (clickConditionals(eClick)) {

            // Toggle class of 'open' and 'show'
            pickCard(eClick);

            // Deposit elements in array. (cards)
            depositCard(eClick);

            // Condition for checking element selection. (cards matching)
            clickedCards.length === 2 ? ifMatch() : console.log(`Error or require 2 cards clicked.`);
        }

        //  Condition if all elements are matched. 
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
                console.log(`# of matched cards stored ${matchedCards.length}.`); // Confirmination message to console.

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
                console.log(`Number of moves left ${numMoves}.`); // Confirmination message to conssole.

                // Remove stars each time 2 moves are used up.
                switch (numMoves) {
                    case 4: starCount();
                    break;
                    case 2: starCount(); 
                    break;
                    case 0: starCount();
                    break;
                }

                // Conditional for moves at 0.
                if (numMoves === 0) {

                    // Clear timer.
                    clearTimer();

                    // Temporary lose game indicator. (Todo: Replace temporary indicator with a scoreboard.)
                    setTimeout(() => {

                        // Losing message prompt on the client.
                        alert(`You lose`);

                        // Reload li elements. (stars)
                        reloadStars();

                        // Reset move counter
                        moves.innerHTML = `6`;

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
                console.log(`Checked cards. No match found.`)

            };
        }

        // Function to call conditionals for card elements.
        function clickConditionals(eClick) {

            // Conditionals checking whether a element is to be clicked for possible pairing elements.
            return (eClick.classList.contains('card') && !eClick.classList.contains('match') && clickedCards.length < 2 && !clickedCards.includes(eClick));
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

            console.log(`Deposited cards.`); // Confirmination message.
        }
    });

    // Restart board state.
    restartButton.addEventListener('click', function (e) {

        // Iteration for removing classes to restart.
        reset();

        // Reset move counter
        moves.innerHTML = `6`;

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

        console.log('The stars indicators reloaded', stars) // Confirmination console message.
    }

    // Incrementing timer for time indicator.
    function timer() {

        // Trigger for time counter.
        timeCounter = setInterval(() => {

            // Increment timeContainer.
            timeContainer++;

            // Confirmination message to console.
            console.log(`${timeContainer} seconds.`);

            // Invoking displayTime function.
            displayTime();

        }, 1000)
    }

    // Function for clearing timer.
    function clearTimer() {

        // Clear the variable containing the incrementing time logic.
        clearInterval(timeCounter);
    }

    function displayTime() {

        let seconds = timeContainer % 60;

        let minutes = Math.floor(timeContainer / 60);

        // Set the HTML content of (.timer) element to variable timeContainer.
        seconds < 10 ? gameTimer.innerHTML = `${minutes}:0${seconds}` : gameTimer.innerHTML = `${minutes}:${seconds}`;
    }

    // Function for displaying the endgame results.
    function displayScore() {

        /// Current HTML elements to display the scores. \\\

        // HTML Stars element.
        const scoredStars = document.querySelector('#modal-stars');

        // HTML Moves element.
        const scoredMoves = document.querySelector('#modal-moves');

        // HTML Time element.
        const scoredTime = document.querySelector('#modal-time');

        /// Current game scores whilst displayScore() is invoked. \\\

        // Current number of stars.
        let totalStars = stars.children.length;
        
        // Current number of moves.
        let totalMoves = numMoves;

        // Current time.
        let totalTime = gameTimer.innerHTML;

        // Click listener for clicking the close element in modal container.
        x.addEventListener('click', function () {

            // Invoking hideModal() toggling the display: none effect.
            hideModal();
        })

        // Function for toggling hidden effect of modal.
        function hideModal() {

            // Toggle modal to be display.
            const modal = document.querySelector('.modal').classList;
            modal.toggle('hidden');

            // Confirmination console message.
            console.log(modal);
        }
    }

    // Temporary invocation for testing.
    displayScore();

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
