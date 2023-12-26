let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
const cells = document.querySelectorAll('.cell');

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
        }
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
}

// Create the board elements dynamically
const boardElement = document.getElementById('board');
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    boardElement.appendChild(cell);
}
