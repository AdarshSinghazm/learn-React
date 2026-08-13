# React Intro — Setup, Components, Virtual DOM

## 1. Project Structure Recap

Vite + React project entry flow:

```
index.html  →  loads src/main.jsx  →  renders App.jsx  →  renders child components
```

`index.html` has one empty div:
```html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```
React takes over this single div and injects the entire UI into it. Nothing else in `index.html` is touched by React.

## 2. My Code (working example)

**main.jsx** — the entry point / "ignition switch"
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```
- `document.getElementById('root')` grabs the empty div from `index.html`
- `createRoot()` tells React "manage everything inside this div"
- `.render(<App />)` renders the App component into it
- `<StrictMode>` — dev-only wrapper that helps catch bugs (does nothing in production)

**App.jsx** — root component
```jsx
import Adarsh from './adarsh.jsx'

function App() {
  return (
    <Adarsh />
  )
}

export default App
```

**adarsh.jsx** — a child component
```jsx
function Adarsh(){
    return(
        <h1> Hi I am Adarsh </h1>
    )
}

export default Adarsh
```

Render chain: `main.jsx → App.jsx → Adarsh component → <h1>` on screen.

## 3. Components — the core building block

A component is just a JS function that returns UI (JSX). Rules:
- Function name **must start with a capital letter** (`Adarsh`, not `adarsh`) — lowercase names are treated by React as plain HTML tags, not components.
- Must `return` a single root element (or use a fragment `<>...</>` to wrap multiple).
- Exported with `export default` so other files can `import` and use it.

Components can be nested infinitely — `App` renders `Adarsh`, `Adarsh` could render more components inside it, and so on. This is how big UIs are built: small pieces composed into bigger ones.

## 4. JSX — what that `<h1>...</h1>` inside JS actually is

JSX looks like HTML but it's not. It's syntax sugar that compiles down to plain JS function calls, roughly:

```jsx
<h1>Hi I am Adarsh</h1>
```
compiles to something like:
```js
React.createElement('h1', null, 'Hi I am Adarsh')
```

Key JSX rules (differences from plain HTML):
- `class` → `className`
- Every tag must self-close: `<img />`, `<br />`
- One root element returned per component
- `{ }` embeds real JS expressions inside the markup: `<h1>Hello {name}</h1>`

## 5. The Virtual DOM — why React is fast

**The problem with plain JS/DOM manipulation:** every time you touch the real DOM (`element.innerHTML = ...`), the browser has to recalculate layout, styles, repaint — this is expensive if done a lot.

**React's approach:**
1. React keeps an in-memory JS object representation of the UI — the **Virtual DOM**. It's a lightweight copy of the real DOM tree.
2. When state/props change, React doesn't touch the real DOM immediately. Instead it builds a **new** Virtual DOM tree reflecting the updated UI.
3. React compares (**diffs**) the new Virtual DOM tree against the previous one — this process is called **reconciliation**.
4. React figures out the *minimum* set of changes needed and only updates those specific real DOM nodes — this is called **patching** or **committing**.

So instead of "re-render everything," it's "figure out exactly what changed, touch only that."

**Simple flow:**
```
State changes
   ↓
React builds new Virtual DOM tree
   ↓
Diffs new tree vs old tree (reconciliation)
   ↓
Calculates minimal real DOM updates
   ↓
Applies only those changes to actual DOM (commit)
```

This is why React feels fast even in apps with frequent UI updates — it avoids unnecessary, expensive real-DOM writes.

## 6. Key takeaways

- One `<div id="root">` in `index.html`, React owns everything inside it.
- `main.jsx` is the boot file — rarely touched after setup.
- Components = functions returning JSX, capital-letter names, composed into trees.
- Virtual DOM = React's internal lightweight copy of the UI, used to calculate the smallest possible real DOM update via diffing.
- You describe *what the UI should look like*, React figures out *how to get the real DOM there*.
