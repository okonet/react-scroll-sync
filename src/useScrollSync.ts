import React from "react";

interface Options {
  proportional?: boolean;
  axis?: "horizontal" | "vertical" | "both";
}

export const useScrollSync = (
  elements: HTMLElement[],
  { proportional = true, axis = "both" }: Options = {}
): void => {
  React.useEffect(() => {
    if (elements.length === 0) {
      return;
    }
    elements.forEach((leader) => {
      const followers = elements.filter((el) => el !== leader);
      leader.onscroll = () =>
        handleScroll(leader, followers, { proportional, axis });
    });
    return () => {
      elements.forEach((el) => {
        el.onscroll = null;
      });
    };
  }, [elements, proportional, axis]);
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

  const { proportional, axis } = options;

  /* Calculate the actual pane height */
  const paneHeight = follower.scrollHeight - clientHeight;
  const paneWidth = follower.scrollWidth - clientWidth;
  /* Adjust the scrollTop position of it accordingly */
  if ((axis === "both" || axis === "vertical") && scrollTopOffset > 0) {
    follower.scrollTop = proportional
      ? (paneHeight * scrollTop) / scrollTopOffset
      : scrollTop;
  }
  if ((axis === "both" || axis === "horizontal") && scrollLeftOffset > 0) {
    follower.scrollLeft = proportional
      ? (paneWidth * scrollLeft) / scrollLeftOffset
      : scrollLeft;
  }
};
