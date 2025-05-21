# RedwoodSDK Minimal Starter

This starter gives you a bare-bones RedwoodSDK project.

This example goes a step further: it shows how to create a custom `Document` with RedwoodSDK that bootstraps [HTMX](https://htmx.org/) on the page. HTMX is then used to progressively load and swap **React** components—so you get the best of both worlds: HTMX's terse, server-driven interactions and React's rich client-side UI when you need it.

Create your new project:

```shell
npx degit redwoodjs/sdk/starters/minimal my-project-name
cd my-project-name
pnpm install
```

## Running the dev server

```shell
pnpm dev
```

Point your browser to the URL displayed in the terminal (e.g. `http://localhost:5173/`). You should see a "Hello World" message in your browser.

## HTMX + React

1. We extend RedwoodSDK's default `Document` to add the script tag that imports `htmx.min.js`.
2. Page markup includes `hx-get`/`hx-swap` attributes that ask HTMX to fetch fragments rendered by React components.
3. The fetched HTML contains a placeholder div and the pre-rendered component markup. A small client script mounts the matching React component so it becomes fully interactive.

This pattern lets you keep pages fast and simple while still sprinkling complex React widgets where they add value.

## Further Reading

- [RedwoodSDK Documentation](https://docs.rwsdk.com/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers)
