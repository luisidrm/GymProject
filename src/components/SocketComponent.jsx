"use client"
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";

const SocketComponent = () => {
	useEffect(() => {
		const protocol = window.location.protocol === "https:" ? "wss" : "ws";
		const ws = new WebSocket("/api/socket");
    

		ws.onopen = () => {
			console.log("Connected to WebSocket");
			ws.send("Hello, WebSocket!");
		};
		ws.onmessage = (e) => {
      toast({
        title: "Nueva Reservacion!",
        description: "Tienes una nueva reservacion. Revisala ahora mismo"
      })
			if (localStorage.notifications) {
				[...localStorage.notifications, e.data];
			} else {
				localStorage.setItem("notifications", e.data);
			}
		};
		ws.onclose = () => {
			console.log("WebSocket connection closed");
		};
		return () => {
			ws.close();
		};
	}, []);
};
export default SocketComponent;
