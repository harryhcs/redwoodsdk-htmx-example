import stylesUrl from "./styles.css?url";
import htmxUrl from "./htmx.min.js?url";

export const HTMXDocument: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>HTMX</title>
      <link rel="modulepreload" href="/src/client.tsx" />
      <script src={htmxUrl}></script>
      <link rel="stylesheet" href={stylesUrl} />
    </head>
    <body>
      <div id="root">{children}</div>
      <script>import("/src/client.tsx")</script>
      <script>import("/src/mountReact.tsx")</script>
      
    </body>
  </html>
);
