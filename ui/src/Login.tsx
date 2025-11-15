import {useState} from 'react';

interface Props {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const Login = (props: Props) => {
  const {setIsLoggedIn} = props;
  

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sessionStorage.setItem('username', JSON.stringify(username));
    sessionStorage.setItem('password', JSON.stringify(password));
    setIsLoggedIn(true);
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h1 className="login__heading">Login</h1>
        <div>
          <label htmlFor="username"></label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter userneme"
          />
        </div>
        <div>
          <label htmlFor="password"></label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <button>Log in</button>
      </form>
    </div>
  );
};
