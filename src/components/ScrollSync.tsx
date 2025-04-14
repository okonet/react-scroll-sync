import React, { PropsWithChildren, useCallback, useRef } from 'react';
import { ScrollSyncContext } from '../context/ScrollSyncContext';

export interface ScrollSyncProps {
    onSync?: (el: HTMLElement) => void;
    proportional?: boolean;
    vertical?: boolean;
    horizontal?: boolean;
    enabled?: boolean;
}

export const ScrollSync: React.FC<PropsWithChildren<ScrollSyncProps>> = ({
    children,
    onSync,
    proportional = true,
    vertical = true,
    horizontal = true,
    enabled = true,
}) => {
    const panesRef = useRef<Record<string, HTMLElement[]>>({});

    const findPane = useCallback((node: HTMLElement, group: string) => {
        if (!panesRef.current[group]) {
            return false;
        }
        return panesRef.current[group].find(pane => pane === node);
    }, []);

    const syncScrollPosition = useCallback(
        (scrolledPane: HTMLElement, pane: HTMLElement) => {
            const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } = scrolledPane;

            const scrollTopOffset = scrollHeight - clientHeight;
            const scrollLeftOffset = scrollWidth - clientWidth;

            const paneHeight = pane.scrollHeight - clientHeight;
            const paneWidth = pane.scrollWidth - clientWidth;

            if (vertical && scrollTopOffset > 0) {
                pane.scrollTop = proportional ? (paneHeight * scrollTop) / scrollTopOffset : scrollTop;
            }
            if (horizontal && scrollLeftOffset > 0) {
                pane.scrollLeft = proportional ? (paneWidth * scrollLeft) / scrollLeftOffset : scrollLeft;
            }
        },
        [proportional, vertical, horizontal]
    );

    const addEvents = useCallback(
        (node: HTMLElement, groups: string[]) => {
            node.onscroll = () => {
                if (!enabled) return;
                window.requestAnimationFrame(() => {
                    syncScrollPositions(node, groups);
                });
            };
        },
        [enabled]
    );

    const removeEvents = useCallback((node: HTMLElement) => {
        node.onscroll = null;
    }, []);

    const syncScrollPositions = useCallback(
        (scrolledPane: HTMLElement, groups: string[]) => {
            groups.forEach(group => {
                panesRef.current[group]?.forEach(pane => {
                    if (scrolledPane !== pane) {
                        removeEvents(pane);
                        syncScrollPosition(scrolledPane, pane);
                        window.requestAnimationFrame(() => {
                            addEvents(pane, groups);
                        });
                    }
                });
            });
            onSync?.(scrolledPane);
        },
        [onSync, syncScrollPosition, removeEvents, addEvents]
    );

    const registerPane = useCallback(
        (node: HTMLElement, groups: string[]) => {
            groups.forEach(group => {
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
            groups.forEach(group => {
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