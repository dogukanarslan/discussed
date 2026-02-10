import { useEffect, useRef } from 'react';

import { Message } from '../Message/Message';

import './MessageList.css';

export type TMsg = {
  id: number;
  username: string;
  message: string;
  created_at: string;
  new_user: string;
};

interface Props {
  msgs: TMsg[];
  user: { username: string };
}

export const MessageList = (props: Props) => {
  const { user, msgs } = props;

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
