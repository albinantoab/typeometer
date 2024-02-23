import React, { useEffect } from "react";
import clsx from "clsx";

const FloatingCountdown: React.FC<{ count: number; callback: () => void }> = ({
  count = 3,
  callback
}) => {
  const cid = "countdown-timer";

  useEffect(() => {
    const timerEle = document.getElementById(cid);
    let _count = count;

    if (!timerEle) return;

    let timer = setInterval(function () {
      const _text = String(_count--);

      if (_text && _text !== "-1") {
        timerEle.classList.remove("invisible");
        timerEle.classList.add("visible");
        timerEle.innerHTML = _text === "0" ? "Start" : _text;
      }

      if (_count === -2) {
        clearInterval(timer);
        callback();
      }
    }, 1000);
  }, [count, callback]);

  return (
    <div
      id={cid}
      className={clsx(
        "fixed",
        "top-[8px]",
        "bg-[rgb(255,99,0)]",
        "font-bold",
        "text-white",
        "text-[20px]",
        "w-[80px]",
        "h-[80px]",
        "rounded-[50%]",
        "flex",
        "justify-center",
        "items-center",
        "invisible",
        "backdrop-blur",
        "shadow-[0px_0px_9px_1px_rgba(0,0,0,1)]"
      )}></div>
  );
};

export { FloatingCountdown };
