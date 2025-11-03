import { useEffect, useState, useRef, type KeyboardEvent } from "react";
import { useAuthStore } from "../store/authStore.js";
import { useThemeStore } from "../store/themeStore.js";
import { options } from "../helper/fetchOptions.js";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../components/Sidebar.js";
import ChatHeader from "../components/ChatHeader.js";
import ChatScreen from "../components/ChatScreen.js";

export default function ChatLayout() {
  const logout = useAuthStore((s) => s.logout);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const [socket, setSocket] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [allRoom, setAllRoom] = useState([]);
  const [roomID, setRoomID] = useState(1);
  let [room, setRoom] = useState("game");
  let username;
  const token = localStorage.getItem("token");
  if (token) {
    const jwt_token = jwtDecode(token);
    username = jwt_token.sub;
  }
  let ws = useRef<WebSocket | null>(null);
  useEffect(() => {
    const get_data = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/chat/histroy?room=${roomID.toString()}`,
          options("get")
        );
        if (!res.ok) {
          const text = await res.text();
          console.error("Server returned error:", res.status, text);
          return;
        }

        let data = await res.json();
        console.log(data);
        setChat(data);
      } catch (error) {
        console.log(error);
      }
    };
    get_data();
  }, [roomID]);

  useEffect(() => {
    ws.current?.close();

    ws.current = new WebSocket(
      `ws://127.0.0.1:8000/chat/ws/${room}/${username}`
    );
    ws.current.onopen = () => console.log("WebSocket connected");
    ws.current.onmessage = (event) => {
      const new_obj = { sender: username, content: event.data };

      setChat((prev) => [...prev, new_obj]);
    };
    ws.current.onerror = (error) => console.error("WebSocket error:", error);
    ws.current.onclose = () => console.log("WebSocket closed");

    return () => {
      ws.current?.close();
    };
  }, [room, username]);

  const selectedRoom = (roomName: string, id) => {
    console.log("yoooooo", roomName, id);
    setRoomID(id);
    setRoom(roomName);
  };
  useEffect(() => {
    const getRoom = async () => {
      const url = "http://127.0.0.1:8000/chat/get_room";
      const options = {
        method: "GET",
        header: { "Content-Type": "application/json" },
      };
      const res = await fetch(url, options);
      const data = await res.json();
      setAllRoom(data);
    };
    getRoom();
  }, []);

  const send = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    }
    setMessage("");
  };
  const handleChat = (e) => {
    setMessage(e.target.value);
  };
  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (message.trim()) send();
    }
  };
  const handleNewRoom = async () => {
    const url = `http://127.0.0.1:8000/chat/create_room`;

    const data = {
      name: "study",
      description: "its for stduies",
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const res = await fetch(url, options);
    const ans = await res.json();
  };

  return (
    <div className="app-shell">
      <Sidebar
        rooms={allRoom}
        onSelectRoom={selectedRoom}
        onNewRoom={handleNewRoom}
        isOpen={isSidebarOpen}
        headerSlot={<div className="brand">PingSpace</div>}
        activeRoomName={room}
      />
      {isSidebarOpen && (
        <div className="overlay" onClick={() => setIsSidebarOpen(false)} />
      )}
      <main className="chat">
        <ChatHeader
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onToggleTheme={toggleTheme}
          onLogout={logout}
          userName={username as string}
          roomName={room}
        />
        <ChatScreen username={username} messages={chat as any} />
        <footer className="chat-input">
          <input
            placeholder="Type a message"
            onChange={handleChat}
            value={message}
            onKeyDown={handleInputKeyDown}
          />
          <button className="send" onClick={send}>
            Send
          </button>
        </footer>
      </main>
    </div>
  );
}
