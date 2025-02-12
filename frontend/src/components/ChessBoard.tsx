import { Color, PieceSymbol, Square } from "chess.js";

export const ChessBoard = ({ board }: {
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][]
}) => {
    return (
        <div className="text-white-200">
            {board.map((row, i) => {
                return (
                    <div key={i} className="flex">
                        {row.map((squareObj, j) => {
                            return (
                                <div key={j} className="bg-green-500 w-12 h-12 flex items-center justify-center">
                                    {squareObj && (
                                        <span className={`piece ${squareObj.color}`}>
                                            {squareObj.type}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};
