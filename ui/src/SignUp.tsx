import { useState } from "react";

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const body = { username, password };

    fetch("/api/signup", {
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
          throw Error(data.message);
        }
      })
      .then((data) => {
        sessionStorage.setItem("user", JSON.stringify(data));
      })
      .catch((e) => {
        setError(e.message);
        setUsername("");
        setPassword("");
      });
  };

  return (
    <div className="login">
      <div className="login__form">
        <form onSubmit={handleSubmit}>
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
          {error && <div className="error">{error}</div>}
          <button>Sign up</button>
        </form>
        <a href="#signin">Already have an account?</a>
      </div>
    </div>
  );
};
