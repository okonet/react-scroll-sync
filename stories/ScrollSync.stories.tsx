import type { Meta, StoryObj } from '@storybook/react';

import { CSSProperties } from 'react';

import { ScrollSync } from '../src/components/ScrollSync';
import { ScrollSyncPane } from '../src/components/ScrollSyncPane';

const meta = {
  argTypes: {},
  component: ScrollSync,
  title: 'Components/ScrollSync',
} satisfies Meta<typeof ScrollSync>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    enabled: true,
    horizontal: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'To use ScrollSync you have to wrap your scrollable content (ensure that you have `overflow: auto` in CSS) in `ScrollSyncPane` and then wrap everything in `ScrollSync`. If you want to provide a toggle for users to turn the scroll syncing on and off, you can use the `enabled={false}` setting on the `ScrollSync` or `ScrollSyncPane` elements. Note that `<ScrollSync enabled={false}>` disables the scroll syncing for all groups.',
      },
    },
  },
  render: (args) => {
    return (
      <ScrollSync {...args}>
        <div style={{ display: 'flex', height: 300, position: 'relative' }}>
          <ScrollSyncPane>
            <div style={{ overflow: 'auto' }}>
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
            <div style={{ overflow: 'auto' }}>
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
            <div style={{ overflow: 'auto' }}>
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
  },
};

export const MultipleGroups: Story = {
  args: {
    enabled: true,
    horizontal: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Sometimes it is useful to attach the `onScroll` event listener to a different node (for example to a `document.body`). Use `attachTo` prop for that. Additionally sometimes there is need to use few independent scroll groups inside one ScrollSync. Provide an arbitrary group name in the `group` prop to ScrollSyncPane components to limit synchronization to panes with that group name.',
      },
    },
  },
  render: (args) => {
    return (
      <ScrollSync {...args}>
        <div style={{ display: 'flex', height: 300, position: 'relative' }}>
          <ScrollSyncPane group="one">
            <div style={{ overflow: 'auto' }}>
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
          <ScrollSyncPane group="two">
            <div style={{ overflow: 'auto' }}>
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
          <ScrollSyncPane group="one">
            <div style={{ overflow: 'auto' }}>
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
          <ScrollSyncPane group="two">
            <div style={{ overflow: 'auto' }}>
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
  },
};

export const MultipleGroupsArray: Story = {
  args: {
    enabled: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'In some situations, it is also useful for a `ScrollSyncPane` to belong to multiple groups. In these cases, provide an array of group names to the `group` prop',
      },
    },
  },
  render: (args) => {
    const cellStyle: CSSProperties = {
      borderBottom: '1px solid white',
      borderLeft: '1px solid white',
      minWidth: 200,
      padding: '.5em 1em',
      textAlign: 'left',
    };
    return (
      <ScrollSync {...args}>
        <div style={{ display: 'flex', height: 300, position: 'relative' }}>
          <table style={{ borderCollapse: 'collapse', minWidth: 200 }}>
            <thead
              style={{
                background: 'grey',
                color: 'white',
                display: 'block',
                minWidth: 200,
                overflow: 'auto',
              }}
            >
              <tr>
                <th style={cellStyle}>Fixed Column Header</th>
              </tr>
            </thead>
            <ScrollSyncPane group="vertical">
              <tbody
                style={{
                  background: 'lightblue',
                  display: 'block',
                  height: 200,
                  minWidth: 200,
                  overflowY: 'auto',
                }}
              >
                {[...Array(12)].map((_, i) => (
                  <tr key={i}>
                    <td style={cellStyle}>Fixed Column, Row {i + 1}</td>
                  </tr>
                ))}
              </tbody>
            </ScrollSyncPane>
          </table>
          <table style={{ borderCollapse: 'collapse', width: 400 }}>
            <ScrollSyncPane group="horizontal">
              <thead
                style={{
                  background: 'black',
                  color: 'white',
                  display: 'block',
                  overflow: 'auto',
                  width: 400,
                }}
              >
                <tr>
                  <th style={cellStyle}>Table 2 - Header 1</th>
                  <th style={cellStyle}>Table 2 - Header 2</th>
                  <th style={cellStyle}>Table 2 - Header 3</th>
                </tr>
              </thead>
            </ScrollSyncPane>
            <ScrollSyncPane group={['horizontal', 'vertical']}>
              <tbody
                style={{
                  background: 'pink',
                  display: 'block',
                  height: 200,
                  overflow: 'auto',
                  width: 400,
                }}
              >
                {[...Array(12)].map((_, i) => (
                  <tr key={i}>
                    <td style={cellStyle}>Cell 1, Row {i + 1}</td>
                    <td style={cellStyle}>Cell 2, Row {i + 1}</td>
                    <td style={cellStyle}>Cell 3, Row {i + 1}</td>
                  </tr>
                ))}
              </tbody>
            </ScrollSyncPane>
          </table>
        </div>
      </ScrollSync>
    );
  },
};
