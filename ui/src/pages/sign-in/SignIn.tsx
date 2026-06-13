import type { UserModel } from '@/App';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface Props {
  setUser: (user: UserModel | null) => void;
}

export const SignIn = (props: Props) => {
  const { setUser } = props;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    fetch('/api/signin', {
      method: 'POST',
      credentials: 'include',
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
        setUser({ id: data.id, username: data.username });
        navigate('/');
      })
      .catch((e) => {
        setError(e.message);
        setUsername('');
        setPassword('');
      });
  };

  return (
    <div className="flex flex-col justify-center text-center h-full max-w-md mx-auto p-4 gap-6">
      <h2 className="text-2xl font-semibold">Welcome to Discussed!</h2>
      <form
        className="flex flex-col items-center gap-3 w-full"
        onSubmit={handleSubmit}
      >
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

        {error && <div className="text-red-600">{error}</div>}
        <button className="w-full">Sign in</button>
      </form>
      <div className="text-sm text-slate-700">
        Don't have an account?{' '}
        <a className="text-blue-600 hover:underline" href="#signup">
          Sign up!
        </a>
      </div>
    </div>
  );
};
