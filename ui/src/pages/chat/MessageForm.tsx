import {useState} from 'react';

export const MessageForm = () => {
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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user.id,
        message: msg
      })
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
        <button className="message-button">Send</button>
      </div>
    </form>
  );
};
