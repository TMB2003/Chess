import { useEffect, useState } from "react"
import { WebSocket } from "vite"

const WS_URL = "ws://localhost:8080/ws"

export const useSocket = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null)

    useEffect(() => {
    const ws = new WebSocket(WS_URL);
    setSocket(ws);

    return () => {
        ws.close();
    };
}, []);


    return socket;
}