import React, { Children, ReactElement, cloneElement, useEffect, useRef } from 'react';
import { useScrollSyncContext } from '../context/ScrollSyncContext';

export interface ScrollSyncPaneProps {
    children: ReactElement;
    attachTo?: React.RefObject<HTMLElement> | ((node: HTMLElement) => void);
    group?: string | string[];
    enabled?: boolean;
    innerRef?: React.Ref<HTMLElement>;
}

const castArray = (groups: string | string[]): string[] => (Array.isArray(groups) ? groups : [groups]);

export const ScrollSyncPane: React.FC<ScrollSyncPaneProps> = ({
    children,
    attachTo,
    group = 'default',
    enabled = true,
    innerRef,
}) => {
    const context = useScrollSyncContext();
    const childRef = useRef<HTMLElement | null>(null);
    const nodeRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const updateNode = () => {
            if (attachTo) {
                nodeRef.current = typeof attachTo === 'function' ? null : attachTo.current;
            } else {
                nodeRef.current = childRef.current;
            }
        };

        updateNode();

        if (enabled && nodeRef.current) {
            context.registerPane(nodeRef.current, castArray(group));
        }

        return () => {
            if (enabled && nodeRef.current) {
                context.unregisterPane(nodeRef.current, castArray(group));
            }
        };
    }, [attachTo, group, enabled, context]);

    if (attachTo) {
        return children;
    }

    return cloneElement(Children.only(children), {
        ref: (node: HTMLElement | null) => {
            childRef.current = node;
            if (typeof innerRef === 'function') {
                innerRef(node);
            } else if (innerRef && 'current' in innerRef) {
                (innerRef as React.MutableRefObject<HTMLElement | null>).current = node;
            }
        },
    });
};