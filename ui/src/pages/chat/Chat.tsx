import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Header } from '../../components/Header';
import { Rooms } from './Rooms/Rooms';
import { MessageWrapper } from './MessageWrapper/MessageWrapper';

interface Props {
  user: { username: string };
  setUser: (user: { username: string } | null) => void;
}

export const Chat = (props: Props) => {
  const { user, setUser } = props;

  const [selectedRoomId, setSelectedRoomId] = useState<number>();
  const [rooms, setRooms] = useState<{ name: string; id: number }[]>([]);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/rooms`)
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
      });
  }, []);

  useEffect(() => {
    if (
      !user &&
      location.pathname !== 'signin' &&
      location.pathname !== 'signup'
    ) {
      navigate('/signin');
    }
  }, [user, location, navigate]);

  if (!user) {
    return;
  }

  return (
    <>
      <Header user={user} setUser={setUser} />
      <div className="main">
        <Rooms
          rooms={rooms}
          setRooms={setRooms}
          selectedRoomId={selectedRoomId}
          setSelectedRoomId={setSelectedRoomId}
        />
        {selectedRoomId && (
          <MessageWrapper user={user} selectedRoomId={selectedRoomId} />
        )}
      </div>
    </>
  );
};
