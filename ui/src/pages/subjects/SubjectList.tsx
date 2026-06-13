import type { SubjectData } from '@/types/api';
import { SubjectListItem } from './SubjectListItem';

interface Props {
  subjects: SubjectData[];
}

export const SubjectList = (props: Props) => {
  const { subjects } = props;

  return (
    <div className="space-y-2">
      {subjects.map((subject) => (
        <SubjectListItem
          key={subject.id}
          subject={subject}
          onDelete={() => null}
        />
      ))}
    </div>
  );
};
