import { component$, Slot } from '@builder.io/qwik';
// import Header from '../components/header/header';
import "./layout.css"

export default component$(() => {
  return (
    <>
      <main>
          <Slot />
      </main>
      <footer>
      <div className="cartao">
        
        <div className="campos">
          <img src="uploads/24467-5-engineer-file.png" alt="" />
          <div>
            <input type="text" placeholder={"Seu nome"} />
            <input type="email" placeholder={"Seu email"}/>
            <input type="textarea" placeholder='Sua mensagem ...' />
          </div>
          <input type="button" value={"Enviar"}/>
        </div>
        <div className="info">
          <ul>
            <li>@confidenceimoveis</li>
            <li>contato@construtoraconfidence.com</li>
            <li>Whatsapp</li>
          </ul>
        </div>
      </div>
      </footer>
    </>
  );
});
