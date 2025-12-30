import './RoomItem.css';

interface Props {
  id: number;
  name: string;
}

export const RoomItem = (props: Props) => {
  const {name, id} = props;

  const deleteRoom = () => {
    fetch(`/api/rooms/${id}`, {
      method: 'DELETE'
    });
  };

  return (
    <div className="room-item">
      <div className="room-item__name">{name}</div>
      <button className="room-item__delete-btn" onClick={deleteRoom}>
        X
      </button>
    </div>
  );
};
