# JSX, createElement & the Element Tree

> Note: You don't write any of this manually in real projects. This is
> conceptual — mainly for interviews and understanding *why* React works
> the way it does.

## 1. JSX is not HTML

JSX is syntax sugar. Before the browser sees it, **Babel** compiles JSX
into plain JavaScript function calls.

```jsx
function Adarsh(){
    return(
        <h1> Hi I am Adarsh </h1>
    )
}
```

compiles to:

```js
function Adarsh() {
  return React.createElement('h1', null, 'Hi I am Adarsh');
}
```

## 2. `React.createElement(type, props, children)`

Takes 3 arguments:
1. **type** — a string for HTML tags (`'h1'`, `'div'`) OR the actual
   function reference for a component (`Adarsh`, `Footer`)
2. **props** — object of attributes/props (or `null`)
3. **children** — text or nested elements

It does **NOT** create real HTML. It returns a plain JS object:

```js
{
  type: 'h1',
  props: {
    children: 'Hi I am Adarsh'
  }
}
```

This object is called a **React element**. Cheap, disposable, just data.

## 3. Nested components → nested objects (the Element Tree)

```jsx
function Footer() {
  return <p>Made by Adarsh</p>
}

function Adarsh(props) {
  return <h1>Hi I am {props.name}</h1>
}

function App() {
  return (
    <div>
      <Adarsh name="Adarsh" />
      <Footer />
    </div>
  )
}
```

`App()` produces this object tree:

```js
{
  type: 'div',
  props: {
    children: [
      { type: Adarsh, props: { name: 'Adarsh' } },  // type = function itself
      { type: Footer, props: {} }
    ]
  }
}
```

Key detail: for a component, `type` is the **function reference**, not a
string. That's how React tells "HTML tag, render directly" apart from
"component, call this function to get more elements."

This nested structure of plain JS objects = the **Element Tree**, aka the
**Virtual DOM**.

## 4. React resolves the tree by calling component functions

React walks the tree. Whenever `type` is a function, it **calls it** with
the given props to get the next level of the tree.

```js
Adarsh({ name: 'Adarsh' })
// → { type: 'h1', props: { children: ['Hi I am ', 'Adarsh'] } }

Footer()
// → { type: 'p', props: { children: 'Made by Adarsh' } }
```

This keeps expanding until every node left is a plain HTML tag type —
no more component functions to resolve.

## 5. ReactDOM turns the final tree into real DOM

Once fully expanded, `ReactDOM` (via `createRoot().render()` in
`main.jsx`) walks the tree and creates actual browser DOM nodes
(`document.createElement('h1')`, etc.), then inserts them into the page.

**Full pipeline:**
```
JSX
  ↓ Babel compiles
React.createElement() calls
  ↓ returns
Plain JS objects (Element Tree / Virtual DOM)
  ↓ React resolves component functions
Fully expanded tree (all real HTML tag types)
  ↓ ReactDOM walks & builds
Real DOM nodes on the page
```

## 6. Why this matters — Reconciliation

When state changes (`useState`), React does **not** touch the real DOM
directly. It:

1. Re-runs the component function → gets a **new** element tree (new
   plain JS objects)
2. **Diffs** the new tree against the previous tree — this comparison
   process is called **reconciliation**
3. Calculates the minimum set of real DOM changes needed
4. **Patches** only those specific real DOM nodes (the *commit* phase)

This is fast because comparing plain JS objects is cheap. Directly
mutating the real DOM (layout recalculation, repaint) is expensive —
React minimizes how often that happens.

> **Fiber** — the internal algorithm/data structure React currently uses
> to do reconciliation. Lets React pause, prioritize, and resume work
> (instead of blocking the whole page on one big re-render). Good to
> know the name exists for interviews; internals go deeper than needed
> day-to-day.



**Not needed for:** writing everyday project code. You will never
manually write `createElement()` or build element trees by hand in
real projects — just write normal JSX.