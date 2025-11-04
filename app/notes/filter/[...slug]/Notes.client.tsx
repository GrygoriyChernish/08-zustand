'use client';

import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import css from './NotesPage.module.css';

import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes } from '@/lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import NotFoundNotes from '@/components/NotFoundNotes/NotFoundNotes';
import { useParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { slug } = useParams<{ slug: string }>();
  const tag = slug && slug[0] === 'All' ? '' : slug[0];
  const queryKey = tag
    ? ['notes', { page, searchValue, tag }]
    : ['notes', { page, searchValue }];

  const { data, isSuccess } = useQuery({
    queryKey: queryKey,
    queryFn: () => fetchNotes(page, searchValue, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handleChange = useDebouncedCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(evt.target.value.trim());
    },
    500
  );

  const closeModal = () => setIsModalOpen(false);

  const totalPages = data?.totalPages || 0;
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchValue} onSearch={handleChange} />
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} page={page} setPage={setPage} />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      {isSuccess && data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        <NotFoundNotes />
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
