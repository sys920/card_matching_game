/*
 * Create a list that holds all of your cards
 */


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
const array=['fa fa-diamond','fa fa-paper-plane-o','fa fa-anchor','fa fa-bolt','fa fa-cube','fa fa-leaf','fa fa-bicycle','fa fa-bomb','fa fa-diamond','fa fa-paper-plane-o','fa fa-anchor','fa fa-bolt','fa fa-cube','fa fa-leaf','fa fa-bicycle','fa fa-bomb'];  // For simple game (Using 2 images)

let randomArray = shuffle(array);       //Get all disv's classname randomly from the 'shuffle' function above 
let countFlipNum = 0;     // Number for checking 2 card flip only
let checkFlipCount2more = 0;      // Number for checking  2 more card flip while settimeout 
let movesNumber = 0;    // Number of player has unmatch 
let deleteStar = 0;        // Checking the performance of game,  take 1 star each 5moves 
let tempArray = [];     // Array for storing temporary values that fliped 2 card info.
let gameContinue = true;    // When player flip all cards or loose all 3 stars 
let i,j;
const divs = document.querySelectorAll('.deck i');      //Select divs for changing random card 
const divsCheck = document.querySelector('.deck');      //Select each card for fliping (for event listener) 
const cards = document.getElementsByClassName('card');      //Select all cards and remove all checked  for restarting game 
const moves = document.querySelector('.moves');     //Set Moves eachtime
const stars = document.querySelectorAll('.stars li');       //Set delete each star per 5 moves
const endingcheck = document.getElementsByClassName('card match');      //Set delete each star per 5 moves
const restart = document.querySelector('.restart');     //Select restart icon 

moves.textContent = movesNumber;        //Put the move number into div    

for (let i=0 ; i < randomArray.length ; i++){       //Initializing all cards to start 
    divs[i].setAttribute('class',randomArray[i]);       //Assign random image calss into each divs 
    cards[i].setAttribute('class','card');      //Change cards closed into each divs 
} 

for (const card of cards){      //Giving card hint for 2seconds before each game start        
    card.setAttribute('class','card open show effect');  
} 

setTimeout(hintForDelay,2000);      //Set timeout 2seconds for cards open

restart.addEventListener('click', function(){       //New game restart function and reset all game data

    randomArray = shuffle(array);       

    for (let i = 0 ; i < randomArray.length ; i++){
        divs[i].setAttribute('class',randomArray[i]);
        cards[i].setAttribute('class','card');  
    } 

    tempArray = [];
    checkFlipCount2more = 0;   
    moves.textContent = 0; 
    movesNumber = 0;  
    deleteStar = 0;
    gameContinue = true; 

    stars[0].innerHTML=`<i class="fa fa-star"></i>`
    stars[1].innerHTML=`<i class="fa fa-star"></i>`
    stars[2].innerHTML=`<i class="fa fa-star"></i>`

    for (const card of cards){      //Giving card hint for 2seconds before each game start      
        card.classList.add('card','open','show','effect');          
    } 
    setTimeout(hintForDelay,2000)
});

divsCheck.addEventListener('click', function(e){    //Game playing 
    if(e.target.classList.contains('card') && !e.target.classList.contains('open') && !e.target.classList.contains('match') && (gameContinue)) {           
    
        if (checkFlipCount2more < 2 ) {     //Only 2cards flip while processing is going on settimeout 
            tempArray [countFlipNum] = [e.target.dataset.element, array[e.target.dataset.element]];     //save cards class and position into array

            if (typeof tempArray[0]  != "undefined" && typeof tempArray[1] != "undefined" ) {
                e.target.setAttribute('class','card open show');  //Target card was opened when it was clicked
                     
                setTimeout(checkMach, 800);  //After timeout and check cards whether match or not
                
                if (movesNumber > 4 ) {   //Check moving Numbers 
                    stars[deleteStar].innerHTML ="";        //Deleting 1 star. If player has counted each 5 moves, the 1 star icon will be deleted  
                    deleteStar++; 
                    movesNumber = 0 ;
                        if (deleteStar == 3) {      //If the stars has been deleted all 3, the game will be end  
                            swal({      // using external library for popup msg.
                                type: 'error',
                                title: 'GAME OVER',
                                text: '',
                                footer: ''
                              })    
                        }                    
                }                 
                
            } else {
                e.target.setAttribute('class','card open show');             
            };                    
        }    
        checkFlipCount2more ++;     //Second card will open  
        countFlipNum++;
        countFlipNum = countFlipNum%2;      //For only 2cards open 
    }
});

function checkMach() {      //Checking 2Cards match or unmatch 
    i=tempArray[0][0];
    j=tempArray[1][0];

    if ((tempArray[0][1] == tempArray[1][1])) {  
        cards[i].classList.add('card','match','rotate-scale-up');  //1st, 2nd card class were matched
        cards[j].classList.add('card','match','rotate-scale-up'); 

        tempArray = [];
        checkFlipCount2more = 0;   
        if (endingcheck.length == 16 ) {        //Checking 16Cards match and showing winner msg. 
            
                swal({      // using external library for popup msg
                type: 'success',
                title: 'You win',
                text: '',
                footer: ''
                })
            gameContinue = false; 
        }            

    } else {  

        cards[i].classList.add('card','open','show','shake-horizontal');     
        cards[j].classList.add('card','open','show','shake-horizontal');      

        setTimeout(myDelay,1000);

        movesNumber++;      //Counting umatch number 
        moves.textContent = movesNumber;        //Put the move number into div    
        tempArray = [];
        checkFlipCount2more = 0;   
    }
}

function hintForDelay() {       //Function for delaying, after showing all open and  close.  
    for (const card of cards){        
        card.setAttribute('class','card');  
    } 
}

function myDelay() {  
    cards[i].classList.remove('open','show','shake-horizontal'); 
    cards[j].classList.remove('open','show','shake-horizontal');        
}