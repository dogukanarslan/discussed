import {useEffect, useState} from 'react';
import {MessageForm} from './MessageForm';

import {MessageList} from './MessageList';

import 'http://localhost:8080/socket.io/socket.io.js';

type TMsg = {id: number; username: string; message: string};

function App() {
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
    <div className="container">
      <h1>Messages</h1>
      <MessageList messages={msgs} />
      <MessageForm />
    </div>
  );
}

export default App;
