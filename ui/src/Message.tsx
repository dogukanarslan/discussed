import { formatTime } from "./constants";

interface Props {
  message: { username: string; message: string; created_at: string };
  username: string;
}

export const Message = (props: Props) => {
  const { message, username } = props;

  const isCurrentUser = username === message.username;

  return (
    <div className={`message ${isCurrentUser ? "message-right" : ""}`}>
      <h4>{message.username}</h4>
      <p>{message.message}</p>
      <p>{formatTime(message.created_at)}</p>
    </div>
  );
};
