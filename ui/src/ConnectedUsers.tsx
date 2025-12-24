import {useEffect, useState} from 'react';
import {io} from 'socket.io-client';

export const ConnectedUsers = () => {
  const [users, setUsers] = useState<{username: string}[]>([]);

  useEffect(() => {
    fetch(`/api/connected-users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_BASE_URL);
    socket.on('connectedUsers', (data: {username: string}[]) => {
      console.log('data', data);
      setUsers(data);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  return (
    <div className="connected-users">
      <h4>Connected Users</h4>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.username} className="user">
              {user.username}
            </li>
          ))}
        </ul>
      ) : (
        'No connected users'
      )}
    </div>
  );
};
