# react-scroll-sync

Synced scroll position across multiple scrollable elements.

## Installation

```shell
$ npm install react-scroll-sync
```

## Usage

```html
<ScrollSync>
  <div style={{ display: 'flex', position: 'relative', height: 300 }}>
    <ScrollSyncPane>
      <div />
    </ScrollSyncPane>

    <ScrollSyncPane>
      <div />
    </ScrollSyncPane>
      
    <ScrollSyncPane>
      <div />
    </ScrollSyncPane>
  </div>
</ScrollSync>
```

## Documentation

http://react-sync-scroll.netlify.com/

## License

MIT

## Installation

```bash
npm install --save react-scroll-sync
```
## Usage

```jsx
import React, {Component} from 'react';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

export default class MyComponent extends Component {
    
    render() {
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

        );
    }
}
```
