import { formatTime } from "./constants";

interface Props {
  message: {
    username: string;
    message: string;
    created_at: string;
    new_user: string;
  };
  username: string;
}

export const Message = (props: Props) => {
  const { message, username } = props;

  const isCurrentUser = username === message.username;

  if (message.new_user) {
    return (
      <div> {message.new_user} joined</div>
    );
  }

  return (
    <div className="message">
      <div>
        <b>{isCurrentUser ? "You" : message.username}</b>: {message.message}
      </div>
      <p>{formatTime(message.created_at)}</p>
    </div>
  );
};
