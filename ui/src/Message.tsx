interface Props {
  message: string;
  username: string;
}

export const Message = (props: Props) => {
  const {message, username} = props;

  const currentUsername = sessionStorage.getItem('username');

  return (
    <div
      className={`message ${
        username === currentUsername ? 'message-right' : ''
      }`}
    >
      <h4>{username}</h4>
      <p>{message}</p>
    </div>
  );
};
