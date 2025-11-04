import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onSearch: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  return (
    <input
      onChange={onSearch}
      defaultValue={value}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}
