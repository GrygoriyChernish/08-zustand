import axios from 'axios';
import type { NewNoteContent, Note } from '../types/note';

axios.defaults.headers.common.Authorization = `Bearer ${
  process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
}`;
axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  page: number,
  searchQuery: string,
  tag: string
) {
  const params = tag
    ? {
        page,
        perPage: 12,
        search: searchQuery,
        tag,
      }
    : {
        page,
        perPage: 12,
        search: searchQuery,
      };
  const res = await axios.get<FetchNotesResponse>('/notes', { params });
  console.log(res.data);
  return res.data;
}

export async function fetchNoteById(id: Note['id']) {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data;
}
export async function createNote(newNote: NewNoteContent) {
  const res = await axios.post<Note>('/notes', newNote);
  return res.data;
}
export async function deleteNote(id: Note['id']) {
  const res = await axios.delete<Note>(`/notes/${id}`);
  return res.data;
}
