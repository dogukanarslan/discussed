import { useEffect, useRef } from 'react';

import { Message } from '../Message/Message';

export type TMsg = {
  id: number;
  username: string;
  message: string;
  created_at: string;
  room_id: number;
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
  }, [msgs.length]);

  return (
    <div className="h-full w-full overflow-y-auto flex-1">
      {msgs.length === 0 ? (
        <p>No messages</p>
      ) : (
        msgs.map((msg) => (
          <Message key={msg.id} message={msg} username={user.username} />
        ))
      )}
      {msgs.length > 0 && <div ref={ref} />}
    </div>
  );
};
