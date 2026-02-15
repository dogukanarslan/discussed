import { useEffect, useState } from 'react';
import { MessageForm } from '../MessageForm/MessageForm';
import { MessageList, type TMsg } from '../MessageList/MessageList';
import { apiFetch } from '../../../api';

import { socket } from '../../../socket';

interface Props {
  user: { username: string };
  selectedRoomId?: number;
}

export const MessageWrapper = (props: Props) => {
  const { user, selectedRoomId } = props;

  const [msgs, setMsgs] = useState<TMsg[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedRoomId === undefined) {
      return;
    }

    setLoading(true);
    apiFetch(`/api/messages/${selectedRoomId}`)
      .then((res) => res.json())
      .then((data) => {
        setMsgs(data);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
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

  if (!selectedRoomId) {
    return;
  }

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return error;
  }

  return (
    <div className="flex flex-col w-full overflow-y-auto h-full gap-2">
      <MessageList user={user} msgs={msgs} />
      <MessageForm roomId={selectedRoomId} />
    </div>
  );
};
