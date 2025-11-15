import { useState } from "react";

export const MessageForm = () => {
  const [msg, setMsg] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = sessionStorage.getItem("username");

    fetch(`/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        message: msg,
      }),
    }).then(() => {
      setMsg("");
    });
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <div className="message-box">
        <input
          className="message-input"
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Write something"
        />
        <button className="message-button">Send</button>
      </div>
    </form>
  );
};
