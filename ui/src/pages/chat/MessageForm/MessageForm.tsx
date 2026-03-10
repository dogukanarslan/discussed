import { useState } from 'react';
import { apiFetch } from '@/api';

interface Props {
  roomId: number;
}

export const MessageForm = (props: Props) => {
  const { roomId } = props;

  const [msg, setMsg] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = JSON.parse(sessionStorage.getItem('user') || '""');

    if (!user) {
      return;
    }

    apiFetch(`/api/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user.id,
        message: msg,
        room_id: roomId,
      }),
    }).then(() => {
      setMsg('');
    });
  };

  return (
    <form
      className="flex items-center gap-2 h-messageForm"
      onSubmit={handleSubmit}
    >
      <input
        className="text-[15px]"
        type="text"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Write something"
      />
      <div>
        <button>Send</button>
      </div>
    </form>
  );
};
