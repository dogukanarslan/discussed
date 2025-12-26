import {useEffect, useState} from 'react';

import {Message} from './Message';
import {socket} from '../../socket';

type TMsg = {
  id: number;
  username: string;
  message: string;
  created_at: string;
  new_user: string;
};

interface Props {
  user: {username: string};
}

export const MessageList = (props: Props) => {
  const {user} = props;

  const [msgs, setMsgs] = useState<TMsg[]>([]);

  useEffect(() => {
    fetch(`/api/messages`)
      .then((res) => res.json())
      .then((data) => {
        setMsgs(data);
      });
  }, []);

  useEffect(() => {
    socket.on('message', (data: TMsg) => {
      setMsgs((prev) => [...prev, data]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  return (
    <div className="message-list">
      {msgs.map((msg) => (
        <Message key={msg.id} message={msg} username={user?.username} />
      ))}
    </div>
  );
};
