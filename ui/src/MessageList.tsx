import {useEffect, useState} from 'react';
import {Message} from './Message';

type TMsg = {id: number; username: string; message: string};

export const MessageList = () => {
  const [msgs, setMsgs] = useState<TMsg[]>([]);

  useEffect(() => {
    fetch(`/api/messages`)
      .then((res) => res.json())
      .then((data) => {
        setMsgs(data);
      });
  }, []);

  useEffect(() => {
    if (typeof window.io === 'function') {
      const socket = window.io('http://localhost:8080/');
      socket.on('message', (data: TMsg) => {
        setMsgs((prev) => [...prev, data]);
      });

      return () => {
        socket.off('message');
      };
    }
  }, []);

  return (
    <div className="message-list">
      {msgs.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
    </div>
  );
};
