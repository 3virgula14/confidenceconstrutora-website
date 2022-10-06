import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './header.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header>
     <nav>
      <ul>
        <li>Landing</li>
        <li>Quem somos</li>
        <li>Portifólio</li>
      </ul>
     </nav> 
    </header>
  );
});
