import { useState } from 'react';

import type { SubjectData } from '@/types/api';
import { apiPost } from '@/api';

export const useCreateSubject = () => {
  const [data, setData] = useState<SubjectData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSubject = async (
    name: string,
    description: string,
    userId: number,
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const subject = await apiPost<SubjectData>('/api/subjects', {
        name,
        description,
        user_id: userId,
      });

      setData(subject);
      return subject;
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, createSubject };
};
