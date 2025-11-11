import type { Metadata } from 'next';
import css from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Page not-found',
  description: 'This page is displayed when the route is not found',
  openGraph: {
    title: `Notes Hub not-found`,
    description: 'Page not-found',
    url: `http://localhost:3000/`,
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Image for NoteHub',
      },
    ],
    type: 'website',
  },
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
