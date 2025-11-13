import {useState} from 'react';

export const MessageForm = () => {
  const [username, setUsername] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(`/api/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        message: msg
      })
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
      </div>
      <button>Send</button>
    </form>
  );
};
