import { useState, useEffect } from "react";

interface WindowSize {
  width: number;
  height: number;
}

const getWindowSize = (): WindowSize => {
  if (typeof window === "undefined") {
    return { width: 0, height: 0 };
  }
  return { width: window.innerWidth, height: window.innerHeight };
};

export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>(getWindowSize);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};

