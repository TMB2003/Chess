import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto pt-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex justify-center">
            <img src="/chess.jpeg" className="max-w-full rounded-lg shadow-lg" alt="Chess" />
          </div>
          <div className="flex flex-col justify-center items-center md:items-start">
            <h1 className="text-5xl font-extrabold mb-4">Welcome to Chess</h1>
            <p className="text-lg mb-8">Play Chess with your friends</p>
            <Button onClick={() => navigate("/game")} className="px-8 py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded transition duration-300">
              Play Online
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
