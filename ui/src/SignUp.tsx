import { useState } from "react";

interface Props {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setIsSignUp: (isSignUp: boolean) => void;
}

export const SignUp = (props: Props) => {
  const { setIsLoggedIn, setIsSignUp } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = { username, password };

    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.ok) {
        sessionStorage.setItem("username", JSON.stringify(username));
        setIsLoggedIn(true);
        setIsSignUp(false);
      }
    });
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h1 className="login__heading">Sign up</h1>
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
        <button>Sign up</button>
      </form>
    </div>
  );
};
