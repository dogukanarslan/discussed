interface Props {
  message: string;
  userId: number;
}

export const Message = (props: Props) => {
  const { message, userId } = props;

  const currentUser = JSON.parse(sessionStorage.getItem("user") || '""');

  return (
    <div
      className={`message ${userId === currentUser.id ? "message-right" : ""}`}
    >
      <h4>{currentUser.username}</h4>
      <p>{message}</p>
    </div>
  );
};
