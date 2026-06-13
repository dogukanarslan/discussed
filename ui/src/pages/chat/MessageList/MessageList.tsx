import { useEffect, useRef } from 'react';

import { Message } from '@/pages/chat/Message/Message';
import type { UserModel } from '@/App';
import type { MessageModel } from '@/pages/subject-detail/SubjectDetail';

interface Props {
  msgs: MessageModel[];
  user: UserModel;
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
