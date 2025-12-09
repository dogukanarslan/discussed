import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Message } from "./Message";

type TMsg = {
  id: number;
  username: string;
  message: string;
  created_at: string;
};

export const MessageList = () => {
  const [msgs, setMsgs] = useState<TMsg[]>([]);
  const currentUser = JSON.parse(sessionStorage.getItem("user") || '""');

  useEffect(() => {
    fetch(`/api/messages`)
      .then((res) => res.json())
      .then((data) => {
        setMsgs(data);
      });
  }, []);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_BASE_URL);
    socket.on("message", (data: TMsg) => {
      setMsgs((prev) => [...prev, data]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <div className="message-list">
      {msgs.map((msg) => (
        <Message key={msg.id} message={msg} username={currentUser.username} />
      ))}
    </div>
  );
};
