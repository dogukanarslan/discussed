import { useEffect, useState } from 'react';

import type { SubjectData } from '@/types/api';
import { apiGet } from '@/api';

export const useSubjects = () => {
  const [data, setData] = useState<SubjectData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();

    (async () => {
      try {
        const data = await apiGet<SubjectData[]>('/api/subjects', {
          signal: ctrl.signal,
        });

        if (!ctrl.signal.aborted) {
          setData(data);
        }
      } catch (e) {
        if (!ctrl.signal.aborted) {
          setError(e instanceof Error ? e.message : 'Unknown error');
        }
      } finally {
        setIsLoading(false);
      }
    })();

    return () => ctrl.abort();
  }, []);

  return { data, isLoading, error };
};
