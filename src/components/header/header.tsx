import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { QwikLogo } from '../icons/qwik';
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
        <div id="acesso"><button id="acessar">Acessar</button><span id="itens"><icon id="carrinho"></icon>
        <span id="n-items">(0)</span></span></div>
      </ul>
     </nav> 
    </header>
  );
});
