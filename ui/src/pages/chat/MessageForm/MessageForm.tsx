import { useState } from 'react';

import './MessageForm.css';

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

    fetch(`/api/messages`, {
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
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        className="message-input"
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
