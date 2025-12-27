import {useEffect, useState} from 'react';
import {socket} from '../../../socket';

import './ConnectesUsers.css';

export const ConnectedUsers = () => {
  const [users, setUsers] = useState<{username: string}[]>([]);
  useEffect(() => {
    const updateUsers = (data: {username: string}[]) => {
      console.log('UPDATING USERS...');
      setUsers(data);
    };

    socket.on('users:update', updateUsers);

    return () => {
      socket.off('users:update', updateUsers);
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
