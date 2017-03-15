To use ScrollSync just put the scrollable content inside a `ScrollSync`.

```
<ScrollSync style={{ display: 'flex', position: 'relative', height: 300 }}>
  <section style={{ height: 500 }}>
    <h1>Left Pane Content</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus
      dolorum
      est eum eveniet exercitationem iste labore minus, neque nobis odit officiis omnis
      possimus quasi rerum sed soluta veritatis.</p>
  </section>
  <section style={{ height: 1000 }}>
    <h1>Middle Pane Content</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus
      dolorum
      est eum eveniet exercitationem iste labore minus, neque nobis odit officiis omnis
      possimus quasi rerum sed soluta veritatis.</p>
  </section>
  <section style={{ height: 2000 }}>
    <h1>Right Pane Content</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus
      dolorum
      est eum eveniet exercitationem iste labore minus, neque nobis odit officiis omnis
      possimus quasi rerum sed soluta veritatis.</p>
  </section>
</ScrollSync>
```

Sometimes it is useful to attach the `onScroll` event listener to a different node (for example
to a `document.body`). Use `attachTo` prop for that.
