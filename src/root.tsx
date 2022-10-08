import { component$ } from '@builder.io/qwik';
import { QwikCity, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';

import './global.css';

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCity> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */
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
        <script>
        if (window.netlifyIdentity) {
            window.netlifyIdentity.on("init", user => {
              if (!user) {
                window.netlifyIdentity.on("login", () => {
                  document.location.href = "/admin/";
                });
              }
            });
          }
        </script>
      </body>
    </QwikCity>
  );
});
