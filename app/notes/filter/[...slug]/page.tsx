import { fetchNotes } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { Metadata } from 'next';

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Notes by tag: ${slug}`,
    description: `Filtered notes by ${slug}`,
    openGraph: {
      title: `Notes by tag: ${slug}`,
      description: `Filtered notes by ${slug}`,
      url: `https://notehub.com/notes/${slug.join('')}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `${slug}`,
        },
      ],
      type: 'article',
    },
  };
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
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
