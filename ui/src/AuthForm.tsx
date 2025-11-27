import { useState } from "react";

interface Props {
  endpoint: string;
  title: string;
  buttonText: string;
  link: { href: string; text: string };
}

export const AuthForm = (props: Props) => {
  const { title, buttonText, endpoint, link } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    setError("");

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        }

        const data = await res.json();
        throw Error(data.message);
      })
      .then((data) => sessionStorage.setItem("user", JSON.stringify(data)))
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
          <h1 className="login__heading">{title}</h1>

          <div>
            <label htmlFor="username"></label>
            <input
              id="username"
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
          <button>{buttonText}</button>
        </form>

        <a href={link.href}>{link.text}</a>
      </div>
    </div>
  );
};
