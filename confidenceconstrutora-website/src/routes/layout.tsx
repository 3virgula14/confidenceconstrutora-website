import { component$, Slot } from '@builder.io/qwik';
import Header from '../components/header/header';

export default component$(() => {
  return (
    <>
      <main>
        <Header />
        <section>
          <Slot />
        </section>
      </main>
      <footer>
      <h3 className="rodape-text">
        Agradecimentos a todos que me dão força
      </h3>
      </footer>
    </>
  );
});
