import { component$ } from '@builder.io/qwik';
import { QwikCity, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import "./global.css"
import 'animate.css';


export default component$(() => {
  return (
    <QwikCity>
      <head>
        <meta charSet="utf-8" />
        <title>Confidence Construtora</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </head>
      <body lang="pt-br">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCity>
  );
});
