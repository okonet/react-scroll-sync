import type { Meta, StoryObj } from '@storybook/react';

import { ScrollSync } from '../src/components/ScrollSync';
import {
  ScrollSyncPane,
  ScrollSyncPaneProps,
} from '../src/components/ScrollSyncPane';

const meta = {
  argTypes: {},
  component: ScrollSyncPane,
  parameters: {
    layout: 'centered',
  },
  title: 'Components/ScrollSyncPane',
} satisfies Meta<typeof ScrollSyncPane>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    group: ['default'],
  } as ScrollSyncPaneProps,
  render: (args) => {
    return (
      <ScrollSync>
        <div style={{ display: 'flex', height: 300, position: 'relative' }}>
          <ScrollSyncPane {...args}>
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
          <ScrollSyncPane {...args}>
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
          <ScrollSyncPane {...args}>
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
