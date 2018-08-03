To use ScrollSync you have to wrap your scrollable content (ensure that you have `overflow: auto`
 in CSS) in `ScrollSyncPane` and then wrap everything in `ScrollSync`.

If you want to provide a toggle for users to turn the scroll syncing on and off, you can use the `enabled={false}` setting on the main `ScrollSync` element. Note that this disables the scroll syncing for all groups.
 
```
<ScrollSync>
  <div style={{ display: 'flex', position: 'relative', height: 300 }}>
    <ScrollSyncPane>
      <div style={{overflow: 'auto'}}>
        <section style={{ height: 500 }}>
          <h1>Left Pane Content</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus
            dolorum
            est eum eveniet exercitationem iste labore minus, neque nobis odit officiis omnis
            possimus quasi rerum sed soluta veritatis.</p>
        </section>
      </div>
    </ScrollSyncPane>

    <ScrollSyncPane>
      <div style={{overflow: 'auto'}}>
        <section style={{ height: 1000 }}>
          <h1>Middle Pane Content</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus
            dolorum
            est eum eveniet exercitationem iste labore minus, neque nobis odit officiis omnis
            possimus quasi rerum sed soluta veritatis.</p>
        </section>
      </div>
    </ScrollSyncPane>

    <ScrollSyncPane>
      <div style={{overflow: 'auto'}}>
        <section style={{ height: 2000 }}>
          <h1>Right Pane Content</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus
            dolorum
            est eum eveniet exercitationem iste labore minus, neque nobis odit officiis omnis
            possimus quasi rerum sed soluta veritatis.</p>
        </section>
      </div>
    </ScrollSyncPane>
  </div>
</ScrollSync>
```

Sometimes it is useful to attach the `onScroll` event listener to a different node (for example 
to a `document.body`). Use `attachTo` prop for that.

Additionally sometimes there is need to use few independent scroll groups inside one ScrollSync.
Provide an arbitrary group name in the `group` prop to ScrollSyncPane components to limit synchronization to panes with that group name. 

```
<ScrollSync>
  <div style={{ display: 'flex', position: 'relative', height: 300 }}>
    <ScrollSyncPane group="one">
      <div style={{overflow: 'auto'}}>
        <section style={{ height: 500 }}>
          <h1>Left Pane Content</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus
            dolorum
            est eum eveniet exercitationem iste labore minus, neque nobis odit officiis omnis
            possimus quasi rerum sed soluta veritatis.</p>
        </section>
      </div>
    </ScrollSyncPane>

    <ScrollSyncPane group="two">
      <div style={{overflow: 'auto'}}>
        <section style={{ height: 1000 }}>
          <h1>Middle Pane Content</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus
            dolorum
            est eum eveniet exercitationem iste labore minus, neque nobis odit officiis omnis
            possimus quasi rerum sed soluta veritatis.</p>
        </section>
      </div>
    </ScrollSyncPane>

    <ScrollSyncPane group="one">
      <div style={{overflow: 'auto'}}>
        <section style={{ height: 2000 }}>
          <h1>Right Pane Content</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus
            dolorum
            est eum eveniet exercitationem iste labore minus, neque nobis odit officiis omnis
            possimus quasi rerum sed soluta veritatis.</p>
        </section>
      </div>
    </ScrollSyncPane>
    
    <ScrollSyncPane group="two">
      <div style={{overflow: 'auto'}}>
        <section style={{ height: 2000 }}>
          <h1>Right Pane Content</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus
            dolorum
            est eum eveniet exercitationem iste labore minus, neque nobis odit officiis omnis
            possimus quasi rerum sed soluta veritatis.</p>
        </section>
      </div>
    </ScrollSyncPane>
  </div>
</ScrollSync>
```

