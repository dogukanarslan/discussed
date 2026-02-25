import React, { useState } from 'react';

interface Props {
  onCreate: (name: string, description?: string) => void;
}

export const CreateRoomForm = (props: Props) => {
  const { onCreate } = props;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(name, description);
    setName('');
    setDescription('');
  };

  return (
    <form className="grid gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />

      <button className="w-full">Create New Room</button>
    </form>
  );
};
