import { useEffect } from "react";

function useClickOutside(ref, callback) {
  function handleClick(event) {
    if (
      ref.current &&
      !ref.current.contains(event.target) &&
      event.target.className != "ghost"
    ) {
      callback();
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, callback]);
}

export default useClickOutside;
