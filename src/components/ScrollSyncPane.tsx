import {
  cloneElement,
  FC,
  ReactElement,
  RefCallback,
  RefObject,
  useCallback,
  useEffect,
  useRef,
} from 'react';

import { useScrollSyncContext } from '../hooks/useScrollSyncContext';

export interface ScrollSyncPaneProps {
  attachTo?: RefCallback<HTMLElement> | RefObject<HTMLElement>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactElement<any>;
  enabled?: boolean;
  group?: string | string[];
  innerRef?: RefCallback<HTMLElement> | RefObject<HTMLElement>;
}

const castArray = (groups: string | string[]): string[] =>
  Array.isArray(groups) ? groups : [groups];

export const ScrollSyncPane: FC<ScrollSyncPaneProps> = ({
  attachTo,
  children,
  enabled = true,
  group = 'default',
  innerRef,
}) => {
  const context = useScrollSyncContext();
  const childRef = useRef<HTMLElement | null>(null);
  const nodeRef = useRef<HTMLElement | null>(null);

  const updateNode = useCallback(() => {
    if (attachTo) {
      nodeRef.current =
        typeof attachTo === 'function' ? null : attachTo.current;
    } else {
      nodeRef.current = childRef.current;
    }
  }, [attachTo]);

  useEffect(() => {
    updateNode();

    if (enabled && nodeRef.current) {
      context.registerPane(nodeRef.current, castArray(group));
    }
    return () => {
      if (enabled && nodeRef.current) {
        context.unregisterPane(nodeRef.current, castArray(group));
      }
    };
  }, [context, enabled, group, attachTo, updateNode]);

  if (attachTo) {
    return children;
  }

  return cloneElement(children, {
    ref: (node: HTMLElement | null) => {
      childRef.current = node;
      if (typeof innerRef === 'function') {
        innerRef(node);
      } else if (innerRef && node) {
        innerRef.current = node;
      }
    },
  });
};
