import React from "react";

type CallbackRef<T> = (element: T | undefined) => void;

export const useElement = <T extends HTMLElement>(): [
  HTMLElement | undefined,
  CallbackRef<T>
] => {
  // Adapted from [official hooks FAQ](https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node)
  const [element, setElement] = React.useState<T>();
  const ref = React.useCallback<CallbackRef<T>>((el) => {
    if (el === null) {
      return;
    }
    setElement(el);
  }, []);
  return [element, ref];
};
