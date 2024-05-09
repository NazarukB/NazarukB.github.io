const player = "O";
const computer = "X";

let board_full = false;
let play_board = ["", "", "", "", "", "", "", "", ""];

const board_container = document.querySelector(".play-area");
const winner_statement = document.getElementById("winner");

const render_board = () => {
    board_container.innerHTML = "";
    play_board.forEach((e, i) => {
        board_container.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${play_board[i]}</div>`;
        if (e == player || e == computer) {
            document.querySelector(`#block_${i}`).classList.add("occupied");
        }
    });
};

const addPlayerMove = e => {
    if (!board_full && play_board[e] == ""){
        play_board[e] = player;
        game_loop();
        addComputerMove();
    }
};

const addComputerMove = () => {
    if (!board_full) {
        do {
            selected = Math.floor(Math.random() * 9);
        } while (play_board[selected] != "");
        play_board[selected] = computer;
        game_loop();
    }
};

const game_loop = () => {
    render_board();
    check_board_complete();
    check_for_winner();
};

const check_board_complete = () => {
    let flag = true;
    for (let i = 0; i < 9; i++) {
        if (play_board[i] == "") {
            flag = false;
        }
    }
    board_full = flag;
};

const check_for_winner = () => {
    const winner = check_match();
    if (winner != "") {
        if (winner == player) {
            winner_statement.classList.add("playerWin");
            winner_statement.innerText = "You Win!";
        } else if (winner == computer) {
            winner_statement.classList.add("computerWin");
            winner_statement.innerText = "You Lose!";
        } else {
            winner_statement.classList.add("draw");
            winner_statement.innerText = "Draw!";
        }
    }
};

const check_match = () => {
    for (i = 0; i < 3; i++) {
        if (check_line(i, i + 3, i + 6)) {
            return play_board[i];
        }
    }
    for (i = 0; i < 3; i++) {
        if (check_line(i, i + 1, i + 2)) {
            return play_board[i];
        }
    }
    if (check_line(0, 4, 8)) {
        return play_board[0];
    }
    if (check_line(2, 4, 6)) {
        return play_board[2];
    }
    return "";
};

const check_line = (a, b, c) => {
    return (
        play_board[a] == play_board[b] &&
        play_board[b] == play_board[c] &&
        (play_board[a] == player || play_board[a] == computer)
    );
};

const reset_board = () => {
    play_board = ["", "", "", "", "", "", "", "", ""];
    board_full = false;
    winner_statement.classList.remove("playerWin");
    winner_statement.classList.remove("computerWin");
    winner_statement.classList.remove("draw");
    winner_statement.innerText = "";
    render_board();
};

render_board();