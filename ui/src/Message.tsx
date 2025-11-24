interface Props {
  message: { username: string; message: string; created_at: string };
}

export const Message = (props: Props) => {
  const { message } = props;

  const currentUser = JSON.parse(sessionStorage.getItem("user") || '""');

  return (
    <div
      className={`message ${
        message.username === currentUser.username ? "message-right" : ""
      }`}
    >
      <h4>{message.username}</h4>
      <p>{message.message}</p>
      <p>{message.created_at}</p>
    </div>
  );
};
