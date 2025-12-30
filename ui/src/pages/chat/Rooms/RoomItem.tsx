import './RoomItem.css';

interface Props {
  handleDelete: () => void;
  changeRoom: () => void;
  name: string;
  selected?: boolean;
}

export const RoomItem = (props: Props) => {
  const {name, selected, handleDelete, changeRoom} = props;

  return (
    <div
      className={`room-item ${selected ? 'room-item__selected' : ''}`}
      onClick={changeRoom}
    >
      <div className="room-item__name">{name}</div>
      <button className="room-item__delete-btn" onClick={handleDelete}>
        {`\u2613`}
      </button>
    </div>
  );
};
