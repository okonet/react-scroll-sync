import React, { FC, PropsWithChildren, useCallback, useRef } from 'react';

import { ScrollSyncContext } from '../hooks/useScrollSyncContext';

export interface ScrollSyncProps {
  enabled?: boolean;
  horizontal?: boolean;
  onSync?: (el: HTMLElement) => void;
  proportional?: boolean;
  vertical?: boolean;
}

export const ScrollSync: FC<PropsWithChildren<ScrollSyncProps>> = ({
  children,
  enabled = true,
  horizontal = true,
  onSync,
  proportional = true,
  vertical = true,
}) => {
  const panesRef = useRef<Record<string, HTMLElement[]>>({});

  const findPane = useCallback((node: HTMLElement, group: string) => {
    if (!panesRef.current[group]) {
      return false;
    }
    return panesRef.current[group].find((pane) => pane === node);
  }, []);

  const syncScrollPosition = useCallback(
    (scrolledPane: HTMLElement, pane: HTMLElement) => {
      const {
        clientHeight,
        clientWidth,
        scrollHeight,
        scrollLeft,
        scrollTop,
        scrollWidth,
      } = scrolledPane;

      const scrollTopOffset = scrollHeight - clientHeight;
      const scrollLeftOffset = scrollWidth - clientWidth;

      /* Calculate the actual pane height */
      const paneHeight = pane.scrollHeight - clientHeight;
      const paneWidth = pane.scrollWidth - clientWidth;
      /* Adjust the scrollTop position of it accordingly */
      if (vertical && scrollTopOffset > 0) {
        pane.scrollTop = proportional
          ? (paneHeight * scrollTop) / scrollTopOffset
          : scrollTop;
      }
      if (horizontal && scrollLeftOffset > 0) {
        pane.scrollLeft = proportional
          ? (paneWidth * scrollLeft) / scrollLeftOffset
          : scrollLeft;
      }
    },
    [proportional, vertical, horizontal]
  );

  const removeEvents = useCallback((node: HTMLElement) => {
    node.onscroll = null;
  }, []);

  const addEvents = useCallback(
    (node: HTMLElement, groups: string[]) => {
      node.onscroll = () => {
        if (!enabled) return;
        window.requestAnimationFrame(() => {
          groups.forEach((group) => {
            panesRef.current[group]?.forEach((pane) => {
              /* For all panes beside the currently scrolling one */
              if (node !== pane) {
                removeEvents(pane);
                syncScrollPosition(node, pane);
                /* Re-attach event listeners after we're done scrolling */
                window.requestAnimationFrame(() => {
                  const paneGroups = Object.keys(panesRef.current).filter(
                    (paneGroup) => panesRef.current[paneGroup].includes(pane)
                  );
                  addEvents(pane, paneGroups);
                });
              }
            });
          });
        });

        if (onSync) {
          onSync(node);
        }
      };
    },
    [onSync, removeEvents, syncScrollPosition, enabled]
  );

  const registerPane = useCallback(
    (node: HTMLElement, groups: string[]) => {
      groups.forEach((group) => {
        if (!panesRef.current[group]) {
          panesRef.current[group] = [];
        }

        if (!findPane(node, group)) {
          if (panesRef.current[group].length > 0) {
            syncScrollPosition(panesRef.current[group][0], node);
          }
          panesRef.current[group].push(node);
        }
      });
      addEvents(node, groups);
    },
    [findPane, syncScrollPosition, addEvents]
  );

  const unregisterPane = useCallback(
    (node: HTMLElement, groups: string[]) => {
      groups.forEach((group) => {
        if (findPane(node, group)) {
          removeEvents(node);
          const index = panesRef.current[group].indexOf(node);
          if (index !== -1) {
            panesRef.current[group].splice(index, 1);
          }
        }
      });
    },
    [findPane, removeEvents]
  );

  return (
    <ScrollSyncContext.Provider value={{ registerPane, unregisterPane }}>
      {React.Children.only(children)}
    </ScrollSyncContext.Provider>
  );
};
