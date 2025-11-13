import {Message} from './Message';

interface Props {
  messages: {id: number; username: string; message: string}[];
}

export const MessageList = (props: Props) => {
  const {messages} = props;

  return (
    <div className="message-list">
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message.message}
          username={message.username}
        />
      ))}
    </div>
  );
};
