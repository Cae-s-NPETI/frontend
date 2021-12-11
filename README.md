# Frontend for SledAway

The frontend application for **SledAway** – a simulated ride-sharing application.

DISCLAIMER:
> SledAway is in no way a registered trademark or an official application. It is used for educational purposes to implement a ride-sharing application with modern practices, e.g. microservices. Author bears no responsibility for any injuries caused, cats killed in the using of any portion the app.

This is a project is based on the template for [Svelte](https://svelte.dev) apps. It lives at https://github.com/sveltejs/template. To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

## Kicking up the server locally

*Note that you will need to have [Node.js](https://nodejs.org) installed.*

Install the dependencies...

```bash
cd frontend
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.
