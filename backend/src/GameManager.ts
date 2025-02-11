import { WebSocket } from "ws";
import { Game } from "./Game";
import { INIT_GAME } from "./messages";
interface Game{
    id: number;
    name: string;
    player1: WebSocket;
    player2: WebSocket;
}

export class GameManager { 
    private games: Game[];
    private pendingUser: WebSocket | null;
    private users: WebSocket[];

    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    addUser(socket: WebSocket) {    
        this.users.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket: WebSocket){
        this.users = this.users.filter(user => user !== socket);
        // stop the game as user disconnected
    }
    private handleMessage(){

    }
    private addHandler(socket: WebSocket){  
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());

            if(message.type === INIT_GAME) {
                if(this.pendingUser) {
                    // start a game
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else{
                    this.pendingUser = socket;
                }
            }
        });
    }
}