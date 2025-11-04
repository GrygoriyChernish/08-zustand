import { fetchNotes } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';

interface NotesPageProps {
  params: Promise<{ slug: string }>;
}

export default async function NotesPage({ params }: NotesPageProps) {
  const queryClient = new QueryClient();

  const { slug } = await params;
  const tag = slug[0] === 'All' ? '' : slug[0];
  const queryKey = tag
    ? ['notes', { page: 1, searchValue: '', tag }]
    : ['notes', { page: 1, searchValue: '' }];

  await queryClient.prefetchQuery({
    queryKey: queryKey,
    queryFn: () => fetchNotes(1, '', tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
