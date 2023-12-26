import { Server } from "socket.io";
import Redis from "ioredis";

const pub = new Redis({
    host: "redis-1d685ee7-vaibdix1-a29f.a.aivencloud.com",
    port: 26905,
    username: "default",
    password: "AVNS_7i3R-2JvT8W_ftxUAG-",
});

const sub = new Redis({
    host: "redis-1d685ee7-vaibdix1-a29f.a.aivencloud.com",
    port: 26905,
    username: "default",
    password: "AVNS_7i3R-2JvT8W_ftxUAG-",
});

class SocketService {
  private _io: Server;

    constructor() {
        console.log("Init Socket Service...");
        this._io = new Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*",
            },
        });
        sub.subscribe("MESSAGES");
    }

    public initListeners() {
            const io = this.io;
            console.log("Init Socket Listeners...");

        io.on("connect", (socket) => {
            console.log(`New Socket Connected`, socket.id);

            socket.on("event:message", async ({ message }: { message: string }) => {
                console.log("New Message Rec.", message);
                // publish this message to redis
                await pub.publish("MESSAGES", JSON.stringify({ message }));
            });
        });

        sub.on("message", async (channel, message) => {
            if (channel === "MESSAGES") {
                console.log("new message from redis", message);
                io.emit("message", message);
            }
          });

  }

  get io() {
    return this._io;
  }
}

export default SocketService;
