import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./wipe.css";

/**
 * Creates and runs the wipe overlay animation. Returns functions to control the transition.
 */
export function runWipeTransition() {
  return new Promise((resolve) => {
    // Create overlay root
    const root = document.createElement("div");
    root.className = "wipe-overlay";

    // Create the three sweeping blocks
    const front = document.createElement("div");
    front.className = "wipe-block front entering";

    const cover = document.createElement("div");
    cover.className = "wipe-block cover entering";

    const grayBounce = document.createElement("div");
    grayBounce.className = "wipe-block gray-bounce entering";

    root.appendChild(front);
    root.appendChild(cover);
    root.appendChild(grayBounce);
    document.body.appendChild(root);

    // When the gray bouncy block finishes entering, screen is fully covered
    const onEnterComplete = () => {
      grayBounce.removeEventListener("animationend", onEnterComplete);

      // Provide exit function that slides blocks out
      const exitTransition = () => {
        return new Promise((resolveExit) => {
          // Switch to exit animations
          front.className = "wipe-block front exiting";
          cover.className = "wipe-block cover exiting";
          grayBounce.className = "wipe-block gray-bounce exiting";

          // When the last block finishes exiting, remove overlay
          const onExitComplete = () => {
            grayBounce.removeEventListener("animationend", onExitComplete);
            if (root.isConnected) {
              root.parentElement?.removeChild(root);
            }
            resolveExit();
          };

          grayBounce.addEventListener("animationend", onExitComplete, {
            once: true,
          });
        });
      };

      resolve(exitTransition);
    };

    grayBounce.addEventListener("animationend", onEnterComplete, {
      once: true,
    });
  });
}

/** Programmatic navigation hook with wipe. */
export function useWipeNavigate() {
  const navigate = useNavigate();
  return useCallback(
    async (to, opts) => {
      // If reduced motion, skip elaborate animation.
      const reduce =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduce) {
        navigate(to, opts);
        return;
      }

      // Start the enter transition (blocks slide in)
      const exitTransition = await runWipeTransition();

      // Screen is now covered, navigate to new page
      navigate(to, opts);

      // Wait for new page to start mounting/rendering
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Exit transition (blocks slide out to reveal new page)
      await exitTransition();
    },
    [navigate]
  );
}

/**
 * WipeLink: drop-in replacement for react-router <Link> when you want the wipe transition.
 *
 * Usage:
 * <WipeLink to="/about" className="btn">About</WipeLink>
 */
export function WipeLink(props) {
  const { to, className, replace, state, children, onClick, ...rest } = props;
  const wipeNav = useWipeNavigate();

  const handle = useCallback(
    async (e) => {
      if (onClick) onClick(e);
      if (e.defaultPrevented) return;
      e.preventDefault();
      await wipeNav(to, { replace, state });
    },
    [onClick, replace, state, to, wipeNav]
  );

  return (
    <a href={to} className={className} onClick={handle} {...rest}>
      {children}
    </a>
  );
}

/** Optional: helper button component */
export function WipeButton(props) {
  const { to, className, replace, state, children, onClick, ...rest } = props;
  const wipeNav = useWipeNavigate();

  const handle = useCallback(
    async (e) => {
      if (onClick) onClick(e);
      if (e.defaultPrevented) return;
      e.preventDefault();
      await wipeNav(to, { replace, state });
    },
    [onClick, replace, state, to, wipeNav]
  );

  return (
    <button className={className} onClick={handle} {...rest}>
      {children}
    </button>
  );
}
