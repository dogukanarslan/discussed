type Room = {
  id: number;
  name: string;
  description?: string | null;
};

interface Props {
  room: Room;
  onDelete: (roomId: number) => void;
}

export const RoomListItem = (props: Props) => {
  const { room, onDelete } = props;

  return (
    <div className="group relative flex shrink-0 items-start justify-between gap-3 overflow-hidden rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="pl-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold tracking-tight text-slate-900">
            {room.name}
          </span>
        </div>
        <div className="mt-1 text-sm leading-relaxed text-slate-600">
          {room.description?.trim() || '-'}
        </div>
      </div>

      <button onClick={() => onDelete(room.id)}>Delete</button>
    </div>
  );
};
