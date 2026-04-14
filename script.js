let game = new Chess();

let board = Chessboard('board', {
    draggable: true,
    position: 'start',

    onDragStart: function (source, piece) {
        if (game.game_over()) return false;

        // prevent moving opponent pieces
        if ((game.turn() === 'w' && piece.startsWith('b')) ||
            (game.turn() === 'b' && piece.startsWith('w'))) {
            return false;
        }
    },

    onDrop: function (source, target) {
        let move = game.move({
            from: source,
            to: target,
            promotion: 'q'
        });

        if (move === null) return 'snapback';

        updateStatus();
    },

    onSnapEnd: function () {
        board.position(game.fen());
    }
});

function updateStatus() {
    let status = '';

    if (game.in_checkmate()) {
        status = (game.turn() === 'w') ? "Black wins by checkmate!" : "White wins by checkmate!";
    } 
    else if (game.in_draw()) {
        status = "Game drawn!";
    } 
    else {
        status = (game.turn() === 'w' ? "White" : "Black") + " to move";

        if (game.in_check()) {
            status += " (Check!)";
        }
    }

    document.getElementById("status").innerText = status;
}

function resetGame() {
    game.reset();
    board.start();
    updateStatus();
}

updateStatus();