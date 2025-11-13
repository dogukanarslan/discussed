interface Props {
  message: string;
  username: string;
}

export const Message = (props: Props) => {
  const {message, username} = props;

  return (
    <div className="message">
      <h4>{username}</h4>
      <p>{message}</p>
    </div>
  );
};
