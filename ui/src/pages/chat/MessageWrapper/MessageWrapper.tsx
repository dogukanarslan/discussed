import { useEffect, useState } from 'react';
import { MessageForm } from '../MessageForm/MessageForm';
import { MessageList, type TMsg } from '../MessageList/MessageList';
import { apiFetch } from '../../../api';

import { socket } from '../../../socket';

interface Props {
  user: { username: string };
  selectedRoomId?: number;
}

type TSocketMsg = TMsg & {
  room_id?: number;
};

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
    if (!selectedRoomId) {
      return;
    }

    const handleMessage = (data: TSocketMsg) => {
      if (data.room_id !== undefined && data.room_id !== selectedRoomId) {
        return;
      }

      setMsgs((prev) => [...prev, data]);
    };

    socket.on('message', handleMessage);

    return () => {
      socket.off('message', handleMessage);
    };
  }, [selectedRoomId]);

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
