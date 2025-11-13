import {Message} from './Message';

interface Props {
  messages: {username: string; message: string}[];
}

export const MessageList = (props: Props) => {
  const {messages} = props;

  return (
    <div className='message-list'>
      {messages.map((message) => (
        <Message message={message.message} username={message.username} />
      ))}
    </div>
  );
};
