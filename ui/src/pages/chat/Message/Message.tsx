import { formatTime } from '../../../constants';

interface Props {
  message: {
    username: string;
    message: string;
    created_at: string;
  };
  username: string;
}

export const Message = (props: Props) => {
  const { message, username } = props;

  const isCurrentUser = username === message.username;

  return (
    <div className="flex items-center justify-between px-2.5 py-2 animate-slideDown">
      <div>
        <b>{isCurrentUser ? 'You' : message.username}</b>: {message.message}
      </div>
      <div className="bg-primary rounded px-2 py-1 text-sm">
        {formatTime(message.created_at)}
      </div>
    </div>
  );
};
