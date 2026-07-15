# Four Apps. One Product System.

An interactive web presentation about Duel Engine, FreshKeeper, FlowWays, and NoteMaker.

## Preview

From this folder, run any static server. For example:

```powershell
npx serve .
```

Then open the local URL in a browser.

## Presentation controls

- Arrow keys, Page Up / Page Down, or Space: move between sections
- `F`: enter or exit full screen
- `N`: toggle speaker notes
- Click a project name in the horizontal accordion to expand it

## Configure live app previews

After verifying each deployment, add its URL to the `projects` object at the top of `script.js`:

```js
duel: { title: 'Duel Engine', url: 'https://your-app.vercel.app' }
```

The **Open app** controls will then load the application inside the presentation dialog. Some hosts may block iframe embedding through security headers; if that happens, change the control to open the deployment in a new browser tab.

## Story arc

1. A single builder can now own the whole product loop.
2. Four narrow use cases demonstrate different kinds of product intelligence.
3. A repeatable layered architecture supports each product.
4. AI is applied selectively, with server-side boundaries, validation, fallbacks, and human control.
5. Skills, automated testing, Git, Vercel, and Supabase reduce repeated decisions and operational overhead.
6. The result is low-tether, low-idle-cost software for specific needs.
