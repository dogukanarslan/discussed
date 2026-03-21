import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';

import { RoomListItem } from '@/pages/rooms/RoomListItem';
import { apiFetch } from '@/api';

type Room = {
  id: number;
  name: string;
  description?: string | null;
};

export const Rooms = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [rooms, setRooms] = useState<Room[]>();
  const [search, setSearch] = useState(searchParams.get('name') || '');

  const deleteRoom = (roomId: number) => {
    apiFetch(`/api/rooms/${roomId}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.ok) {
        if (rooms) {
          setRooms(rooms.filter((room) => room.id !== roomId));
        }
      }
    });
  };

  useEffect(() => {
    apiFetch(`/api/rooms`)
      .then((res) => res.json())
      .then((data: Room[]) => {
        setRooms(data);
      });
  }, []);

  const handleSearch: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setSearchParams({ name: search });
  };

  const filteredRooms =
    rooms?.filter((room) =>
      room.name
        .toLowerCase()
        .includes((searchParams.get('name') || '').toLowerCase()),
    ) || [];

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex justify-between items-center rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Rooms</h3>
          <p className="text-sm text-slate-500">
            Browse, search, and manage your rooms.
          </p>
        </div>
        <Link
          to="/rooms/create"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-sm font-medium shadow-sm"
        >
          Create New Room
        </Link>
      </div>

      <form
        onSubmit={handleSearch}
        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm"
      >
        <input
          type="text"
          placeholder="Search room"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
        />
        <button className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-emerald-500">
          Search
        </button>
      </form>

      {filteredRooms && filteredRooms.length > 0 ? (
        <div className="flex flex-col gap-3 overflow-y-auto rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
          {filteredRooms.map((room) => (
            <RoomListItem key={room.id} room={room} onDelete={deleteRoom} />
          ))}
        </div>
      ) : (
        'No rooms'
      )}
    </div>
  );
};
