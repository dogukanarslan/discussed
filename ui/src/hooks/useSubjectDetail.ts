import { apiGet } from '@/api';
import type { SubjectDetailData } from '@/types/api';
import { useEffect, useState } from 'react';

export const useSubjectDetail = (subjectId: string) => {
  const [data, setData] = useState<SubjectDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setData(null);
    setError(null);

    const ctrl = new AbortController();
    (async () => {
      try {
        const result = await apiGet<SubjectDetailData>(
          `/api/subjects/${subjectId}`,
          { signal: ctrl.signal },
        );
        if (!ctrl.signal.aborted) {
          setData(result);
        }
      } catch (e) {
        if (!ctrl.signal.aborted) {
          setError(e instanceof Error ? e.message : 'Unknown error');
        }
      } finally {
        if (!ctrl.signal.aborted) {
          setIsLoading(false);
        }
      }
    })();

    return () => ctrl.abort();
  }, [subjectId]);

  return { data, isLoading, error };
};
