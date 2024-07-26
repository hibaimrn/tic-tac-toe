document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const playerStatus = document.getElementById('player-status');
    const resetButton = document.getElementById('reset-button');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];

    const checkWin = (board) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const condition of winConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    const updatePlayerStatus = (winner) => {
        if (winner) {
            playerStatus.textContent = `Player ${winner} Wins!`;
        } else {
            playerStatus.textContent = `Current Player: ${currentPlayer}`;
        }
    };

    const resetGame = () => {
        board.fill('');
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        updatePlayerStatus(null);
    };

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if (board[index] === '') {
                board[index] = currentPlayer;
                cell.textContent = currentPlayer;
                
                const winner = checkWin(board);
                if (winner) {
                    updatePlayerStatus(winner);
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    updatePlayerStatus(null);
                }
            }
        });
    });

    resetButton.addEventListener('click', resetGame);

    updatePlayerStatus(null);
});
