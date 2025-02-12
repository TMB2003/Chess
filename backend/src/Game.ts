import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { MOVE, GAME_OVER, INIT_GAME } from "./messages";

export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    private board: Chess;
    private moves: string[];
    private startTime: Date;

    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess(); // Corrected `board` to be a `Chess` instance
        this.moves = [];
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "white",
            }
        }))
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "black",
            }
        }))
    }

    makeMove(socket: WebSocket, move: { from: string; to: string }) {
        // Ensure correct turn order
        if (
            (this.board.turn() === "w" && socket !== this.player1) ||
            (this.board.turn() === "b" && socket !== this.player2)
        ) {
            console.log("Not your turn!");
            return;
        }

        try {
            const result = this.board.move(move);
            if (!result) {
                console.log("Invalid move");
                return;
            }
        } catch (e) {
            console.log("Move error:", e);
            return;
        }

        this.moves.push(`${move.from}-${move.to}`);

        // Check if the game is over
        if (this.board.isGameOver()) {
            const winner = this.board.turn() === "w" ? "black" : "white";
            const gameOverMessage = JSON.stringify({ type: GAME_OVER, payload: { winner } });

            this.player1.send(gameOverMessage);
            this.player2.send(gameOverMessage);
            return;
        }

        // Notify both players about the move
        const moveMessage = JSON.stringify({ type: MOVE, payload: move });
        this.player1.send(moveMessage);
        this.player2.send(moveMessage);
    }
}
