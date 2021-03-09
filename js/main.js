
//Declare global variables
let game;
let turn;
let win;

//Declare winning combinations
const winnerCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


// Get reference to all the boxes in the form of an array
const boxes = Array.from(document.querySelectorAll('#board div'));

// Get reference to H2
const message = document.querySelector('h2');

// Add event handlers to each box
document.getElementById('board').addEventListener('click', handleClick);

// Add event handler to reset button
document.getElementById('reset').addEventListener('click', initialize);



function initialize() {
    // Initialize an empty game board
    game = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    turn = 'X';
    win = null;
    draw();
};

initialize();

function draw() {
    game.forEach(function (value, index) {
        boxes[index].textContent = value;
        if (value == 'X'){
            boxes[index].classList = 'square';
            boxes[index].classList.add('x');
        } else if (value == 'O'){
            boxes[index].classList = 'square';
            boxes[index].classList.add('o');
        }
    });
    message.textContent = `It's ${turn}'s turn!`;
    message.textContent = win ? win == 'T' ? `It's a tie!` : `${win} wins the game!` : `It's ${turn}'s turn!`;
};

function handleClick() {
    let index = boxes.findIndex(function (box) {
        return box === event.target;
    });

    // Only fill the box if the box is not already filled or there is no winner
    if (game[index] === '' && win === null) {
        game[index] = turn;
        turn = turn === 'X' ? 'O' : 'X';
        win = getWinner();
        draw();
    }
};

function getWinner() {
    let winner = null;
    winnerCombinations.forEach((combo, index) => {
        if (game[combo[0]] && game[combo[0]] === game[combo[1]] && game[combo[0]] === game[combo[2]]) {
            winner = game[combo[0]];
        }
    });
    // Return if it is a win or a tie or should the game continue
    return winner ? winner : game.includes('') ? null : 'T';
};