import type { UserModel } from '@/App';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { MessageList } from '../chat/MessageList/MessageList';

export type MessageModel = {
  id: number;
  message: string;
  username: string;
  created_at: string;
};

interface Props {
  user: UserModel;
}

export const SubjectDetail = (props: Props) => {
  const { user } = props;

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessageModel[]>([]);

  const { subjectId } = useParams();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/messages`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        message,
        subject_id: subjectId,
        user_id: user.id,
      }),
    });
    if (res.ok) {
      setMessage('');
    }
  };

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/subjects/${subjectId}`);
      const data = await res.json();
      setMessages(data.messages);
    })();
  }, [subjectId]);

  return (
    <div>
      <MessageList msgs={messages} user={user} />
      <form onSubmit={handleSubmit}>
        <input
          placeholder="What are your thoughts?"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
};
