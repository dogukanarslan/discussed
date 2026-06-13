import type { SubjectData } from '@/types/api';
import { Link } from 'react-router';

interface Props {
  subject: SubjectData;
  onDelete: (subjectId: number) => void;
}

export const SubjectListItem = (props: Props) => {
  const {
    subject: { id, name, description },
    onDelete,
  } = props;

  return (
    <div className="group relative flex shrink-0 items-start justify-between gap-3 overflow-hidden rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="pl-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold tracking-tight text-slate-900">
            {name}
          </span>
        </div>
        <div className="mt-1 text-sm leading-relaxed text-slate-600">
          {description?.trim() || '-'}
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <button onClick={() => onDelete(id)}>Delete</button>
        <Link to={`/subjects/${id}`}>View</Link>
      </div>
    </div>
  );
};
