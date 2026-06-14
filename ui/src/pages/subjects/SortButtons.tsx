export type SortOption = 'default' | 'name' | 'created_at';

const labels: Record<SortOption, string> = {
  default: 'Default',
  name: 'Name',
  created_at: 'Created At',
};

interface Props {
  sort: SortOption;
  changeSort: (option: SortOption) => void;
}

export const SortButtons = (props: Props) => {
  const { sort, changeSort } = props;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-slate-600">Sort:</span>
      <div className="flex overflow-hidden rounded-md text-sm">
        {(['default', 'name', 'created_at'] as const).map((option) => (
          <button
            key={option}
            onClick={() => changeSort(option)}
            className={`px-3 py-1.5 transition-colors ${
              sort === option
                ? 'bg-slate-700! text-white!'
                : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            {labels[option]}
          </button>
        ))}
      </div>
    </div>
  );
};
