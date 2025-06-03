"use client";

import React, { useEffect, useState } from "react";

export default function ScrollProgressBar() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollPercent(scrolled);
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed left-0 w-full h-1 z-50 bg-gray-300"
      style={{ top: "100px" }} // exact top offset like your original
    >
      <div
        className="h-1 bg-red-600 transition-all duration-150"
        style={{ width: `${scrollPercent}%` }}
      />
    </div>
  );
}
