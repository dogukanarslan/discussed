import { useState } from 'react';

import { socket } from '../../socket';

interface Props {
  setUser: (user: { username: string }) => void;
}

export const SignUp = (props: Props) => {
  const { setUser } = props;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        }

        const data = await res.json();
        throw Error(data.message);
      })
      .then((data) => {
        sessionStorage.setItem('user', JSON.stringify(data));
        socket.emit('user:join', data);
        setUser({ username: data.username });
        window.location.hash = '#chat';
      })
      .catch((e) => {
        setError(e.message);
        setUsername('');
        setPassword('');
      });
  };

  return (
    <div className="auth-form">
      <h2 className="auth-form__heading">Create a new account!</h2>
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          required
        />

        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />

        {error && <div className="error">{error}</div>}
        <button>Sign up</button>
      </form>
      <div>
        Already have an account? <a href="#signin">Sign in!</a>
      </div>
    </div>
  );
};
