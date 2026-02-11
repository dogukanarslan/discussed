interface Props {
  rooms: { name: string; id: number }[];
  selectedRoomId?: number;
  changeRoom: (roomId: number) => void;
}

export const Rooms = (props: Props) => {
  const { rooms, selectedRoomId, changeRoom } = props;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
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
