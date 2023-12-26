let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let difficulty = 'easy'; // Default difficulty
const cells = document.querySelectorAll('.cell');
const difficultySelect = document.getElementById('difficulty');

difficultySelect.addEventListener('change', () => {
    difficulty = difficultySelect.value;
    resetGame();
});

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(event) {
    const index = Array.from(cells).indexOf(event.target);

    if (gameBoard[index] === '' && !checkWinner()) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWinner()) {
            alert(`${currentPlayer} wins!`);
            resetGame();
        } else if (!gameBoard.includes('')) {
            alert('It\'s a draw!');
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

            if (currentPlayer === 'O' && difficulty === 'hard') {
                makeComputerMove();
            }
        }
    }
}

function makeComputerMove() {
    // Simple random move for demonstration purposes
    const emptyCells = gameBoard.reduce((acc, val, index) => (val === '' ? acc.concat(index) : acc), []);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameBoard[randomIndex] = currentPlayer;
    cells[randomIndex].textContent = currentPlayer;

    if (checkWinner()) {
        alert(`${currentPlayer} wins!`);
        resetGame();
    } else if (!gameBoard.includes('')) {
        alert('It\'s a draw!');
        resetGame();
    } else {
        currentPlayer = 'X';
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';

    if (currentPlayer === 'O' && difficulty === 'hard') {
        makeComputerMove();
    }
}
