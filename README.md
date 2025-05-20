# react-scroll-sync

Synced scroll position across multiple scrollable elements

## Demo

https://react-sync-scroll.netlify.app/

## Documentation & Example

https://react-sync-scroll.netlify.app/

## Migration from v0 to v1

If you are upgrading from `react-scroll-sync` v0 to v1, please review the [Migration Guide](./MIGRATION.md).  
Version 1.0.0 and above provide built-in TypeScript type definitions, so you **must uninstall the community `@types/react-scroll-sync` package** to avoid type conflicts. The guide includes all required steps to ensure a smooth upgrade.

## License

MIT

## Installation

```bash
npm install --save react-scroll-sync
```

## Usage

```jsx
import { FC } from "react";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";

export const MyComponent: FC = () => {
  return (
    <ScrollSync>
      <div style={{ display: "flex", position: "relative", height: 300 }}>
        <ScrollSyncPane>
          <div style={{ overflow: "auto" }}>
            <section style={{ height: 500 }}>
              <h1>Left Pane Content</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
                aperiam doloribus dolorum est eum eveniet exercitationem iste
                labore minus, neque nobis odit officiis omnis possimus quasi
                rerum sed soluta veritatis.
              </p>
            </section>
          </div>
        </ScrollSyncPane>

        <ScrollSyncPane>
          <div style={{ overflow: "auto" }}>
            <section style={{ height: 1000 }}>
              <h1>Middle Pane Content</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
                aperiam doloribus dolorum est eum eveniet exercitationem iste
                labore minus, neque nobis odit officiis omnis possimus quasi
                rerum sed soluta veritatis.
              </p>
            </section>
          </div>
        </ScrollSyncPane>

        <ScrollSyncPane>
          <div style={{ overflow: "auto" }}>
            <section style={{ height: 2000 }}>
              <h1>Right Pane Content</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
                aperiam doloribus dolorum est eum eveniet exercitationem iste
                labore minus, neque nobis odit officiis omnis possimus quasi
                rerum sed soluta veritatis.
              </p>
            </section>
          </div>
        </ScrollSyncPane>
      </div>
    </ScrollSync>
  );
};
```
