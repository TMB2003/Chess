import { Button } from "../components/Button";
import { ChessBoard } from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { useEffect, useState } from "react";
import { Chess, Square, PieceSymbol, Color } from "chess.js";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export interface BoardPiece {
    square: Square;
    type: PieceSymbol;
    color: Color;
}

interface MessagePayload {
    type: string;
    payload?: any;
}

export const Game = () => {
    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState<(BoardPiece | null)[][]>(chess.board());

    useEffect(() => {
        if (!socket) return;

        socket.onmessage = (event: any) => { // Changed type to `any`
            const message: MessagePayload = JSON.parse(event.data);
            console.log(message);

            switch (message.type) {
                case INIT_GAME:
                    const newChess = new Chess();
                    setChess(newChess);
                    setBoard(newChess.board());
                    console.log("Game started");
                    break;
                case MOVE:
                    const move = message.payload;
                    if (chess.move(move)) {
                        setBoard(chess.board());
                        console.log("Move made:", move);
                    }
                    break;
                case GAME_OVER:
                    console.log("Game Over");
                    break;
                default:
                    console.log("Unknown message type:", message.type);
            }
        };
    }, [socket, chess]);

    if (!socket) return <div>Connecting...</div>;

    return (
        <div className="flex justify-center">
            <div className="pt-8 max-w-screen-lg">
                <div>
                    <ChessBoard board={board} />
                </div>
                <div>
                    <Button
                        onClick={() =>
                            socket.send(JSON.stringify({
                                type: INIT_GAME,
                            }))
                        }
                        className="px-8 py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded transition duration-300"
                    >
                        Play
                    </Button>
                </div>
            </div>
        </div>
    );
};
