import type React from "react";
import { useEffect } from "react";

interface Options {
  proportional?: boolean;
  axis?: "horizontal" | "vertical" | "both";
}

export const useScrollSync = (
  refs: React.MutableRefObject<HTMLElement | null>[],
  { proportional = true, axis = "both" }: Options = {}
): void => {
  useEffect(() => {
    const nodes = refs
      .map((ref) => ref.current)
      .filter((n) => n !== null) as HTMLElement[];
    nodes.map((node) => {
      node.onscroll = () =>
        handleScroll(
          node,
          nodes.filter((n) => n !== node),
          { proportional, axis }
        );
    });
    return () => {
      nodes.map((node) => {
        node.onscroll = null;
      });
    };
  }, []);
};

const handleScroll = (
  leader: HTMLElement,
  followers: HTMLElement[],
  options: Options
) => {
  window.requestAnimationFrame(() => {
    syncFollowers(leader, followers, options);
  });
};

const syncFollowers = (
  leader: HTMLElement,
  followers: HTMLElement[],
  options: Options
) => {
  followers.map((follower) => {
    const { onscroll } = follower;
    follower.onscroll = null;
    syncFollower(leader, follower, options);
    window.requestAnimationFrame(() => {
      follower.onscroll = onscroll;
    });
  });
};

const syncFollower = (
  leader: HTMLElement,
  follower: HTMLElement,
  options: Options
) => {
  const {
    scrollTop,
    scrollHeight,
    clientHeight,
    scrollLeft,
    scrollWidth,
    clientWidth,
  } = leader;

  const scrollTopOffset = scrollHeight - clientHeight;
  const scrollLeftOffset = scrollWidth - clientWidth;

  const { proportional, axis } = options;

  /* Calculate the actual pane height */
  const paneHeight = follower.scrollHeight - clientHeight;
  const paneWidth = follower.scrollWidth - clientWidth;
  /* Adjust the scrollTop position of it accordingly */
  if ((axis === "both" || axis === "vertical") && scrollTopOffset > 0) {
    follower.scrollTop = proportional
      ? (paneHeight * scrollTop) / scrollTopOffset
      : scrollTop; // eslint-disable-line
  }
  if ((axis === "both" || axis === "horizontal") && scrollLeftOffset > 0) {
    follower.scrollLeft = proportional
      ? (paneWidth * scrollLeft) / scrollLeftOffset
      : scrollLeft; // eslint-disable-line
  }
};
