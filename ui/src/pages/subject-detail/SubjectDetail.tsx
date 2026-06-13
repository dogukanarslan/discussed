import { apiGet, apiPost } from '@/api';
import type { UserData, SubjectDetailData } from '@/types/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { MessageList } from '../chat/MessageList/MessageList';

interface Props {
  user: UserData;
}

export const SubjectDetail = (props: Props) => {
  const { user } = props;

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<SubjectDetailData['messages']>([]);

  const { subjectId } = useParams();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    await apiPost('/api/messages', {
      message,
      subject_id: subjectId,
      user_id: user.id,
    });
    setMessage('');
  };

  useEffect(() => {
    (async () => {
      const data = await apiGet<SubjectDetailData>(`/api/subjects/${subjectId}`);
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
