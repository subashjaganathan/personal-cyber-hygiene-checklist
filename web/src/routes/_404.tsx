// src/routes/_404.tsx
import { component$ } from '@builder.io/qwik';
import { withBase } from '~/utils/base';

export default component$(() => {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href={withBase("/")}>Go back to the homepage</a>
    </div>
  );
});
