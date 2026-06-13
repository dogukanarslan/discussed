import { apiPost } from '@/api';
import type { UserData } from '@/types/api';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface Props {
  setUser: (user: UserData | null) => void;
}

export const SignUp = (props: Props) => {
  const { setUser } = props;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const user = await apiPost<UserData>('/api/signup', { username, password });
      sessionStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      navigate('/');
    } catch (e) {
      setError((e as Error).message);
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div className="flex flex-col justify-center text-center h-full max-w-md mx-auto p-4 gap-6">
      <h2 className="text-2xl font-semibold">Create a new account!</h2>
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
        <button className="w-full">Sign up</button>
      </form>
      <div className="text-sm text-slate-700">
        Already have an account?{' '}
        <a className="text-blue-600 hover:underline" href="#signin">
          Sign in!
        </a>
      </div>
    </div>
  );
};
