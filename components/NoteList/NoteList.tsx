import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteNote } from '@/lib/api';
import { Note } from '@/types/note';
import Link from 'next/link';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: () => {},
  });
  return (
    <ul className={css.list}>
      {notes.map(({ id, title, tag, content }) => (
        <li className={css.listItem} key={id}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <Link href={`/notes/${id}`}>View details</Link>
            <button onClick={() => mutation.mutate(id)} className={css.button}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
