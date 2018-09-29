To use ScrollSync you have to wrap your scrollable content (ensure that you have `overflow: auto`
 in CSS) in `ScrollSyncPane` and then wrap everything in `ScrollSync`.

If you want to provide a toggle for users to turn the scroll syncing on and off, you can use the `enabled={false}` setting on the `ScrollSync` or `ScrollSyncPane` elements. Note that `<ScrollSync enabled={false}>` disables the scroll syncing for all groups.
 
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

In some situations, it is also useful for a `ScrollSyncPane` to belong to multiple groups. In these cases, provide an array of group names to the `group` prop.

```
const cellStyle = { minWidth: 200, padding: '.5em 1em', textAlign: 'left', borderLeft: '1px solid white', borderBottom: '1px solid white'};

<ScrollSync>
  <div style={{ display: 'flex', position: 'relative', height: 300 }}>
    <table style={{ minWidth: 200, borderCollapse: 'collapse' }}>
      <thead style={{ display: 'block', minWidth: 200, overflow: 'auto', color: 'white', background: 'grey' }}>
        <tr>
        <th style={cellStyle}>Fixed Column Header</th>
        </tr>
      </thead>
      <ScrollSyncPane group="vertical">
        <tbody style={{ display: 'block', minWidth: 200, height: 200, overflowY: 'auto', background: 'lightblue' }}>
        <tr>
          <td style={cellStyle}>Fixed Column, Row 1</td>
        </tr>
        <tr>
          <td style={cellStyle}>Fixed Column, Row 2</td>
        </tr>
        <tr>
          <td style={cellStyle}>Fixed Column, Row 3</td>
        </tr>
        <tr>
          <td style={cellStyle}>Fixed Column, Row 4</td>
        </tr>
        <tr>
          <td style={cellStyle}>Fixed Column, Row 5</td>
        </tr>
        <tr>
          <td style={cellStyle}>Fixed Column, Row 6</td>
        </tr>
        <tr>
          <td style={cellStyle}>Fixed Column, Row 7</td>
        </tr>
        <tr>
          <td style={cellStyle}>Fixed Column, Row 8</td>
        </tr>
        <tr>
          <td style={cellStyle}>Fixed Column, Row 9</td>
        </tr>
        <tr>
          <td style={cellStyle}>Fixed Column, Row 10</td>
        </tr>
        <tr>
          <td style={cellStyle}>Fixed Column, Row 11</td>
        </tr>
        <tr>
          <td style={cellStyle}>Fixed Column, Row 12</td>
        </tr>
        </tbody>
      </ScrollSyncPane>
    </table>
    <table style={{ width: 400, borderCollapse: 'collapse' }}>
      <ScrollSyncPane group="horizontal">
        <thead style={{ display: 'block', width: 400, overflow: 'auto', color: 'white', background: 'black' }}>
          <tr>
          <th style={cellStyle}>Table 2 - Header 1</th>
          <th style={cellStyle}>Table 2 - Header 2</th>
          <th style={cellStyle}>Table 2 - Header 3</th>
          </tr>
        </thead>
      </ScrollSyncPane>
      <ScrollSyncPane group={["horizontal", "vertical"]}>
        <tbody style={{ display: 'block', width: 400, height: 200, overflow: 'auto', background: 'pink' }}>
        <tr>
          <td style={cellStyle}>Cell 1, Row 1</td>
          <td style={cellStyle}>Cell 2, Row 1</td>
          <td style={cellStyle}>Cell 3, Row 1</td>
        </tr>
        <tr>
          <td style={cellStyle}>Cell 1, Row 2</td>
          <td style={cellStyle}>Cell 2, Row 2</td>
          <td style={cellStyle}>Cell 3, Row 2</td>
        </tr>
        <tr>
          <td style={cellStyle}>Cell 1, Row 3</td>
          <td style={cellStyle}>Cell 2, Row 3</td>
          <td style={cellStyle}>Cell 3, Row 3</td>
        </tr>
        <tr>
          <td style={cellStyle}>Cell 1, Row 4</td>
          <td style={cellStyle}>Cell 2, Row 4</td>
          <td style={cellStyle}>Cell 3, Row 4</td>
        </tr>
        <tr>
          <td style={cellStyle}>Cell 1, Row 5</td>
          <td style={cellStyle}>Cell 2, Row 5</td>
          <td style={cellStyle}>Cell 3, Row 5</td>
        </tr>
        <tr>
          <td style={cellStyle}>Cell 1, Row 6</td>
          <td style={cellStyle}>Cell 2, Row 6</td>
          <td style={cellStyle}>Cell 3, Row 6</td>
        </tr>
        <tr>
          <td style={cellStyle}>Cell 1, Row 7</td>
          <td style={cellStyle}>Cell 2, Row 7</td>
          <td style={cellStyle}>Cell 3, Row 7</td>
        </tr>
        <tr>
          <td style={cellStyle}>Cell 1, Row 8</td>
          <td style={cellStyle}>Cell 2, Row 8</td>
          <td style={cellStyle}>Cell 3, Row 8</td>
        </tr>
        <tr>
          <td style={cellStyle}>Cell 1, Row 9</td>
          <td style={cellStyle}>Cell 2, Row 9</td>
          <td style={cellStyle}>Cell 3, Row 9</td>
        </tr>
        <tr>
          <td style={cellStyle}>Cell 1, Row 10</td>
          <td style={cellStyle}>Cell 2, Row 10</td>
          <td style={cellStyle}>Cell 3, Row 10</td>
        </tr>
        <tr>
          <td style={cellStyle}>Cell 1, Row 11</td>
          <td style={cellStyle}>Cell 2, Row 11</td>
          <td style={cellStyle}>Cell 3, Row 11</td>
        </tr>
        <tr>
          <td style={cellStyle}>Cell 1, Row 12</td>
          <td style={cellStyle}>Cell 2, Row 12</td>
          <td style={cellStyle}>Cell 3, Row 12</td>
        </tr>
        </tbody>
      </ScrollSyncPane>
    </table>
  </div>
</ScrollSync>
```
