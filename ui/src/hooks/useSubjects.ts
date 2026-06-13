import { useEffect, useState } from 'react';

import type { SubjectData } from '@/types/api';
import { apiGet } from '@/api';

export const useSubjects = () => {
  const [data, setData] = useState<SubjectData[]>([]);
  const [loading, setLoading] = useState(true);
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
          setLoading(false);
        }
      } catch (e) {
        if (!ctrl.signal.aborted) {
          setLoading(false);
          setError(e instanceof Error ? e.message : 'Unknown error');
        }
      }
    })();

    return () => ctrl.abort();
  }, []);

  return { data, loading, error };
};
