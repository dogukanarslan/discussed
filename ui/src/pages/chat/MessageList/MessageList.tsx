import { useEffect, useRef, useState } from 'react';

import { Message } from '../Message/Message';
import { socket } from '../../../socket';

import './MessageList.css';

type TMsg = {
  id: number;
  username: string;
  message: string;
  created_at: string;
  new_user: string;
};

interface Props {
  user: { username: string };
  selectedRoomId: number;
}

export const MessageList = (props: Props) => {
  const { user, selectedRoomId } = props;

  const [msgs, setMsgs] = useState<TMsg[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (msgs.length === 0) {
      return;
    }

    document.fonts.ready.then(() => {
      if (!ref.current) {
        return;
      }

      ref.current.scrollIntoView({ block: 'end' });
    });
  }, [msgs]);

  useEffect(() => {
    fetch(`/api/messages/${selectedRoomId}`)
      .then((res) => res.json())
      .then((data) => {
        setMsgs(data);
      });
  }, [selectedRoomId]);

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
      {msgs.length === 0 ? (
        <p>No messages</p>
      ) : (
        msgs.map((msg) => (
          <Message key={msg.id} message={msg} username={user?.username} />
        ))
      )}
      {msgs.length > 0 && <div ref={ref} />}
    </div>
  );
};
