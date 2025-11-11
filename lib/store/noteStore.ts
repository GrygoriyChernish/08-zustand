// import { title } from "process"

// Створіть у папці lib/store файл noteStore.ts і реалізуйте в ньому Zustand-стор з наступними функціями:

// draft: об’єкт, що містить тимчасові дані форми нотатки (title, content, tag).
// setDraft(note): функція для оновлення полів чернетки.
//   clearDraft(): функція для очищення чернетки до початкового стану.У якості початкового стану використовуйте наступний об’єкт

//   const initialDraft = {
//   title: '',
//   content: '',
//   tag: 'Todo',
// };
import { NoteTag } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DraftNote {
  title: string;
  content: string;
  tag: NoteTag;
}

type NoteDraftStore = {
  draft: DraftNote;
  setDraft: (note: DraftNote) => void;
  clearDraft: () => void;
};

const initialDraft: DraftNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: note => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'note-draft-storage',
      partialize: state => ({ draft: state.draft }),
    }
  )
);
