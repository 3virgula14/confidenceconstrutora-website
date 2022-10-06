import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import TempPage from '../components/temppage'

export default component$(() => {
  return (
    <div id="content">
      <TempPage/>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
};
