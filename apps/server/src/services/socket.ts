import { Server } from "socket.io";

class SocketService {
    private _io: Server;
    constructor() {
        console.log("Init Socket Service...")
        this._io = new Server();
    }

    get io() {
        return this._io;
    }

    public initListeners() {
        const io = this.io;
        console.log('Init Socket Listeners')
        
        io.on('connect', (socket) => {
            console.log(`New Socket Connected`, socket.id);

            socket.on('event:message', async ({message}: {message: string}) => {
                console.log('New Message Rec', message)
            })
        });
    }
}

export default SocketService;

function async(arg0: { message: any; }, arg1: { message: any; }): (...args: any[]) => void {
    throw new Error("Function not implemented.");
}
