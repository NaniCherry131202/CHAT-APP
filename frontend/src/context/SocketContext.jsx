import { createContext, useEffect, useState ,useContext} from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext=createContext();

       export const useSocketContext=()=>{
        return useContext(SocketContext);
       }

export const SocketContextProvider=({children})=>{
     const [socket,setSocket]=useState(null);
     const[onlineUsers,setOnlineUsers]=useState([]);
     const {authUser}=useAuthContext();

     useEffect(() => {
        if (authUser && authUser._id) {
            console.log("Connecting socket for user:", authUser._id);
            
            const newSocket = io("https://chat-app-1-fc06.onrender.com", {
                query: { userId: authUser._id },
            });
    
            newSocket.on("connect", () => {
                console.log("Socket connected:", newSocket.id);
            });
    
            newSocket.on("getOnlineUsers", (users) => {
                console.log("Received online users:", users);
                setOnlineUsers(users);
            });
    
            newSocket.on("disconnect", () => {
                console.log("Socket disconnected");
            });
    
            setSocket(newSocket);
    
            return () => {
                console.log("Closing socket");
                newSocket.disconnect();
                setSocket(null);
            };
        }
    }, [authUser]);
    

    return <SocketContext.Provider value={{socket,onlineUsers}}>{children}</SocketContext.Provider>
}