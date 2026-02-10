import './Rooms.css';

interface Props {
  rooms: { name: string; id: number }[];
  selectedRoomId?: number;
  changeRoom: (roomId: number) => void;
}

export const Rooms = (props: Props) => {
  const { rooms, selectedRoomId, changeRoom } = props;

  return (
    <div className="rooms">
      <div className="rooms__select">
        <select
          value={selectedRoomId || ''}
          onChange={(e) => changeRoom(Number(e.target.value))}
        >
          <option value="" hidden disabled>
            Select a room
          </option>
          {rooms.map((room) => (
            <option value={room.id} key={room.id}>
              {room.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
