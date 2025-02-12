import { Button } from "../components/Button"
import { ChessBoard } from "../components/ChessBoard"
import { useNavigate } from "react-router-dom"

export const Game = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center">
            <div className="pt-8 max-w-screen-lg">
                <div>
                    <ChessBoard />
                </div>
                <div>
                    <Button onClick={() => navigate("/game")} className="px-8 py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded transition duration-300">
                        Play
                    </Button>
                </div>
            </div>
        </div>
    )
}
