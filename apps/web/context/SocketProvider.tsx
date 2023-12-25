'use client'
import React, { useCallback, useContext, useEffect, useState } from "react"
import { io } from "socket.io-client"
import { Socket } from "socket.io-client/debug";

interface SocketProviderProps {
    children?: React.ReactNode
}

interface ISocketContext {
    sendMessage: (msg: string) => any;
}

const SocketContext = React.createContext<ISocketContext | null >(null);

export const useSocket = () => {
    const state = useContext(SocketContext)
    if (!state) throw new Error(`state is undefined`);

    return state;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({children}) => {
    
    const [socket,setSocket] = useState<Socket>()

    const sendMessage: ISocketContext['sendMessage'] = useCallback(
      (msg) => {
        console.log("send Message", msg)
        if (socket) {
            socket.emit('even:message', { message: msg });
        }
      },[socket] 
    )
    
    useEffect(() => {
      const _socket = io('http://localhost:8000')
    
      return () => {
        _socket.disconnect();
        setSocket(undefined)
      }
    }, [])
     

    return (
        <SocketContext.Provider value={{ sendMessage }}>
            { 
                children
            }
        </SocketContext.Provider>
    )
}