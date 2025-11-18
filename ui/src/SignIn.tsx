import { useState } from "react";

interface Props {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setIsSignUp: (isSignUp: boolean) => void;
}

export const SignIn = (props: Props) => {
  const { setIsLoggedIn, setIsSignUp } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const body = { username, password };

    fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          const data = await res.json();
          throw Error(data.error);
        }
      })
      .then((data) => {
        sessionStorage.setItem("user", JSON.stringify(data));
        setIsLoggedIn(true);
      })
      .catch((e) => {
        setUsername("");
        setPassword("");
        setError(e.message);
      });
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h1 className="login__heading">Sign in</h1>
        <div>
          <label htmlFor="username"></label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
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
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button>Log in</button>
        <button onClick={() => setIsSignUp(true)}>Sign up</button>
      </form>
    </div>
  );
};
