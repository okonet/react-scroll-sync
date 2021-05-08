import React from "react";

interface Options {
  mode?: "proportional" | "absolute";
  axis?: "horizontal" | "vertical" | "both";
}

/**
 * Synchronizes scrolling between multiple HTML elements.
 * When one of these elements is scrolled, the others will follow.
 *
 * @param elements - HTML elements to synchronize
 * @param [options={}]
 * @param [options.mode='proportional'] - Defaults to `'proportional'`.
 *  - If set to `'proportional'`, scroll is synchronized as a percentage.
 *    For example, scrolling one elemebt by 30% will cause other elements to scroll by 30%.
 *  - If set to `'absolute'`, scroll is synchronized as a pixel value.
 *    For example, scrolling one elemebt by 30px will cause other elements to scroll by 30px.
 * @param [options.axis='both'] - Defaults to `'both'`.
 *  Which axis should be syncronized for scrolling: `'horizontal'`, `'vertical'` or `'both'`.
 */
export const useScrollSync = (
  elements: HTMLElement[],
  { mode = "proportional", axis = "both" }: Options
): void => {
  React.useEffect(() => {
    if (elements.length === 0) {
      return;
    }
    elements.forEach((leader) => {
      const followers = elements.filter((el) => el !== leader);
      leader.onscroll = () => handleScroll(leader, followers, { mode, axis });
    });
    return () => {
      elements.forEach((el) => {
        el.onscroll = null;
      });
    };
  }, [elements, mode, axis]);
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
  followers.forEach((follower) => {
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

  const { mode, axis } = options;

  /* Calculate the actual pane height */
  const paneHeight = follower.scrollHeight - clientHeight;
  const paneWidth = follower.scrollWidth - clientWidth;
  /* Adjust the scrollTop position of it accordingly */
  if ((axis === "both" || axis === "vertical") && scrollTopOffset > 0) {
    follower.scrollTop =
      mode === "proportional"
        ? (paneHeight * scrollTop) / scrollTopOffset
        : scrollTop;
  }
  if ((axis === "both" || axis === "horizontal") && scrollLeftOffset > 0) {
    follower.scrollLeft =
      mode === "proportional"
        ? (paneWidth * scrollLeft) / scrollLeftOffset
        : scrollLeft;
  }
};
