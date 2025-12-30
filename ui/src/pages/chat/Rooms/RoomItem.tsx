import './RoomItem.css';

interface Props {
  handleDelete: () => void;
  name: string;
}

export const RoomItem = (props: Props) => {
  const {name, handleDelete} = props;

  return (
    <div className="room-item">
      <div className="room-item__name">{name}</div>
      <button className="room-item__delete-btn" onClick={handleDelete}>
        X
      </button>
    </div>
  );
};
