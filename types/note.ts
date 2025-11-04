export type NoteTag = 'Todo' | 'Shopping' | 'Meeting' | 'Personal' | 'Work';

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export interface NewNoteContent {
  title: string;
  content?: string;
  tag: NoteTag;
}
