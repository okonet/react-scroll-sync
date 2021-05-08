## Usage

Before using `useScrollSync`, set `overflow: auto` for the elements you wish to syncronize.

Then, [access the HTML elements via a `useCallback`](https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node). For convenience, `react-scroll-sync` provides the `useElement` hook.

```tsx
import { useElement } from "react-scroll-sync";

const MyComponent = () => {
  const [el1, el1Ref] = useElement();
  const [el2, el2Ref] = useElement();
  const [el3, el3Ref] = useElement();
  return (
    <>
      <div ref={el1Ref} style={{ overflow: "auto" }}>
        {/* ... */}
      </div>
      <div ref={el2Ref} style={{ overflow: "auto" }}>
        {/* ... */}
      </div>
      <div ref={el3Ref} style={{ overflow: "auto" }}>
        {/* ... */}
      </div>
    </>
  );
};
```

Finally, pass the elements to `useScrollSync`:

```tsx
import { useElement, useScrollSync } from "react-scroll-sync";

const MyComponent = () => {
  const [el1, el1Ref] = useElement();
  const [el2, el2Ref] = useElement();
  const [el3, el3Ref] = useElement();
  useScrollSync([el1, el2, el3]);
  return (
    <>
      <div ref={el1Ref} style={{ overflow: "auto" }}>
        {/* ... */}
      </div>
      <div ref={el2Ref} style={{ overflow: "auto" }}>
        {/* ... */}
      </div>
      <div ref={el3Ref} style={{ overflow: "auto" }}>
        {/* ... */}
      </div>
    </>
  );
};
```

## Options

### axis

By default, both the x and y axes will be synchronized.
If you want to target only the x or y axis, use the `axis` option:

```tsx
// synchronize both axis [default]
useScrollSync([el1, el2, el3], { axis: "both" });

// synchronize x axis only
useScrollSync([el1, el2, el3], { axis: "horizontal" });

// synchronize y axis only
useScrollSync([el1, el2, el3], { axis: "vertical" });
```

### mode

By default, elements are scrolled _proportionally_.
So if one element is scrolled by 30%, the other synchronized elements will also scroll by 30%.

An alternate mode is _absolute_ scrolling: if one element is scrolled by 30px,
the other synchronized elements will also scroll by 30px. To use absolute scrolling:

```tsx
// synchronize scroll proportionally (i.e. by percentage) [default]
useScrollSync([el1, el2, el3], { mode: "proportional" });

// synchronize scroll absolutely (i.e. by pixels)
useScrollSync([el1, el2, el3], { mode: "absolute" });
```
