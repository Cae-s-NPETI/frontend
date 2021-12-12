# Frontend for SledAway

The frontend application for **SledAway** – a simulated ride-sharing application.

DISCLAIMER:
> SledAway is in no way a registered trademark or an official application. It is used for educational purposes to simulate a ride-sharing application with modern practices, e.g. microservices. Author bears no responsibility for any injuries caused, cats killed in the using of any portion the app.

SledAway's frontend application is created with bleeding-edge `svelte@next` (a.k.a.[SvelteKit](https://kit.svelte.dev/)). Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte);

## Kicking up the server locally
Prerequisites:
- [Node.js](https://nodejs.org)

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Navigate to [localhost:3000](http://localhost:3000). You should see the app running.
